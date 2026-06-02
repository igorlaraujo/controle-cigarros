@echo off
title Controle de Cigarros - Back-End

echo Iniciando Back-End do Controle de Cigarros...
echo.

cd /d "%~dp0backend"

call .venv\Scripts\activate.bat

uvicorn main:app --reload

pause