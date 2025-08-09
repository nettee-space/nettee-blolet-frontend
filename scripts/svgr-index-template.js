/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const createIconComponentName = (componentName) => {
  let name = componentName;

  if (!name.endsWith('Icon')) {
    name = `${name}Icon`;
  }
  return name;
};

const indexTemplate = (filePaths) => {
  return filePaths
    .map(({ path: pathString }) => {
      const basename = path.basename(pathString, path.extname(pathString));
      const iconName = createIconComponentName(basename);

      return `export { ${iconName} } from './${basename}';`;
    })
    .filter(Boolean)
    .join('\n');
};

module.exports = indexTemplate;
