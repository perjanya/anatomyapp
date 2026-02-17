# Convert Word Documents to HTML with Box Formatting
# This script converts all DOCX files from Dr Vivek Files folder to formatted HTML

param(
    [string]$InputFolder = "c:\Users\pavan\OneDrive\Desktop\Dr Vivek Files",
    [string]$OutputFolder = "c:\Users\pavan\OneDrive\Desktop\VS CODE\ANATOMY\www\content\dr-vivek-converted"
)

$ANATOMY_PATH = "c:\Users\pavan\OneDrive\Desktop\VS CODE\ANATOMY"

# Check if node_modules has mammoth installed
if (-not (Test-Path "$ANATOMY_PATH\node_modules\mammoth")) {
    Write-Host "Installing mammoth package..." -ForegroundColor Yellow
    Push-Location $ANATOMY_PATH
    npm install mammoth
    Pop-Location
}

# Run the conversion script
Write-Host "Starting Word to HTML conversion..." -ForegroundColor Cyan
Write-Host "Input: $InputFolder"
Write-Host "Output: $OutputFolder`n"

Push-Location $ANATOMY_PATH
node scripts/convert-word-to-boxes.js $InputFolder $OutputFolder
Pop-Location

Write-Host "`nConversion script execution complete!`n" -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "1. Review the converted files in: $OutputFolder"
Write-Host "2. Edit box markers manually if needed using the guide in BOX-FORMATTING-GUIDE.md"
Write-Host "3. Run: node scripts/process_boxes.js - to apply final formatting"
