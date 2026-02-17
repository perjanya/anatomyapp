# Document Upload Script
# This script handles copying documents from Dr Vivek Files and uploading them

param(
    [string]$SourcePath = "c:\Users\pavan\OneDrive\Desktop\Dr Vivek Files",
    [string]$DestinationPath = "c:\Users\pavan\OneDrive\Desktop\VS CODE\ANATOMY\uploaded-documents",
    [string]$UploadEndpoint = "" # Specify your upload endpoint here
)

# Create destination folder if it doesn't exist
if (-not (Test-Path $DestinationPath)) {
    New-Item -ItemType Directory -Path $DestinationPath -Force
    Write-Host "Created destination folder: $DestinationPath"
}

# Copy all files from source to destination
if (Test-Path $SourcePath) {
    Write-Host "Copying files from $SourcePath..."
    Copy-Item -Path "$SourcePath\*" -Destination $DestinationPath -Recurse -Force
    Write-Host "Files copied successfully!"
    
    # List copied files
    Write-Host "`nCopied files:"
    Get-ChildItem -Path $DestinationPath -Recurse | ForEach-Object {
        Write-Host "  - $($_.FullName)"
    }
} else {
    Write-Host "ERROR: Source path not found: $SourcePath"
    exit 1
}

# If upload endpoint is specified, upload files
if ($UploadEndpoint) {
    Write-Host "`nUploading files to: $UploadEndpoint"
    Get-ChildItem -Path $DestinationPath -File | ForEach-Object {
        try {
            $fileContent = [System.IO.File]::ReadAllBytes($_.FullName)
            $fileName = $_.Name
            
            # Upload file (adjust based on your API)
            Write-Host "Uploading: $fileName"
            # Add your upload logic here
        } catch {
            Write-Host "ERROR uploading $($_.Name): $_"
        }
    }
    Write-Host "Upload complete!"
} else {
    Write-Host "`nTo upload files, specify the -UploadEndpoint parameter"
}
