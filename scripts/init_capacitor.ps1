# Run this PowerShell script from the project root to initialize Capacitor and add Android platform.
# Prerequisites:
# - Node.js and npm installed
# - Java JDK and Android SDK + Android Studio installed
# - Run PowerShell as normal user (not restricted execution) or use Unrestricted execution policy for this script

npm install --no-audit

# Initialize Capacitor (uses capacitor.config.json already present)
npx cap sync android --web-dir=mobile

# Open Android Studio project
npx cap open android

Write-Host "Capacitor initialized. Android project opened in Android Studio. Complete signing/build inside Android Studio." -ForegroundColor Green
