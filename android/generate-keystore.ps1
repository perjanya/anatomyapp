# Generate Keystore for Google Play Store Signing
# Run this script to create a keystore for signing your APK

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Anatomy Hub - Keystore Generator" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$keystorePath = "app\anatomy-hub-release-key.jks"

if (Test-Path $keystorePath) {
    Write-Host "❌ Keystore already exists at: $keystorePath" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite? (yes/no)"
    if ($overwrite -ne "yes") {
        Write-Host "Aborted." -ForegroundColor Red
        exit
    }
}

Write-Host "Please provide the following information for your keystore:" -ForegroundColor Green
Write-Host ""

# Generate the keystore
$alias = "anatomy-hub-key"
$validity = 10000 # Valid for ~27 years

Write-Host "Generating keystore..." -ForegroundColor Yellow
Write-Host "Alias: $alias" -ForegroundColor Gray
Write-Host "Validity: $validity days" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  IMPORTANT: Remember your password! You'll need it for every release." -ForegroundColor Red
Write-Host ""

# Run keytool
keytool -genkeypair `
    -v `
    -keystore $keystorePath `
    -alias $alias `
    -keyalg RSA `
    -keysize 2048 `
    -validity $validity

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Keystore generated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Create a file: android\keystore.properties" -ForegroundColor White
    Write-Host "2. Add the following content (replace PASSWORD with your password):" -ForegroundColor White
    Write-Host ""
    Write-Host "storePassword=YOUR_STORE_PASSWORD" -ForegroundColor Yellow
    Write-Host "keyPassword=YOUR_KEY_PASSWORD" -ForegroundColor Yellow
    Write-Host "keyAlias=$alias" -ForegroundColor Yellow
    Write-Host "storeFile=anatomy-hub-release-key.jks" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. Add keystore.properties to .gitignore (NEVER commit it!)" -ForegroundColor Red
    Write-Host "4. Run the build script again" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Failed to generate keystore" -ForegroundColor Red
}
