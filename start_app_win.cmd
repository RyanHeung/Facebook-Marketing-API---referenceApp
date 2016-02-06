@echo off
setlocal

cd /d %~dp0

set NODE_EXE=node
set NPM_EXE=npm

rem try to locate Node.js installed on this machine
%NODE_EXE% -v >nul 2>&1
if errorlevel 1 goto ERR_NO_NODE

rem try to verify the Node.js version
set VERSION=
for /f "delims=" %%i in ('%NODE_EXE% -v') do set VERSION=%%i
if "%VERSION%" lss "v0.12." goto ERR_LOW_VER

rem start web server for this app
%NODE_EXE% webserver.js

goto:eof

:ERR_NO_NODE
echo Node.js is not available on this machine.
goto ERR_SHARED

:ERR_LOW_VER
echo Your Node.js version is too low.
goto ERR_SHARED

:ERR_SHARED
echo You need to install nodejs (^>=v0.12.0).
exit /b 1
