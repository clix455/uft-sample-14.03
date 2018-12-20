# uft-sample-14.03
sample project for UFT 14.03
- This document is for Agent type: Unified Functional Testing
- If you want to in integrate this UFT project with Universal Agent, refer to [Universal.md](./Universal.md)
# Prerequisite
1. qTest Automation Host (2.2.1 or newer) and UFT 14.03, installed on host
2. Enable Automation Setting on qTest and add mapping status ![enable_automation_map_status.png](/images/enable_automation_map_status.png)
# How to use
1. Clone this project to local folder, for example: C:\uft-samples\uft-sample-14.03
2. Navigate to UI of qTest Automation Host
3. Create an agent which is of type: Unified Functional Testing ![uft-agent.png](/images/uft-agent.png)
    - Directory: C:\uft-samples\uft-sample-14.03
    - Include: **/*.usr
# Note on agent configuration
    - Value of Directory should be parent location of UFT project
    - For example: if the location of usr file is: C:\uft-samples\uft-sample-14.03\qasymphony.com\qasymphony.com.usr, then Direcory must be set to C:\uft-samples\uft-sample-14.03
        
# How it works
1. Scan and create test case from UFT project to qTest Manager ![scan_create_test_case.png](/images/scan_create_test_case.png)
2. Access to your project in qTest Manager. Go to Test Execution and create test run from the newly created test case
3. Schedule test execution for the test run (created at #2) ![schedule_test-run.png](/images/schedule_test-run.png)
4. Navigate to qTest Automation Host UI. Click "Poll Now" button, the host should kickoff the UFT script
5. When the test finished its execution, the result should be submiited on qTest ![result-on-qTest.png](/images/result-on-qTest.png)

