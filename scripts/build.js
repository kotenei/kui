const glob = require("glob");
const chalk = require("chalk");
const rimraf = require("rimraf");
const shell = require("shelljs");

const cwd = process.cwd();

const removeLib = () => {
    console.log(chalk.cyan("Removing exiting lib folder..."));
    rimraf.sync(`${cwd}/lib/`);
};

const complieScripts = () => {
    console.log(chalk.cyan("Compiling script files with Babel..."));
    shell.exec("babel src -d lib");
};

const complieStyles = () => {
    console.log(chalk.cyan("Compiling sass files with node-sass..."));
    shell.exec(
        "node-sass src/assets/scss/kui.scss lib/kui.min.css  --output-style compressed -q"
    );
};

const build = () => {
    console.log(chalk.bgBlue(chalk.black("\n KUI BUILD START \n")));
    removeLib();
    complieScripts();
    complieStyles();
    console.log(chalk.bgGreen(chalk.black('\n KUI BUILD DONE \n')));
};

build();
