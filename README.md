# Nettee Blolet Frontend

Blolet 프론트엔드 애플리케이션입니다.

## 🚀 개발 환경 설정

### 필수 요구사항

- Node.js 20 이상
- corepack 활성화 (패키지 매니저 자동 관리)

### 초기 설정 (최초 1회만)

```bash
# 1. corepack 활성화
corepack enable

# 2. 의존성 설치
pnpm install
```

### 이후 작업 시

```bash
# 의존성 설치/업데이트
pnpm install

# 개발 서버 실행
pnpm dev
```

## 📝 커밋 컨벤션

### 기본 형식

```
type(scope): description
```

### Type 목록 (필수)

| Type       | 설명                                   |
| ---------- | -------------------------------------- |
| `feat`     | 새로운 기능 추가                       |
| `fix`      | 버그 수정                              |
| `docs`     | 문서 변경 (README 등)                  |
| `style`    | 코드 스타일 변경 (포맷팅, 세미콜론 등) |
| `design`   | 사용자 UI 디자인 변경 (CSS 등)         |
| `test`     | 테스트 코드 추가/수정                  |
| `refactor` | 리팩토링 (기능 변경 없음)              |
| `build`    | 빌드 관련 변경                         |
| `ci`       | CI/CD 관련 변경                        |
| `perf`     | 성능 개선                              |
| `chore`    | 기타 변경 사항 (패키지 업데이트 등)    |
| `rename`   | 파일 혹은 폴더명 수정                  |
| `remove`   | 파일 삭제                              |

### Scope 규칙 (필수)

- **소문자로만** 작성
- **비즈니스 도메인** 또는 **공통(횡단 관심사)**을 명시
- **비즈니스 도메인**: `draft`, `article`, `series`, `user`, `comment` 등
- **공통(횡단 관심사)**: `auth`, `config`, `type`, `util`, `pkg` 등

### 커밋 메시지 예시

#### ✅ 올바른 예시

**도메인 기반 예시:**

```bash
feat(article): 게시글 작성 기능 구현
fix(draft): 임시저장 시 데이터 손실 버그 수정
feat(series): 시리즈 게시글 연결 기능 추가
refactor(comment): 댓글 시스템 로직 개선
perf(article): 게시글 목록 로딩 성능 최적화
test(draft): 임시저장 기능 단위 테스트 추가
```

**공통(횡단 관심사) 기반 예시:**

```bash
chore(config): 환경 변수 및 빌드 설정 추가
feat(type): 공통 API 응답 타입 정의
refactor(util): 헬퍼 함수 및 상수 정리
chore(pkg): 의존성 패키지 업데이트
```

### 💡 팁

- **type과 scope는 필수**로 작성해야 합니다
- **description은 한글 또는 영어**로 명확하게 작성
- **scope는 소문자**로만 작성
- **현재형**으로 작성 ("추가했음" ❌ → "추가" ✅)
