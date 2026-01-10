# Google Play Store Deployment Guide

## Overview
This guide will help you generate a signed APK for Google Play Store submission.

## Current Version
- **Version Code**: 2
- **Version Name**: 1.1.0
- **Package**: com.heliosmed.app
- **App Name**: Anatomy Hub

## Latest Changes (v1.1.0)
- ✅ All 34 upper-limb anatomy topics with Word documents
- ✅ Interactive MCQs (7 topics with 47 questions)
- ✅ Reordered TOC in logical anatomical sequence
- ✅ Updated Radial nerve content
- ✅ Box formatting (Clinical, Warning, Note, Info boxes)
- ✅ Proper HTML structure with complete loading

---

## Step 1: Generate Keystore (First Time Only)

⚠️ **IMPORTANT**: You only need to do this ONCE. Keep your keystore and passwords safe forever!

### Run the keystore generator:
```powershell
cd android
.\generate-keystore.ps1
```

### Follow the prompts:
- **Password**: Choose a strong password (remember it!)
- **Name**: Your name
- **Organization**: Helios Med / Your organization
- **City**: Your city
- **State**: Your state
- **Country**: Your country code (e.g., US, IN, UK)

### ⚠️ CRITICAL - Backup Your Keystore!
After generation, backup these files to a secure location:
- `android/app/anatomy-hub-release-key.jks` - Your keystore file
- Your passwords (store securely, never commit to git!)

**If you lose the keystore, you can NEVER update your app on Play Store!**

---

## Step 2: Create keystore.properties

Create a file: `android/keystore.properties`

Add this content (replace with YOUR passwords):
```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=anatomy-hub-key
storeFile=anatomy-hub-release-key.jks
```

### ⚠️ SECURITY - Add to .gitignore
Make sure `android/keystore.properties` is in `.gitignore`

**NEVER commit keystore.properties to git!**

---

## Step 3: Build Signed APK

### Option A: Use the build script (Recommended)
```powershell
cd android
.\build-release.ps1
```

### Option B: Manual build
```powershell
cd android
./gradlew assembleRelease
```

The signed APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Step 4: Upload to Google Play Store

### A. First Time Setup (If not done)
1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in app details:
   - **App Name**: Anatomy Hub
   - **Category**: Medical / Education
   - **Package**: com.heliosmed.app

### B. Upload APK/AAB
1. Go to **Production** → **Create new release**
2. Upload the APK: `app-release.apk`
3. Add release notes:
   ```
   Version 1.1.0 - Major Content Update
   
   New Features:
   - Complete upper-limb anatomy coverage (34 topics)
   - Interactive MCQs with instant feedback
   - Organized content in anatomical sequence
   - Enhanced visual boxes (Clinical, Warning, Note)
   - Improved content navigation
   
   Updated Topics:
   - All bones of upper limb
   - Muscles, nerves, and blood vessels
   - Hand anatomy and movements
   - Complete nerve coverage (Median, Ulnar, Radial)
   ```

### C. Complete Store Listing
- App screenshots (4-8 recommended)
- Feature graphic (1024 x 500)
- App icon (512 x 512)
- Short description
- Full description
- Privacy policy URL (required)

---

## For Future Updates

### 1. Update Version Numbers
Edit `android/app/build.gradle`:
```groovy
versionCode 3        // Increment by 1
versionName "1.2.0"  // Update as needed
```

### 2. Sync and Build
```powershell
cd android
.\build-release.ps1
```

### 3. Upload New Version
- Go to Play Console → Production → Create new release
- Upload new APK
- Add release notes
- Review and rollout

---

## Generate Android App Bundle (AAB) - Recommended by Google

For better optimization and smaller download sizes:

```powershell
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

**Note**: AAB is preferred by Google Play Store and enables:
- Smaller download sizes
- Automatic APK optimization
- Dynamic feature delivery

---

## Troubleshooting

### "Keystore not found"
- Run `.\generate-keystore.ps1` first
- Make sure the keystore is in `android/app/` directory

### "keystore.properties not found"
- Create the file in `android/` directory
- Check file name spelling exactly

### "Wrong password"
- Verify passwords in `keystore.properties`
- Try regenerating keystore if forgotten

### Build fails
- Check Java version: `java -version` (need Java 11 or 17)
- Clean build: `./gradlew clean`
- Sync capacitor: `npx cap sync android`

---

## Version History

### v1.1.0 (Current)
- Complete upper-limb anatomy content
- Interactive MCQs
- Reordered TOC
- Enhanced formatting

### v1.0.0 (Initial Release)
- Initial app structure
- Basic content framework

---

## Security Checklist

- [ ] Keystore backed up securely
- [ ] Passwords stored safely (password manager recommended)
- [ ] `keystore.properties` in `.gitignore`
- [ ] Keystore file NOT in git repository
- [ ] Team members have backup access to keystore

---

## Support

For issues or questions about:
- **App content**: Update Word documents in `www/content/`
- **Building**: Check this README and troubleshooting section
- **Play Store**: Refer to [Google Play Console Help](https://support.google.com/googleplay/android-developer)
