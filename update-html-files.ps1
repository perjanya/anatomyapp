# Update all HTML files to remove anatomy-modern.css and MCQ-related scripts
$contentDir = "D:\anatomy_notes_explorer\notes_to_website\www\content"
$htmlFiles = Get-ChildItem -Path $contentDir -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove anatomy-modern.css link
    $content = $content -replace '<link rel="stylesheet" href="../../css/anatomy-modern.css">\r?\n?', ''
    
    # Remove interactive-features.js script
    $content = $content -replace '<script src="../../js/interactive-features.js"><\/script>\r?\n?', ''
    
    # Remove topic-tools.js script
    $content = $content -replace '<script src="../../js/topic-tools.js"><\/script>\r?\n?', ''
    
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Updated: $($file.Name)"
}

Write-Host "Done updating all HTML files"
