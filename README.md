# uft-sample-14.03
This is a sample UFT project that is supposed to be kicked off by Universal Agent against UFT 14.03

# Integration instruction
Follow this article to [schedule and kick off UFT test with Universal Agent](https://documentation.tricentis.com/qtest/od/en/content/qtest_launch/universal_agent_user_guides/integrate_uft_with_universal_agent.htm)
        
# How it works
1. Scan and create test case from UFT project to qTest Manager ![scan_create_test_case.png](/images/scan_create_test_case.png)
2. Access to your project in qTest Manager. Go to Test Execution and create test run from the newly created test case
3. Schedule test execution for the test run (created at #2) ![schedule_test-run.png](/images/schedule_test-run.png)
4. Navigate to qTest Automation Host UI. Click "Poll Now" button, the host should kickoff the UFT script
5. When the test finished its execution, the result should be submiited on qTest ![result-on-qTest.png](/images/result-on-qTest.png)

