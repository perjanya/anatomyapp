Mobile app notes

This is a minimal, client-side mobile-app-like SPA located in `mobile/`.

How to preview

1. In Windows Explorer open `mobile/index.html` with your browser (Chrome/Edge work well).
2. For best PWA behavior, serve the folder over a local HTTP server (e.g., `npx http-server`), then open `http://localhost:8080/mobile/index.html` and install as PWA.

Logo

- Place your logo file at `mobile/assets/logo.jpg`. I could not copy your image from your desktop path — please copy it into that location. The app will show the logo at the top.

Remote topics (auto-update)

- The app attempts to fetch remote JSON at `../data/toc-mobile.json` (also checks `../data/toc.json` and `../data/toc-topics.json`).
- Supported formats: a simple `{ topics: [...], subtopics: {...} }` or an array of sections with `section`/`items` and optional `url` fields. If found, topics/subtopics are replaced at runtime without reinstalling the app.

Push notifications

- The app includes a basic service worker scaffold at `mobile/sw.js` and registers it. To enable push notifications you will need:
	1) A push provider (Firebase Cloud Messaging is common).
	2) A server or cloud function to send push messages via the provider's API.
	3) Add provider-specific code to the service worker and client (e.g., Firebase Messaging SDK and config).
- I can help configure FCM and integrate push if you want — note: for native Android via Capacitor you can use the Capacitor Push plugin which requires additional setup.

Packaging as a real native app

- You can wrap this with Capacitor to produce Android/iOS builds. For Android you can build an APK from Windows following these steps (I can scaffold the Capacitor files):

```bash
npm install @capacitor/cli @capacitor/android --save-dev
npx cap init
# set webDir to "mobile" in capacitor.config.json, then:
npx cap add android
npx cap copy
npx cap open android
```

- For iOS you need macOS/Xcode or a cloud macOS builder.

Next steps I can do now

- Wire the app to consume `data/` JSON files you generate (done).
- Integrate Firebase Cloud Messaging (FCM) for push notifications (requires your FCM keys).
- Scaffold Capacitor config and prepare for Android build.

LLM endpoint scaffold

- I added a small scaffold `scripts/llm_server_scaffold.js` which demonstrates a secure server endpoint pattern that accepts topic text and calls an LLM (OpenAI) to generate MCQs or clinical cases. It expects `OPENAI_API_KEY` as an environment variable on the server. Run locally for testing:

```bash
npm install express body-parser axios
# On PowerShell (Windows) use:
$env:OPENAI_API_KEY = "your_key"
node scripts/llm_server_scaffold.js
# On macOS / Linux use:
# OPENAI_API_KEY=your_key node scripts/llm_server_scaffold.js
```

POST JSON to `http://localhost:3456/generate` like `{ "type":"mcq", "text":"...topic text...", "count":5 }`.

Note: You must secure this endpoint (authentication, rate limits) before making it public. I can help deploy it as a serverless function (AWS Lambda, Vercel, or similar).

Vercel deploy (one-click style)

- I added a serverless handler at `api/generate.js` suitable for deploying to Vercel. To deploy:

1. Install the Vercel CLI (optional) and log in: `npm i -g vercel` then `vercel login`.
2. From the project root run `vercel` and follow prompts, or use the Vercel web UI to import this Git repository.
3. In the Vercel project settings add environment variables:
	- `OPENAI_API_KEY` = your OpenAI API key
	- (optional) `SIMPLE_API_KEY` = a short secret token. If set, clients must include this token in the `x-api-key` header.
4. After deploy Vercel will provide a public URL like `https://your-app.vercel.app`. The serverless function will be available at `https://your-app.vercel.app/api/generate`.

In your mobile app set `mobile/config.js` -> `window.LLM_ENDPOINT` to the function URL and (if you used `SIMPLE_API_KEY`) set `window.LLM_CLIENT_KEY` to that token.

Example `mobile/config.js` after deploy:

```js
window.LLM_ENDPOINT = 'https://your-app.vercel.app/api/generate';
window.LLM_CLIENT_KEY = 'paste_simple_api_key_here';
```

Security notes

- Do not place `OPENAI_API_KEY` in client-side code. Only the server should have it.
- If you set `SIMPLE_API_KEY`, do not embed it in a public app binary; treat it as a convenience for trusted distributions only. For public apps, use a proper auth flow (user tokens) or additional server-side checks.

Which would you like me to do next?
 
Capacitor / Android quick start

- I've added `capacitor.config.json` (webDir set to `mobile`) and helper npm scripts.
- To initialize Capacitor and create the Android project on your Windows machine, run:

```powershell
# from project root
npm install
npm run cap:init
npm run cap:add-android
npm run cap:copy
npm run cap:open-android
```

- Or run the provided PowerShell helper: `scripts\init_capacitor.ps1` (it runs `npm install` and opens Android Studio).

- After Android Studio opens: Build > Generate Signed Bundle / APK… to produce a signed APK. You'll need a signing key (create one via Build tools if you don't have it).

Notes

- I cannot run these Capacitor commands from here; they must be executed on your machine where Android Studio / SDK are installed. If you want, I can guide you step-by-step while you run them.

