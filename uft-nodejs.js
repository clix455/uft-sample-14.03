const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const UFT_PROJECT_EXTENSION = '.usr';

// this is the path to the qtp.vbs script
// NOTE: change the path to qtp.vbs script to reflect the actual path in your host machine
let qtpScriptPath = 'D:/agentctl-2.2.1/build/qautomation/lib/bin/qtp.vbs';

let workingDir = process.env.WORKING_DIR || '';
workingDir = workingDir.replace(/\\/g, "/");
console.log('--- Working directory: ', workingDir);
if (!fs.existsSync(workingDir)) {
  console.log("No working directory found.");
  return;
}

// results folder contains all currently executed results to submit logs to qTest
// NOTE: by default, the result fill be located at ${working directory}/test-results
let resultsFolder = path.resolve(`${workingDir}`, 'test-results');

// create test results folder. If it already exists, deletes it and re-create it again.
if (fs.existsSync(resultsFolder)) {
  execSync(`rmdir /s /q ${resultsFolder}`);
}
fs.mkdirSync(resultsFolder);

// Automation content is the identifier of an automated Test Run in qTest Manager.
// In the context of UFT, each automation content contains the name of the usr script, e.g. LoginFlights
// We will try to get automation content(s) from magic variable TESTCASES_AC, whose values are under comma separated string
// Example values $TESTCASES_AC: LoginFlights.usr,Sample1.usr,Sample2.usr
let testcases_AC = $TESTCASES_AC ? $TESTCASES_AC.split(',') : [];

let usrFiles = [];

// This function scans all usr file paths of UFT on working directory

function scanUFTProjects(dir) {
  let files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    let filePath = path.join(dir, files[i]);
    let stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      scanUFTProjects(filePath);
    } else if (filePath.indexOf(UFT_PROJECT_EXTENSION) >= 0) {
      usrFiles.push(filePath);
    };
  };
};

// This function executes a specific UFT script (the .usr file), what it does is to launch a
// separate process to executes qtp.vbs script defined in the variable qtpScriptPath

function executeTest(usrFile) {
  let projectName = path.basename(usrFile, UFT_PROJECT_EXTENSION);
  let uftProjectPath = path.resolve(usrFile, '..');
  let resultFolder = path.resolve(resultsFolder, projectName);
  fs.mkdirSync(resultFolder);

  // compose the command to be executed
  command = `cscript ${qtpScriptPath} /run-path:${uftProjectPath} /result-path:${resultFolder}`;
  // execute the test
  console.log(`*** Executing command: ${command} ***`);
  execSync(command, { stdio: 'inherit' });
}

console.log(`--- Scanning all uft projects from working directory.`);
scanUFTProjects(workingDir);
console.log(`--- Found ${usrFiles.length} uft projects.`);
if (usrFiles.length <= 0) {
  console.log('No UFT projects found in working directory.');
  return;
}

/**
 * Kick off UFT test. What it does is to resolve the value of `testcases_AC` variable and validate:
 * Case 1: if that variable has value(s) meaning then there is/are test run(s) being scheduled in qTest Manager
 *   -- executes the .usr script identified by the automation content
 * Case 2: the value of testcases_AC is empty meaning no test runs being scheduled: 
 *   -- scan and executes all the .usr scripts located in the working directory
 */

if (testcases_AC && testcases_AC.length > 0) {
  for (let testcase_AC of testcases_AC) {
    let scheduledProject = testcase_AC + UFT_PROJECT_EXTENSION;
    let foundTests = usrFiles.filter(p => p.indexOf(scheduledProject) >= 0);
    if (foundTests.length > 0) {
      executeTest(foundTests[0]);
    }
  }
} else {
  for (let usrFile of usrFiles) {
    executeTest(usrFile);
  }
}

console.log('*** Execution completed ***');
