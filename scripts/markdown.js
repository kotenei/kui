const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const filePattern = '/**/!(index).js';

crateIndex = items => {
  let add = '';
  let str = `import React from 'react';\n`;
  let folder;

  str += `import { storiesOf } from '@storybook/react';\n`;
  str += `import { withDocs, withReadme } from 'storybook-readme';\n`;

  items.forEach(item => {
    let importName=item.name.replace(/\-/g,'').replace(/^\S/, s => s.toUpperCase());
    
    if (!folder) {
      folder = item.folder;
      str += `import ${folder}Doc from '../../src/components/${folder}/README.md';\n`;
    }
    str += `import ${importName} from './${item.name}';\n`;
    str += `import ${importName}Doc from './doc/${item.name}.md';\n`;
    add += `.add('${item.name}', withDocs(${importName}Doc, () => <${importName}/>))`;
  });

  str += `storiesOf('${folder}', module)
              .addDecorator(withReadme(${folder}Doc))
              ${add};`;

  return str;
};

glob(`stories/${filePattern}`, (err, files) => {
  if (!err) {
    let hasRemove = false;
    let dirMap = [];
    let prevDir;
    let prevFolder;

    files.forEach(file => {
      const { dir, name, root, base } = path.parse(file);
      const folder = dir.substr(dir.lastIndexOf('/') + 1);
      const fileString = fs.readFileSync(file).toString();
      const codeString = '```jsx\n' + fileString + '\n```\n';
      const folderDir = path.resolve(`stories/${folder}`);
      const docDir = path.resolve(folderDir, 'doc');

      if (fs.existsSync(docDir) && !dirMap[docDir]) {
        fs.removeSync(docDir);
        dirMap[docDir] = [];
        if (!prevDir) {
          prevDir = docDir;
          prevFolder = folderDir;
        }
        if (prevDir != docDir && dirMap[prevDir]) {
          fs.writeFileSync(`${prevFolder}/index.js`, crateIndex(dirMap[prevDir]));
          prevDir = docDir;
          prevFolder = folderDir;
        }
      }

      !fs.existsSync(folderDir) && fs.mkdirSync(folderDir);
      !fs.existsSync(docDir) && fs.mkdirSync(docDir);
      fs.writeFileSync(`${docDir}/${name}.md`, codeString);
      dirMap[docDir].push({ name, folder });
    });
    prevFolder && fs.writeFileSync(`${prevFolder}/index.js`, crateIndex(dirMap[prevDir]));
  } else {
    console.log(chalk.red(err));
  }
});
