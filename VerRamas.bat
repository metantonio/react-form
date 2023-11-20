echo Ubicacion Carpeta
cd /d %~dp0
@echo off
@powershell -noninteractive -nologo -noprofile -executionpolicy bypass -command ".\VerRamas.ps1"

PAUSE