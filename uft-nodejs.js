const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// path to the qtp script
// NOTE: change the qtp script path to reflect the actual path in your host machine
let qtpScriptPath = 'D:\\agentctl-2.2.1\\build\\qautomation\\lib\\bin\\qtp.vbs';

let workingDir = process.env.WORKING_DIR;
console.log('--- Working directory: ', workingDir);

// results folder contains all currently executed results to submit logs to qTest
// NOTE: you can change result path to another folde, DEFAULT is ${working directory}/test-results
let resultsFolder = path.resolve(`${workingDir}`, 'test-results');

// pre-condition - add libary to scan uft projects
fs.writeFileSync(`${__dirname}/package.json`, `{"name": "uft-nodejs", "version": "1.0.0", "dependencies": {"globby": "8.0.1"}}`);
let nodeJSExe = process.env.PATH_TO_NODE_JS;
let nodeJsDir = path.resolve(nodeJSExe.replace(/['"]+/g, ''), '..');
let npmExe = path.resolve(nodeJsDir, 'npm');
console.log('*** Install dependencies ***');
execSync(`${npmExe} install`, { stdio: 'inherit', cwd: __dirname });

const globby = require('globby');

// create test results folder
if (!fs.existsSync(resultsFolder)) {
  fs.mkdirSync(resultsFolder);
} else {
  execSync(`rmdir /s /q ${resultsFolder}`);
  fs.mkdirSync(resultsFolder);
}

// get automation content from magic variable TESTCASES_AC
let testcases_AC = $TESTCASES_AC ? $TESTCASES_AC.split(',') : [];

function executeTest(usrFile) {
  let extension = path.extname(usrFile);
  let projectName = path.basename(usrFile, extension);
  let uftProjectPath = path.resolve(usrFile, '..');
  let resultFolder = path.resolve(resultsFolder, projectName);
  fs.mkdirSync(resultFolder);
  command = `cscript ${qtpScriptPath} /run-path:${uftProjectPath} /result-path:${resultFolder}`;
  // execute the test sequentially
  console.log(`*** Executing command: ${command} ***`);
  execSync(command, { stdio: 'inherit' });
}

/**
 * Run specific UFT tests from schedule
 * If not, scan and run all uft tests from working directory
 */
if (testcases_AC && testcases_AC.length > 0) {
  for (let testcase_AC of testcases_AC) {
    let pattern = workingDir + `/**/${testcase_AC}.usr`;
    let usrFiles = globby.sync(pattern);
    if (usrFiles.length > 0) {
      executeTest(usrFiles[0]);
    }
  }
} else {
  let pattern = workingDir + '/**/*.usr';
  let usrFiles = globby.sync(pattern);
  for (let usrFile of usrFiles) {
    executeTest(usrFile);
  }
}

console.log('*** Execution completed ***');
