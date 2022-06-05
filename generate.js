#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('npx eslint-boilerplate my-app');
  process.exit(1);
}
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = 'https://github.com/mauriciomassaia/esbuild-boilerplate';

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`,
    );
  } else {
    console.error(err);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

    process.chdir(projectPath);

    const packFile = fs.readFileSync('./package.json');

    const packObj = JSON.parse(packFile);

    // remove bin property as it will not be needed in the app
    delete packObj.bin;

    fs.writeFileSync('./package.json', JSON.stringify(packObj, null, 2));

    console.log('Installing dependencies...');
    execSync('npm install');

    console.log('Removing useless files');
    execSync('npx rimraf ./.git');
    fs.rmSync(path.join(projectPath, 'bin'), { recursive: true });

    console.log('The installation is done, this is ready to use !');
  } catch (error) {
    console.log(error);
  }
}
main();
