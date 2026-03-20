@echo off
setlocal

echo Cleaning .next, node_modules, package-lock.json...
if exist ".next" rd /s /q ".next"
if exist "node_modules" rd /s /q "node_modules"
if exist "package-lock.json" del /f /q "package-lock.json"

echo Installing dependencies...
call npm install
if errorlevel 1 (
  echo npm install failed.
  exit /b 1
)

echo Starting development server...
call npm run dev

endlocal
