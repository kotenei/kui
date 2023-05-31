const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const filePattern = '/*/!(index).js';

crateIndex = (items) => {
  let add = '';
  let str = `import React from 'react';\n`;
  let folder;

  // str += `import { storiesOf } from '@storybook/react';\n`;
  // str += `import { withDocs, withReadme } from 'storybook-readme';\n`;

  items.forEach((item, index) => {
    let importName = item.name.replace(/\-/g, '').replace(/^\S/, (s) => s.toUpperCase());
    let importDocName = item.folder.replace(/\-/g, '');

    if (!folder) {
      folder = item.folder;
      str += `import ${importDocName}Doc from '../../src/components/${folder}/README.md';\n`;
    }
    str += `import ${importName} from './${item.name}';\n`;
    str += `import ${importName}Source from './doc/${item.name}.source';\n`;
    // add += `.add('${item.name}', withDocs(${importName}Doc, () => <${importName}/>))`;

    add += `export const story${index} = () => <${importName}/>;\n`;
    add += `story${index}.storyName = '${item.name}';\n`;
    add += `story${index}.parameters = { storySource: { source: ${importName}Source } };\n\n`;
  });

  str += `\nexport default {
    title: 'KUI/Components/${folder}',
    parameters: {
      docs: {
        page: ${folder.replace(/\-/g, '')}Doc,
      },
    },
  };\n\n`;

  str += add;

  // str += `storiesOf('${folder}', module)
  //             .addDecorator(withReadme(${folder.replace(/\-/g, '')}Doc))
  //             ${add};`;

  return str;
};

glob(`stories/${filePattern}`, (err, files) => {
  if (!err) {
    let hasRemove = false;
    let dirMap = {};
    let prevDir;
    let prevFolder;

    files.forEach((file) => {
      const { dir, name, root, base } = path.parse(file);
      const folder = dir.substr(dir.lastIndexOf('/') + 1);
      const fileString = fs
        .readFileSync(file)
        .toString()
        .replace(/`/g, '\\`')
        .replace('${', '\\${');
      const mdString = '```jsx\n' + fileString + '\n```\n';
      const codeString = 'export default `' + fileString + '`';
      const folderDir = path.resolve(`stories/${folder}`);
      const docDir = path.resolve(folderDir, 'doc');

      if (!dirMap[docDir]) {
        dirMap[docDir] = [];
        if (fs.existsSync(docDir)) {
          fs.removeSync(docDir);
        }
      }

      if (!prevDir) {
        prevDir = docDir;
        prevFolder = folderDir;
      }

      if (prevDir != docDir && dirMap[prevDir]) {
        fs.writeFileSync(`${prevFolder}/index.js`, crateIndex(dirMap[prevDir]));
        prevDir = docDir;
        prevFolder = folderDir;
      }

      !fs.existsSync(folderDir) && fs.mkdirSync(folderDir);
      !fs.existsSync(docDir) && fs.mkdirSync(docDir);
      // fs.writeFileSync(`${docDir}/${name}.md`, mdString);
      fs.writeFileSync(`${docDir}/${name}.source.js`, codeString);
      dirMap[docDir].push({ name, folder });
    });
    prevFolder && fs.writeFileSync(`${prevFolder}/index.js`, crateIndex(dirMap[prevDir]));
  } else {
    console.log(chalk.red(err));
  }
});
