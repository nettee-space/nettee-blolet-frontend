/* eslint-disable @typescript-eslint/no-explicit-any */

import { TElement, Value } from 'platejs';
import { TPlateEditor } from 'platejs/react';

import { debounce, type DebouncedFunction } from '../utils/debounce';
import { deepEqual } from '../utils/deep-equal';
import { throttle, type ThrottledFunction } from '../utils/throttle';

interface PlateOperation {
  type: string;
  path?: number[];
  offset?: number;
  text?: string;
  node?: any;
  position?: number;
  properties?: any;
  newProperties?: any;
  [key: string]: any;
}

// 내부 처리용 중간 텍스트 이벤트
interface InternalTextEvent {
  type: 'INSERT_TEXT' | 'REMOVE_TEXT';
  draftId: string;
  blockId?: string;
}

// 실제 API 전송용 컨텐츠 변경 요청 (TODO: 추후 수정 필요)
export interface ContentChangeRequest {
  type: 'NEW_BLOCK' | 'REMOVED' | 'SPLITTED' | 'MERGING' | 'REORDER' | 'SHORT_REST' | 'LONG_TYPING';
  draftId: string;
  blockId?: string;
  data: {
    // type별 필요 데이터
    position?: number; // 블록 위치
    targetBlockId?: string; // merge/split용 대상 블록
    targets?: any[];
    // MERGING용 확장 데이터
    sourceBlockId?: string; // 병합될 하위 블록 ID

    // 미디어 관련
    mediaType?: 'image' | 'video' | 'file';
    mediaUrl?: string;
    needsUpload?: boolean;
  };
}

export class PlateEditorAdapter {
  private changeHandler: ((request: ContentChangeRequest) => void) | null = null;

  // operations 처리 전 상태 캡처를 위한 스냅샷
  private blockSnapshots = new Map<number, TElement>();
  private lastEditorState: Value | null = null;

  // 텍스트 입력 처리 최적화 시스템 (Focus Block만 사용)
  private focusedBlockId: string | null = null; // 현재 포커스된 블록
  private focusedBlockInitialSnapshot: TElement | null = null; // 포커스 블록의 초기 상태 스냅샷
  private lastProcessedBlockSnapshot: TElement | null = null; // 마지막 처리된 블록 상태 스냅샷

  // 전역 함수들
  private debouncedTextProcessor!: DebouncedFunction<[]>;
  private throttledLongTypingProcessor!: ThrottledFunction<[]>;

  // 최적화 설정 상수
  private readonly DEBOUNCE_DELAY = 300; // 디바운스 지연시간 (ms)
  private readonly LONG_TYPING_THRESHOLD = 5000; // LONG_TYPING 스로틀 간격 (ms)

  // Plate.js Operation 타입 상수
  private readonly OPERATION_TYPES = {
    INSERT_TEXT: 'insert_text',
    REMOVE_TEXT: 'remove_text',
    INSERT_NODE: 'insert_node',
    REMOVE_NODE: 'remove_node',
    MOVE_NODE: 'move_node',
    SPLIT_NODE: 'split_node',
    MERGE_NODE: 'merge_node',
    SET_NODE: 'set_node',
  } as const;

  // 내부 텍스트 이벤트 타입 상수
  private readonly INTERNAL_TEXT_EVENTS = {
    INSERT_TEXT: 'INSERT_TEXT',
    REMOVE_TEXT: 'REMOVE_TEXT',
  } as const;

  // API 전송용 이벤트 타입 상수
  private readonly CONTENT_CHANGE_EVENTS = {
    NEW_BLOCK: 'NEW_BLOCK',
    REMOVED: 'REMOVED',
    SPLITTED: 'SPLITTED',
    MERGING: 'MERGING',
    REORDER: 'REORDER',
    SHORT_REST: 'SHORT_REST',
    LONG_TYPING: 'LONG_TYPING',
  } as const;

  constructor(
    private plateEditor: TPlateEditor,
    private draftId: string,
  ) {
    // 초기화: 디바운스/스로틀 래퍼 생성
    this.debouncedTextProcessor = debounce(() => {
      this.processTextInput();
    }, this.DEBOUNCE_DELAY);

    this.throttledLongTypingProcessor = throttle(() => {
      this.processLongTyping();
    }, this.LONG_TYPING_THRESHOLD);
  }

  // EditorAdapter Interface Implementation

  /**
   * 변경사항 감지 리스너 등록
   */
  onContentChange(handler: (request: ContentChangeRequest) => void): void {
    this.changeHandler = handler;
  }

  /**
   * 에디터 콘텐츠 가져오기
   */
  getContent(): Value {
    return this.plateEditor.children;
  }

  /**
   * 에디터 콘텐츠 설정
   */
  setContent(content: Value): void {
    this.plateEditor.children = content;
  }

  // Operation Processing

  /**
   * merge_node operations을 위한 이전 상태에서 스냅샷 생성
   */
  private capturePreOperationState(operations: PlateOperation[]): void {
    this.blockSnapshots.clear();

    if (!this.lastEditorState) {
      return;
    }

    // merge_node operations이 있으면 이전 상태에서 관련 블록들 캡처
    operations.forEach((op) => {
      if (op.type === 'merge_node' && op.path && op.path.length === 1) {
        const deletedBlockIndex = op.path[0]; // 사라질 블록 (하위)
        const mergedBlockIndex = deletedBlockIndex - 1; // 병합받을 블록 (상위)

        // 이전 상태에서 삭제될 블록 정보 저장
        if (
          this.lastEditorState &&
          deletedBlockIndex >= 0 &&
          deletedBlockIndex < this.lastEditorState.length
        ) {
          const deletedBlock = this.lastEditorState[deletedBlockIndex];
          this.blockSnapshots.set(deletedBlockIndex, deletedBlock);
        }

        // 이전 상태에서 상위 블록 정보 저장 (비교용)
        if (
          this.lastEditorState &&
          mergedBlockIndex >= 0 &&
          mergedBlockIndex < this.lastEditorState.length
        ) {
          const upperBlock = this.lastEditorState[mergedBlockIndex];

          this.blockSnapshots.set(mergedBlockIndex, upperBlock);
        }
      }
    });
  }

  /**
   * 현재 에디터 상태 저장 (processOperations 마지막에 호출)
   */
  private saveCurrentEditorState(): void {
    if (this.plateEditor?.children) {
      this.lastEditorState = this.plateEditor.children;
    }
  }

  /**
   * Operations를 처리하는 공개 메서드
   * Plate.js onChange에서 직접 호출됩니다.
   */
  processOperations(operations: PlateOperation[]): void {
    // 입력 검증
    if (!operations || operations.length === 0) {
      return;
    }

    // 블록 레벨 operations가 있으면 진행 중인 타이머만 클린업
    if (this.hasBlockLevelOperations(operations)) {
      this.clearTextProcessingTimers();
    }

    // operations 처리 전 상태 캡처 (이전 상태 사용)
    this.capturePreOperationState(operations);

    if (!this.changeHandler) {
      return;
    }

    try {
      // 유효한 operations만 필터링
      const validOperations = this.filterValidOperations(operations);

      if (validOperations.length === 0) {
        return;
      }

      // Operations를 변환
      const changeRequests = this.convertOperationsToRequestsCombined(validOperations);

      if (changeRequests.length === 0) {
        return;
      }

      // 각 요청을 타입별로 최적화하여 처리
      changeRequests.forEach((request) => {
        try {
          this.processRequest(request);
        } catch (handlerError) {
          console.error('[PlateEditorAdapter] Error in change handler:', handlerError);
        }
      });
    } catch (error) {
      console.error('[PlateEditorAdapter] Error processing operations:', error);
    }

    // 현재 상태를 다음 번을 위해 저장
    this.saveCurrentEditorState();
  }

  /**
   * 유효한 operations만 필터링
   */
  private filterValidOperations(operations: PlateOperation[]): PlateOperation[] {
    return operations.filter((op) => {
      // path가 없는 operations 제외 (set_selection 등)
      if (!op.path || !Array.isArray(op.path) || op.path.length === 0) {
        return false;
      }

      // 알려진 operation types만 허용
      return Object.values(this.OPERATION_TYPES).includes(
        op.type as (typeof this.OPERATION_TYPES)[keyof typeof this.OPERATION_TYPES],
      );
    });
  }

  /**
   * 단일 Operation을 ContentChangeRequest 또는 InternalTextEvent로 변환
   */
  private convertSingleOperation(
    op: PlateOperation,
  ): ContentChangeRequest | InternalTextEvent | null {
    if (!this.draftId || !op.path) {
      return null;
    }

    const blockId = this.extractBlockId(op.path);

    switch (op.type) {
      case this.OPERATION_TYPES.INSERT_TEXT:
      case this.OPERATION_TYPES.REMOVE_TEXT:
        return this.createTextChangeEvent(op, blockId);

      case this.OPERATION_TYPES.INSERT_NODE:
        return this.createNodeInsertRequest(op, blockId);

      case this.OPERATION_TYPES.REMOVE_NODE:
        return this.createNodeRemoveRequest(op, blockId);

      case this.OPERATION_TYPES.MOVE_NODE:
        return this.createNodeMoveRequest(op, blockId);

      case this.OPERATION_TYPES.SPLIT_NODE:
        return this.createSplitRequest(op, blockId);

      case this.OPERATION_TYPES.MERGE_NODE:
        return this.createMergeRequest(op);

      case this.OPERATION_TYPES.SET_NODE:
        return this.createNodeUpdateRequest(op, blockId);

      default:
        console.warn(`[PlateEditorAdapter] Unknown operation type: ${op.type}`);
        return null;
    }
  }

  /**
   * 텍스트 변경 이벤트 생성 (내부 처리용)
   */
  private createTextChangeEvent(op: PlateOperation, blockId: string): InternalTextEvent {
    return {
      type:
        op.type === this.OPERATION_TYPES.INSERT_TEXT
          ? this.INTERNAL_TEXT_EVENTS.INSERT_TEXT
          : this.INTERNAL_TEXT_EVENTS.REMOVE_TEXT,
      draftId: this.draftId,
      blockId,
    };
  }

  /**
   * 노드 삽입 요청 생성
   */
  private createNodeInsertRequest(
    op: PlateOperation,
    blockId: string,
  ): ContentChangeRequest | null {
    const isBlockLevel = op.path!.length === 1;

    if (isBlockLevel) {
      return {
        type: this.CONTENT_CHANGE_EVENTS.NEW_BLOCK,
        draftId: this.draftId,
        blockId,
        data: {
          targets: [op.node], // 새로 추가된 블록
          position: op.path![0],
        },
      };
    }

    return null;
  }

  /**
   * 노드 제거 요청 생성
   */
  private createNodeRemoveRequest(
    op: PlateOperation,
    blockId: string,
  ): ContentChangeRequest | null {
    const isBlockLevel = op.path!.length === 1;

    if (isBlockLevel) {
      return {
        type: this.CONTENT_CHANGE_EVENTS.REMOVED,
        draftId: this.draftId,
        blockId,
        data: {
          position: op.path![0],
        },
      };
    }

    return null;
  }

  /**
   * 노드 이동 요청 생성
   */
  private createNodeMoveRequest(op: PlateOperation, blockId: string): ContentChangeRequest {
    // 블록 내부 이동인지 블록 간 이동인지 판단
    const isInternalMove = this.isInternalMove(op);

    if (isInternalMove) {
      return {
        type: this.CONTENT_CHANGE_EVENTS.SHORT_REST,
        draftId: this.draftId,
        blockId,
        data: {
          targets: [this.getBlockContent(op.path![0])], // 변경된 블록
        },
      };
    }

    return {
      type: this.CONTENT_CHANGE_EVENTS.REORDER,
      draftId: this.draftId,
      blockId,
      data: {
        position: op.path![0],
        ...(op.newPath && { targetPosition: op.newPath[0] }),
      },
    };
  }

  /**
   * 블록 분할 요청 생성
   */
  private createSplitRequest(op: PlateOperation, blockId: string): ContentChangeRequest | null {
    const isBlockLevelSplit = op.path!.length === 1;

    if (isBlockLevelSplit) {
      // 실제 블록 분할 (Enter로 새 블록 생성)
      const currentBlockIndex = op.path![0];
      const currentBlock = this.getBlockContent(currentBlockIndex);
      const splitPosition = op.position || 0;

      // 분할 후 생성될 새 블록의 내용을 예상하여 targets 배열 구성
      const originalBlock = currentBlock;
      const newBlockIndex = currentBlockIndex + 1;
      const newBlock = this.getBlockContent(newBlockIndex);

      const hasNewBlockContent = newBlock && newBlock.children[0].text !== '';

      return {
        type: hasNewBlockContent
          ? this.CONTENT_CHANGE_EVENTS.SPLITTED
          : this.CONTENT_CHANGE_EVENTS.NEW_BLOCK,
        draftId: this.draftId,
        blockId,
        data: {
          targets: [originalBlock, newBlock],
          position: hasNewBlockContent ? splitPosition : newBlockIndex,
        },
      };
    }

    return null;
  }

  /**
   * 블록 병합 요청 생성
   */
  private createMergeRequest(op: PlateOperation): ContentChangeRequest | null {
    const isBlockLevelMerge = op.path!.length === 1;

    if (isBlockLevelMerge) {
      const deletedBlockIndex = op.path![0]; // 사라질 블록 (하위)
      const mergedBlockIndex = deletedBlockIndex - 1; // 병합받을 블록 (상위)
      const deletedBlockSnapshot = this.blockSnapshots.get(deletedBlockIndex); // 스냅샷에서 삭제된 블록의 이전 내용 가져오기
      const currentMergedBlock = this.getBlockContent(mergedBlockIndex); // 현재 상위 블록(병합된 블록)의 내용 가져오기
      const previousMergedBlock = this.blockSnapshots.get(mergedBlockIndex); // 스냅샷에서 상위 블록의 이전 내용 가져오기 (비교용)

      // 상위 블록의 내용이 변경되었는지 확인
      const upperBlockChanged = !this.isBlockContentEqual(
        currentMergedBlock ?? null,
        previousMergedBlock ?? null,
      );

      if (upperBlockChanged) {
        // 상위 블록 내용이 변경됨 → 실제 병합 → MERGING
        return {
          type: this.CONTENT_CHANGE_EVENTS.MERGING,
          draftId: this.draftId,
          blockId: this.extractBlockId([mergedBlockIndex]),
          data: {
            targets: [currentMergedBlock, deletedBlockSnapshot], // [상위블록, 하위블록]
            position: mergedBlockIndex,
          },
        };
      }

      // 상위 블록 내용 변경 없음 → 빈 블록 제거 → REMOVED
      return {
        type: this.CONTENT_CHANGE_EVENTS.REMOVED,
        draftId: this.draftId,
        blockId: this.extractBlockId([deletedBlockIndex]),
        data: {
          targets: [deletedBlockSnapshot], // 삭제된 블록 정보
          position: deletedBlockIndex,
        },
      };
    }

    return null;
  }

  /**
   * 노드 업데이트 요청 생성
   */
  private createNodeUpdateRequest(op: PlateOperation, blockId: string): ContentChangeRequest {
    return {
      type: this.CONTENT_CHANGE_EVENTS.SHORT_REST,
      draftId: this.draftId,
      blockId,
      data: {
        targets: [this.getBlockContent(op.path![0])], // 변경된 블록
      },
    };
  }

  /**
   * 요청 처리 (내부 이벤트와 API 요청 구분 처리)
   */
  private processRequest(request: ContentChangeRequest | InternalTextEvent): void {
    if (!this.changeHandler) return;

    // 내부 텍스트 이벤트 처리
    if (this.isInternalTextEvent(request)) {
      // 모든 내부 텍스트 이벤트에 대해 디바운스 처리 (실제 처리 여부는 processTextInput에서 판단)
      this.handleTextInput(request);
    } else {
      // API 전송용 요청 처리 - 마지막 로깅된 상태와 중복 여부 확인
      const blockIndex = request.blockId ? this.getBlockIndexFromId(request.blockId) : -1;
      const currentBlockContent = blockIndex >= 0 ? this.getBlockContent(blockIndex) : null;

      // SHORT_REST와 LONG_TYPING 중복 처리 방지
      if (
        (request.type === this.CONTENT_CHANGE_EVENTS.SHORT_REST ||
          request.type === this.CONTENT_CHANGE_EVENTS.LONG_TYPING) &&
        this.isBlockContentEqual(currentBlockContent, this.lastProcessedBlockSnapshot)
      ) {
        // 마지막 처리된 상태와 동일하면 중복 처리하지 않음
        return;
      }

      // 실제 API 전송 및 로깅(외부에서 주입한 로직 실행)
      this.changeHandler(request);

      // 처리된 상태 저장 (SHORT_REST, LONG_TYPING만)
      if (
        request.type === this.CONTENT_CHANGE_EVENTS.SHORT_REST ||
        request.type === this.CONTENT_CHANGE_EVENTS.LONG_TYPING
      ) {
        this.lastProcessedBlockSnapshot = currentBlockContent;
      }
    }
  }

  /**
   * 내부 텍스트 이벤트 여부 확인
   */
  private isInternalTextEvent(
    request: ContentChangeRequest | InternalTextEvent,
  ): request is InternalTextEvent {
    return (
      request.type === this.INTERNAL_TEXT_EVENTS.INSERT_TEXT ||
      request.type === this.INTERNAL_TEXT_EVENTS.REMOVE_TEXT
    );
  }

  /**
   * 텍스트 입력 처리
   */
  private handleTextInput(request: InternalTextEvent): void {
    const blockId = request.blockId;

    // 포커스 블록 변경 시 기존 처리 플러시 및 새 스냅샷 생성
    if (blockId && this.focusedBlockId !== blockId) {
      this.flushTextInput();
      this.focusedBlockId = blockId;
      // 새 블록의 초기 상태 스냅샷 생성
      const blockIndex = this.getBlockIndexFromId(blockId);
      const blockContent = this.getBlockContent(blockIndex);
      this.focusedBlockInitialSnapshot = blockContent ?? null;
    }

    this.debouncedTextProcessor();
    this.throttledLongTypingProcessor();
  }

  /**
   * SHORT_REST 처리
   */
  private processTextInput(): void {
    if (!this.focusedBlockId) {
      return;
    }

    // 현재 포커스된 블록의 실제 내용 가져오기
    const blockIndex = this.getBlockIndexFromId(this.focusedBlockId);
    const currentBlockContent = this.getBlockContent(blockIndex);

    // 초기 스냅샷과 비교하여 실질적 변경 여부 확인
    if (this.isBlockContentEqual(currentBlockContent, this.focusedBlockInitialSnapshot)) {
      // 블록 내용이 초기 상태와 동일하면 처리하지 않음
      return;
    }

    // 마지막 처리된 상태와 중복 여부 확인
    if (this.isBlockContentEqual(currentBlockContent, this.lastProcessedBlockSnapshot)) {
      // 마지막 처리된 상태와 동일하면 중복 처리하지 않음
      return;
    }

    // SHORT_REST 처리용 이벤트 생성 및 전송
    const processRequest: ContentChangeRequest = {
      type: this.CONTENT_CHANGE_EVENTS.SHORT_REST,
      draftId: this.draftId,
      blockId: this.focusedBlockId,
      data: {
        targets: [currentBlockContent], // 변경된 블록 정보
      },
    };

    this.processRequest(processRequest);
  }

  /**
   * LONG_TYPING 처리
   */
  private processLongTyping(): void {
    if (!this.focusedBlockId) {
      return;
    }

    // 현재 포커스된 블록의 실제 내용 가져오기
    const blockIndex = this.getBlockIndexFromId(this.focusedBlockId);
    const currentBlockContent = this.getBlockContent(blockIndex);

    // 초기 스냅샷과 비교하여 실질적 변경 여부 확인
    const isEqualToInitial = this.isBlockContentEqual(
      currentBlockContent,
      this.focusedBlockInitialSnapshot,
    );
    if (isEqualToInitial) {
      return;
    }

    // 마지막 처리된 상태와 중복 여부 확인
    const isEqualToLastProcessed = this.isBlockContentEqual(
      currentBlockContent,
      this.lastProcessedBlockSnapshot,
    );
    if (isEqualToLastProcessed) {
      return;
    }

    // LONG_TYPING 처리용 이벤트 생성
    const processRequest: ContentChangeRequest = {
      type: this.CONTENT_CHANGE_EVENTS.LONG_TYPING,
      draftId: this.draftId,
      blockId: this.focusedBlockId,
      data: {
        targets: [currentBlockContent], // 변경된 블록 정보
      },
    };

    this.processRequest(processRequest);
  }

  /**
   * 텍스트 처리 즉시 플러시 (포커스 변경 시)
   */
  private flushTextInput(): void {
    this.clearTextProcessingTimers();
    this.resetTextProcessingState();
    return;
  }

  /**
   * 텍스트 처리 상태만 리셋 (이벤트 전송 없음)
   */
  private resetTextProcessingState(): void {
    this.focusedBlockId = null;
    this.focusedBlockInitialSnapshot = null;
    this.lastProcessedBlockSnapshot = null;
  }

  /**
   * 텍스트 처리 타이머만 클린업 (상태는 유지)
   */
  private clearTextProcessingTimers(): void {
    // 디바운스된 함수 취소
    if (this.debouncedTextProcessor) {
      this.debouncedTextProcessor.cancel();
    }

    // 스로틀된 함수 취소
    if (this.throttledLongTypingProcessor) {
      this.throttledLongTypingProcessor.cancel();
    }
  }

  /**
   * 효율적인 단일 순회로 operations 분류 처리
   */
  private convertOperationsToRequestsCombined(
    operations: PlateOperation[],
  ): (ContentChangeRequest | InternalTextEvent)[] {
    const requests: (ContentChangeRequest | InternalTextEvent)[] = [];

    for (const op of operations) {
      const result = this.convertSingleOperation(op);

      if (result) {
        requests.push(result);
      }
    }

    return requests;
  }

  // Helper Methods

  /**
   * 블록 레벨 operations가 있는지 확인 (NEW_BLOCK, SPLITTED 등 감지)
   */
  private hasBlockLevelOperations(operations: PlateOperation[]): boolean {
    return operations.some((op) => {
      // 블록 레벨 operations 감지 (path 길이가 1이고 특정 타입인 경우)
      if (!op.path || op.path.length !== 1) {
        return false;
      }

      return (
        op.type === this.OPERATION_TYPES.INSERT_NODE || // NEW_BLOCK
        op.type === this.OPERATION_TYPES.REMOVE_NODE || // REMOVED
        op.type === this.OPERATION_TYPES.SPLIT_NODE || // SPLITTED
        op.type === this.OPERATION_TYPES.MERGE_NODE || // MERGING
        op.type === this.OPERATION_TYPES.MOVE_NODE // REORDER
      );
    });
  }

  /**
   * 두 블록의 내용이 동일한지 비교
   */
  private isBlockContentEqual(newBlock: TElement | null, prevBlock: TElement | null): boolean {
    if (newBlock === null && prevBlock === null) return true;
    if (newBlock === null || prevBlock === null) return false;

    return deepEqual(newBlock, prevBlock);
  }

  /**
   * path에서 블록 ID 추출
   */
  private extractBlockId(path: number[]): string {
    const blockIndex = path[0];

    const block = this.plateEditor.children[blockIndex];
    return block?.id as string;
  }

  /**
   * 블록 내용 가져오기
   */
  private getBlockContent(blockIndex: number): TElement | null {
    if (
      !this.plateEditor?.children ||
      blockIndex < 0 ||
      blockIndex >= this.plateEditor.children.length
    ) {
      return null;
    }

    return this.plateEditor.children[blockIndex];
  }

  /**
   * 내부 이동인지 판단 (children 내에서의 이동)
   */
  private isInternalMove(op: PlateOperation): boolean {
    return op.path!.length > 1;
  }

  /**
   * 블록 ID에서 인덱스 추출
   */
  private getBlockIndexFromId(blockId: string): number {
    if (!this.plateEditor?.children) {
      return -1;
    }

    return this.plateEditor.children.findIndex((child) => (child as TElement).id === blockId);
  }

  /**
   * 특정 블록의 ID를 수정
   * @param blockIndex 블록의 인덱스 (0부터 시작)
   * @param newId 새로운 ID 값
   * @returns 성공 여부
   */
  updateBlockId(blockIndex: number, newId: string): boolean {
    if (!this.plateEditor?.children) {
      console.warn('[PlateEditorAdapter] No editor children available');
      return false;
    }

    if (blockIndex < 0 || blockIndex >= this.plateEditor.children.length) {
      console.warn('[PlateEditorAdapter] Invalid block index:', blockIndex);
      return false;
    }

    // 블록 가져오기
    const block = this.plateEditor.children[blockIndex] as TElement;

    if (!block) {
      return false;
    }

    // 히스토리에 남지 않도록 직접 블록 속성 수정 (백엔드 동기화용) 시스템 내부 동기화 작업이므로 Undo/Redo 대상이 아님
    const blockToUpdate = this.plateEditor.children[blockIndex] as TElement;
    blockToUpdate.id = newId;

    return true;
  }
}
