@echo off
setlocal enabledelayedexpansion

set "rama_destino=main"

for /f "delims=" %%A in ('git branch --format="%%(refname:short)"') do (
    set "rama=%%A"
    if not "!rama!"=="!rama_destino!" (
        for /f %%B in ('git log --merges --oneline --no-merges !rama!..!rama_destino! -- ^| find /c /i "pull request"') do set "count=%%B"
        echo Rama: !rama! - Pull Requests: !count!
    )
)

endlocal

pause