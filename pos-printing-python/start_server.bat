@echo off
title Temple Bill Printer Server
cd /d %~dp0
if not exist ".venv\Scripts\activate.bat" (
    echo Virtual environment not found!
    pause
    exit /b 1
)
call .venv\Scripts\activate.bat
start /min cmd /c "python app.py"
echo Server started! You can close this window.
timeout /t 5 