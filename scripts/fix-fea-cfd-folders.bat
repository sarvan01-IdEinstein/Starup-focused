@echo off
echo === FEA & CFD FOLDER ALIGNMENT FIX ===
echo.

cd "public\images\services\Engineering services\finite-element-cfd\process"

echo Current folder structure:
dir /b
echo.

echo Fixing folder alignment issues...
echo.

REM Remove the incorrect "FA-5-multi-condition" folder since we have the correct "FA-5-multi-condition-analysis"
if exist "FA-5-multi-condition" (
    echo Removing duplicate folder "FA-5-multi-condition"
    echo (Service file expects "FA-5-multi-condition-analysis")
    rmdir /s /q "FA-5-multi-condition"
) else (
    echo Warning: "FA-5-multi-condition" not found
)

echo.
echo Fix complete! New folder structure:
dir /b
echo.
echo === DONE ===