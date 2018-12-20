# uft-sample-14.03
sample project for UFT 14.03
# Prerequisite
1. qTest Automation Host (2.2.1 or newer)and UFT 14.03, installed on host
# How to use
1. Clone this project, for example: C:\uft-samples\uft-sample-14.03
2. Go to cloned folder at step #1
3. Create a Universal Agent with flowing configuration[./images/universal-agent-with-uft.png](./images/universal-agent-with-uft.png)
    - Executor: batch
    - Content: 
    ```
    cscript "C:\uft-samples\uft-sample-14.03\qtp.vbs" /run-path:"C:\uft-samples\uft-sample-14.03\qasymphony.com" /result-path:"C:\uft-samples\uft-sample-14.03\qasymphony.com\result"
    ```
    - Path to result: C:\uft-samples\uft-sample-14.03\qasymphony.com\result
    - Result Parser: Unified Funtional Testing (UFT)
# Run kickoff script
    - [./images/how-it-works.gif]

