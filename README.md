# The Daily Loop - app

A daily and weekly learning-loop tracker for the practitioner circle. Built on Kolb's
cycle: a mood check-in, then Experience, Reflect, Model, Try. Data stays private to
each person: it lives in their browser and, if they sign in, syncs to a hidden folder in
their own Google Drive that only this app can read.

## Files

- `index.html` - the whole app.
- `config.js` - your Google client ID and (optional) feedback endpoint.
- `privacy.html` - Terms of Use & Privacy Policy, linked from the app footer.
- `feedback-mailer.gs.txt` - reference copy of the Google Apps Script that sends in-app feedback. Editing this file does NOT update the live script - see "In-app feedback" below.
- `CNAME` - the custom domain for GitHub Pages (daily.nami.org.in). Don't delete this file or the custom domain will break.
- `README.md` - this file.

## What works right now, with no setup

Open the app and it runs fully offline. Entries save in the browser on that device
(localStorage). No account needed. Google sign-in is optional and only adds cross-device
sync. So students can start using it immediately, and you can add sync later.

## One-time setup for Google Drive sync

You need a Google OAuth client ID. It is free and takes about ten minutes. You only do
this once.

1. Go to https://console.cloud.google.com and create a project (any name).
2. In the left menu, open **APIs & Services > Library**, search for **Google Drive API**, and click **Enable**.
3. Open **APIs & Services > OAuth consent screen**. Choose External, fill in the app name ("The Daily Loop"), your email, and save. Under Scopes you do not need to add anything. Under Test users, add the Google emails that will use it while the app is in "testing" (you can publish it later to remove that limit).
4. Open **APIs & Services > Credentials > Create credentials > OAuth client ID**.
5. Application type: Web application.
6. Under Authorized JavaScript origins, add every address the app runs from - for example `http://localhost:8000`, `https://dev348.github.io`, and `https://daily.nami.org.in`.
7. Create, then copy the Client ID (it ends with `.apps.googleusercontent.com`).
8. Open `config.js` and paste the client ID between the quotes. Save.

## Run it locally

The app must be served over a URL, not opened as a file, or Google sign-in will not work. From this folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. (Make sure http://localhost:8000 is in the Authorized JavaScript origins from step 6.)

## Put it online for the batch

Live now at **https://daily.nami.org.in** (a custom domain pointed at GitHub Pages, repo `dev348/dailyloop`, served from the `main` branch). The underlying GitHub Pages URL `https://dev348.github.io/dailyloop/` also works. Both are added as Authorized JavaScript origins in Google Cloud.

Share the final URL with the batch. Each person signs in with their own Google account and their data goes to their own Drive.

## In-app feedback (free, unlimited)

The feedback box at the bottom of the app sends in-app through a small Google Apps Script Web App tied to your own Gmail - free, no third-party service, no monthly cap (Gmail's own sending limit is 500/day). Setup:

1. Go to https://script.google.com, start a new project, paste in the contents of `feedback-mailer.gs.txt`, and save.
2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
3. Copy the resulting URL (ends in `/exec`) into `config.js` as `feedbackFormEndpoint`.
4. If you ever change `feedback-mailer.gs.txt`, you must also paste the change into the live script.google.com project and create a new deployment version - editing this file in the repo alone does not update what's live.

If `feedbackFormEndpoint` is left blank, the feedback box falls back to opening the visitor's own email app instead.

## Privacy and security, by design

- **Least-privilege scope.** The app asks only for `drive.appdata`. That is a special hidden folder in the user's own Drive that only this app can see. It cannot read, list, or touch any of the user's other files, photos, or documents.
- **Data stays with the user.** Entries are stored on the user's device and in their own Drive. There is no shared server and no database you or anyone else controls. You cannot see students' entries.
- **No third parties.** The app makes network calls only to Google (sign-in and Drive) and, if configured, to your own Apps Script feedback endpoint. No analytics, no trackers, no other services.
- **Token in memory only.** The Google access token is held in memory for the session and is never written to storage. Signing out revokes it.
- **Offline first.** If a student never signs in, nothing leaves their device.
- **Full policy.** See `privacy.html`, linked from the app's footer.

## Ideas to take further in Claude Code

Open this folder in Claude Code to keep building. Good next steps:

- A gentle daily reminder or streak nudge.
- Export a month as a PDF or printable page for the circle.
- A shared, opt-in "circle wall" (this would need a small backend and careful consent, since it changes the privacy model).
- Simple charts of mood over time from the check-ins.
