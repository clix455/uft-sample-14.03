# uft-sample-14.03
sample project for UFT 14.03
# Prerequisite
1. qTest Automation Host (2.2.1 or newer) and UFT 14.03, installed on host
# How to use
1. Clone this project to local folder, for example: C:\uft-samples\uft-sample-14.03
2. Navigate to UI of qTest Automation Host
3. Create an agent with Agent Type: Unified Functional Testing ![uft-agent.png](/images/uft-agent.png)
    - Directory: C:\uft-samples\uft-sample-14.03
    - Include: **/*.usr
# Note on agent configuration
    - Value of Directory should be parent location of UFT project
    - Ex: If location of usr file is: C:\uft-samples\uft-sample-14.03\qasymphony.com\qasymphony.com.usr, then Direcory must be C:\uft-samples\uft-sample-14.03
        
# How it works
1. Scan click Save and Scan to create test case ![scan_create_test_case.png](/images/scan_create_test_case.png)
2. Create test suite from the test case
3. Schedule the test run (created at #2) ![schedule_test-run.png](/images/schedule_test-run.png)
4. Navigate to UI of qTest Automation Host, click "Poll Now" button, the host should kickoff the test project run
5. After the test finished it's excution, the result should be submiited on qTest ![result-on-qTest.png](/images/result-on-qTest.png)

