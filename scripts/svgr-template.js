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

const template = ({ componentName, jsx }, { tpl }) => {
  const iconComponentName = createIconComponentName(componentName);

  return tpl`
import type { SVGProps } from 'react';

export const ${iconComponentName} = (props: SVGProps<SVGElement>) => (
  ${jsx}
);
`;
};

module.exports = template;
