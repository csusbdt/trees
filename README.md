A touch-oriented web app that runs in a canvas element.



[See the code running here.](https://csusbdt.github.io/trees/)



To start a webserver:

\~\~\~

&#x20;  python -m http.server 8080 -d docs

\~\~\~



To run scripts in power shell:



\~\~\~

&#x20;  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

\~\~\~



Promtp: 

> Powershell command to compute the number of times a file named "index.html" appears in all subdirectories of a given directory



To count the total number of branches the user can follow, run the following from the project root folder.

\~\~\~

(Get-ChildItem -Path "docs/root" -Filter "index.html" -Recurse -File).Count

\~\~\~



For console output on iPhone, go to chrome://inspect





/\* OLD

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

10 root\_right\_left\_right

11 root\_right\_left\_right\_left stub

12 root\_right\_left\_right\_right stub

\*/



branches === 13

