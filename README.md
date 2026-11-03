A touch-oriented web app that runs in a canvas element.


[See the code running here.](https://csusbdt.github.io/trees/)


To start a webserver:

\~\~\~
&#x20;  python -m http.server 8080 -d docs
\~\~\~

Run ```ipconfig``` to determine ip address on lan.

To run scripts in power shell:

\~\~\~
&#x20;  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
\~\~\~

Promtp: 

> Powershell command to compute the number of times a file named "index.html" appears in all subdirectories of a given directory

To count the total number of nodes the user can visit.
Subtract 1 to get the number of branches to follow.


\~\~\~
(Get-ChildItem -Path "docs/root" -Filter "index.html" -Recurse -File).Count
\~\~\~


For console output on iPhone, go to chrome://inspect




