echo Ubicacion Carpeta
cd /d %~dp0
@echo off
echo:
@echo on
git checkout desarrollo
git fetch
git pull
PAUSE