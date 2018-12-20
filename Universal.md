# uft-sample-14.03
Sample project for UFT 14.03 that is integrated with Universal Agent

# Prerequisite
1. qTest Automation Host (2.2.1 or newer) and UFT 14.03, installed on host
2. Enable Automation Settings on qTest and add mapping statuses ![enable_automation_map_status.png](/images/enable_automation_map_status.png)

# How to use
1. Clone this project to local folder, for example: C:\uft-samples\uft-sample-14.03
2. Navigate to UI of qTest Automation Host
3. Create a new agent which is of type Universal Agent with flowing configurations ![universal-agent-with-uft.png](/images/universal-agent-with-uft.png)
    - Executor: batch
    - Execute Command: 
    ```
    cscript "C:\uft-samples\uft-sample-14.03\qtp.vbs" /run-path:"C:\uft-samples\uft-sample-14.03\qasymphony.com" /result-path:"C:\uft-samples\uft-sample-14.03\qasymphony.com\result"
    ```
    - Path to result: C:\uft-samples\uft-sample-14.03\qasymphony.com\result
    - Result Parser: Unified Funtional Testing (UFT)
    - Working directory: left it empty

# Note on Execution Command
    - run-path: should point to main folder of UFT project (parent folder of *.usr file) 
    - result-path: should be identical with 'Path to result' value
        
# How it works
Please refer to [how-it-works.gif](./images/how-it-works.gif)

