@echo off
echo === CAD MODELING FOLDER RENAMING TO MATCH SERVICE FILE ===
echo.

cd "public\images\services\Engineering services\cad-modeling\process"

echo Current folder structure:
dir /b
echo.

echo Renaming folders to match service file paths...
echo.

REM Step 5: Design Validation - service expects ED-6-review-revision
if exist "ED-5-Design validation" (
    echo Renaming "ED-5-Design validation" to "ED-6-review-revision"
    ren "ED-5-Design validation" "ED-6-review-revision"
) else (
    echo Warning: "ED-5-Design validation" not found
)

REM Step 6: Post-Validation Iteration - service expects ED-7-final-documentation  
if exist "ED-6-Post-validation iteration" (
    echo Renaming "ED-6-Post-validation iteration" to "ED-7-final-documentation"
    ren "ED-6-Post-validation iteration" "ED-7-final-documentation"
) else (
    echo Warning: "ED-6-Post-validation iteration" not found
)

REM Step 7: Design Handover - service also expects ED-7-final-documentation (duplicate)
REM We need to remove the duplicate folder since both steps 6 and 7 point to same path
if exist "ED-7-Design handover" (
    echo Removing duplicate folder "ED-7-Design handover" 
    echo (Steps 6 and 7 both use ED-7-final-documentation in service file)
    rmdir /s /q "ED-7-Design handover"
) else (
    echo Warning: "ED-7-Design handover" not found
)

echo.
echo Renaming complete! New folder structure:
dir /b
echo.
echo === DONE ===