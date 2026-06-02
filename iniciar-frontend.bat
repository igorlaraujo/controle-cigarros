@echo off
title Controle de Cigarros - Front-End

echo Iniciando Front-End do Controle de Cigarros...
echo.

cd /d "%~dp0frontend"

echo O Front-End sera aberto em:
echo http://127.0.0.1:5500/index.html
echo.

start "" "http://127.0.0.1:5500/index.html"

python -m http.server 5500 --bind 127.0.0.1

pause