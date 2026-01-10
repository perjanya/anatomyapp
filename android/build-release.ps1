# Build Signed APK for Google Play Store
# This script builds a release APK signed with your keystore

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Anatomy Hub - Build Signed APK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if keystore exists
if (-not (Test-Path "app\anatomy-hub-release-key.jks")) {
    Write-Host "❌ Keystore not found!" -ForegroundColor Red
    Write-Host "Please run: .\generate-keystore.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Check if keystore.properties exists
if (-not (Test-Path "keystore.properties")) {
    Write-Host "❌ keystore.properties not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create android\keystore.properties with:" -ForegroundColor Yellow
    Write-Host "storePassword=YOUR_STORE_PASSWORD" -ForegroundColor Gray
    Write-Host "keyPassword=YOUR_KEY_PASSWORD" -ForegroundColor Gray
    Write-Host "keyAlias=anatomy-hub-key" -ForegroundColor Gray
    Write-Host "storeFile=anatomy-hub-release-key.jks" -ForegroundColor Gray
    exit 1
}

Write-Host "🔄 Syncing web content..." -ForegroundColor Yellow
cd ..
npx cap sync android
cd android

Write-Host ""
Write-Host "🔨 Building signed release APK..." -ForegroundColor Yellow
./gradlew assembleRelease

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ APK built successfully!" -ForegroundColor Green
    Write-Host ""
    
    $apkPath = "app\build\outputs\apk\release\app-release.apk"
    if (Test-Path $apkPath) {
        $apkSize = [math]::Round((Get-Item $apkPath).Length / 1MB, 2)
        Write-Host "📦 APK Location: $apkPath" -ForegroundColor Cyan
        Write-Host "📊 APK Size: $apkSize MB" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "🚀 Ready for Google Play Store upload!" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "❌ Build failed" -ForegroundColor Red
}
