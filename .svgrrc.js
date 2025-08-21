/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  // === 기본 설정 ===
  typescript: true, // TypeScript 타입 정의 생성
  jsxRuntime: 'automatic', // React 17+ 자동 JSX 런타임 사용
  filenameCase: 'pascal', // 파일명을 PascalCase로 생성
  exportType: 'named', // named export 사용

  // === SVG 속성 설정 ===
  svgProps: {
    role: 'img', // 접근성을 위한 role 속성
  },

  // === 템플릿 설정 ===
  template: require('./scripts/svgr-template.js'), // 커스텀 컴포넌트 템플릿
  indexTemplate: require('./scripts/svgr-index-template.js'), // 커스텀 index 템플릿

  // === SVG 최적화 (SVGO) ===
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false, // viewBox 유지 (반응형 스케일링용)
          },
        },
      },
    ],
  },
};
