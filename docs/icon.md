# 아이콘 시스템 (SVGR CLI)

이 프로젝트는 **SVGR CLI**를 사용하여 SVG 파일을 React 컴포넌트로 자동 변환하는 아이콘 시스템을 구축했습니다.

## 📁 아이콘 SVG 구조 예시

```
blolet-fe/
├── public/icons/                 # 원본 SVG 파일들(Input)
│   ├── check_box.svg
│   ├── favorite.svg
│   └── ...
├── src/shared/components/ui/icons/  # 생성된 React 컴포넌트들(Output)
│   ├── CheckBoxIcon.tsx
│   ├── FavoriteIcon.tsx
│   ├── index.ts
│   └── ...
├── scripts/                      # SVGR 커스텀 템플릿
│   ├── svgr-template.js
│   └── svgr-index-template.js
└── .svgrrc.js                   # SVGR 설정 파일
```

## 🚀 사용법

### 1. SVG 파일 추가

새로운 아이콘을 추가하려면 `public/icons/` 디렉토리에 SVG 파일을 저장합니다:

```bash
public/icons/
├── new_icon.svg      # 새 아이콘 추가
└── another_icon.svg  # 또 다른 아이콘 추가
```

### 2. React 컴포넌트 생성

다음 명령어를 실행하여 SVG → React 컴포넌트 변환:

```bash
pnpm run icons:convert
```

이 명령어는 내부적으로 다음을 실행합니다:

```bash
# 1. SVGR CLI로 컴포넌트 생성
svgr --out-dir src/shared/components/ui/icons public/icons

# 2. 생성된 파일들 포맷팅 및 린팅
prettier --write 'src/shared/components/ui/icons/**/*.tsx'
eslint --fix 'src/shared/components/ui/icons/**/*.tsx'
```

### 3. 컴포넌트 사용

생성된 아이콘 컴포넌트를 import하여 사용합니다:

```typescript

// index에서 import
import { CheckBoxIcon, FavoriteIcon } from '@/shared/components/ui/icons';

// 사용 예시
function MyComponent() {
  return (
    <div>
      <CheckBoxIcon width={20} height={20} />
      <FavoriteIcon fill="#FF6B6B" className="hover:scale-110" />
    </div>
  );
}
```

## 🎨 생성된 컴포넌트 특징

### 타입 안전성

```typescript
import type { SVGProps } from 'react';

export const CheckBoxIcon = (props: SVGProps<SVGSVGElement>) => (
  // SVG 컴포넌트
);
```

### 접근성

- 모든 아이콘에 `role="img"` 속성 자동 추가
- 스크린 리더 접근성 고려

### 커스터마이징 가능

```typescript
<CheckBoxIcon
  width={24}
  height={24}
  fill="currentColor"
  className="text-blue-500"
  onClick={handleClick}
/>
```

## ⚙️ 설정 파일

### `.svgrrc.js` - SVGR 메인 설정

```javascript
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
  template: require('./scripts/svgr-template.js'),
  indexTemplate: require('./scripts/svgr-index-template.js'),

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
```

### `scripts/svgr-template.js` - 컴포넌트 템플릿

이 템플릿은 다음과 같은 로직을 적용합니다:

- **이름 변환**: `SvgCheckBox` → `CheckBoxIcon`
- **접두사 제거**: `Svg` 접두사 자동 제거
- **접미사 추가**: `Icon` 접미사 자동 추가
- **타입 안전성**: `SVGProps<SVGSVGElement>` 타입 적용

```javascript
const createIconComponentName = (componentName) => {
  let name = componentName;

  // Svg 접두사 제거
  name = name.replace(/^Svg/, '');

  // Icon 접미사 추가
  if (!name.endsWith('Icon')) {
    name = `${name}Icon`;
  }

  return name;
};
```

### `scripts/svgr-index-template.js` - Index 파일 템플릿

자동으로 `index.ts` 파일을 생성하여 모든 아이콘 컴포넌트를 내보냅니다.
