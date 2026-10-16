A touch-oriented web app that runs in a canvas element.



[See the code running here.](https://csusbdt.github.io/trees/)



To start a webserver:

\~\~\~

&#x20;  python -m http.server 8080 -d docs

\~\~\~



To debug running on iPhone:



\~\~\~

&#x20;  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

&#x20;  npx remotedebug-ios-webkit-adapter --port=9000



&#x20;  //ios\_webkit\_debug\_proxy --proxy 27015:9222

&#x20;  //remotedebug\_ios\_webkit\_adapter --port=9000



\~\~\~



The go to chrome://inspect/#devices





0  root

1  root\_left

2  root\_right

3  root\_left\_left stub

4  root\_left\_right stub

5  root\_right\_left

6  root\_right\_right stub

7  root\_right\_right\_left stub

8  root\_right\_right\_right stub

9  root\_right\_left\_left stub

10 root\_right\_left\_right stub



branches === 10

