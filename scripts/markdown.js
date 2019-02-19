const glob = require("glob");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const filePattern = "!(DocMark|Home|Layout)/!(index).js";

getExprotString = names => {
    let str = "";
    names.forEach(name => {
        str += `import ${name} from './${name}.md';\n`;
    });

    str += `export default { ${names.toString()} }`;

    return str;
};

glob(`examples/components/${filePattern}`, (err, files) => {
    if (!err) {
        let hasRemove = false;
        let dirMap = [];
        let prevDir;
        files.forEach(file => {
            const { dir, name } = path.parse(file);
            const fileString = fs.readFileSync(file).toString();
            const codeString = "```jsx\n" + fileString + "\n```\n";
            const docDir = path.resolve(dir, "docs");

            if (fs.existsSync(docDir) && !dirMap[docDir]) {
                fs.removeSync(docDir);
                dirMap[docDir] = [];
                if (!prevDir) {
                    prevDir = docDir;
                }
                if (prevDir != docDir && dirMap[prevDir]) {
                    fs.writeFileSync(
                        `${prevDir}/index.js`,
                        getExprotString(dirMap[prevDir])
                    );
                    prevDir = docDir;
                }
            }

            if (!fs.existsSync(docDir)) {
                fs.mkdirSync(docDir);
            }
            fs.writeFileSync(`${docDir}/${name}.md`, codeString);

            dirMap[docDir].push(name);
        });

        fs.writeFileSync(
            `${prevDir}/index.js`,
            getExprotString(dirMap[prevDir])
        );

    } else {
        console.log(chalk.red(err));
    }
});
