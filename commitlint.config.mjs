const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // 에러 레벨 (0 = off, 1 = warning, 2 = error)
      'always', // 항상 적용
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'docs', // 문서 변경 (README 등)
        'style', // 코드 스타일 변경 (포맷팅, 세미콜론 등)
        'design', // 사용자 UI 디자인 변경 (CSS 등)
        'test', // 테스트 코드 추가/수정
        'refactor', // 리팩토링 (기능 변경 X)
        'build', // 빌드 관련 변경
        'ci', // CI/CD 관련 변경
        'perf', // 성능 개선
        'chore', // 기타 변경 사항 (패키지 업데이트 등)
        'rename', // 파일 혹은 폴더명을 수정만 한 경우
        'remove', // 파일을 삭제만 한 경우
      ],
    ],
    // scope를 필수로 설정
    'scope-empty': [2, 'never'],

    // 허용할 scope 목록 정의 필요시 추후 추가
    // 'scope-enum': [2, 'always', ['auth', 'user', 'api', 'ui', 'db', 'config', 'test', 'docs']],

    // scope 케이스 설정 (소문자)
    'scope-case': [2, 'always', 'lower-case'],
  },
};

export default Configuration;
