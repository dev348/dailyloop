# The Daily Loop - app

A daily and weekly learning-loop tracker for the practitioner circle. Built on Kolb's
cycle: an emoji check-in, then Experience, Reflect, Model, Try. Data stays private to
each person: it lives in their browser and, if they sign in, syncs to a hidden folder in
their own Google Drive that only this app can read.

## Files

- `index.html` - the whole app.
- `config.js` - where you paste your Google client ID.
- `README.md` - this file.

## What works right now, with no setup

Open the app and it runs fully offline. Entries save in the browser on that device
(localStorage). No account needed. Google sign-in is optional and only adds cross-device
sync. So students can start using it immediately, and you can add sync later.

## One-time setup for Google Drive sync

You need a Google OAuth client ID. It is free and takes about ten minutes. You only do
this once.

1. Go to https://console.cloud.google.com and create a project (any name).
2. In the left menu, open **APIs & Services > Library**, search for **Google Drive API**,
   and click **Enable**.
3. Open **APIs & Services > OAuth consent screen**. Choose **External**, fill in the app
   name ("The Daily Loop"), your email, and save. Under **Scopes** you do not need to add
   anything. Under **Test users**, add the Google emails that will use it while the app is
   in "testing" (you can publish it later to remove that limit).
4. Open **APIs & Services > Credentials > Create credentials > OAuth client ID**.
   - Application type: **Web application**.
   - Under **Authorized JavaScript origins**, add every address the app runs from. For
     local testing add `http://localhost:8000`. For a deployed version add its URL, for
     example `https://yourname.github.io`.
   - Create, then copy the **Client ID** (it ends with
     `.apps.googleusercontent.com`).
5. Open `config.js` and paste the client ID between the quotes. Save.

## Run it locally

The app must be served over a URL, not opened as a file, or Google sign-in will not work.
From this folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (Make sure `http://localhost:8000` is
in the Authorized JavaScript origins from step 4.)

## Put it online for the batch

Any static host works, since there is no server code. Easiest options:

- **GitHub Pages:** push these files to a repo, enable Pages, and use the resulting
  `https://...github.io/...` URL. Add that URL to the Authorized JavaScript origins.
- **Netlify or Cloudflare Pages:** drag the folder in, then add the given URL to the
  origins.

Share the final URL with the batch. Each person signs in with their own Google account
and their data goes to their own Drive.

## Privacy and security, by design

- **Least-privilege scope.** The app asks only for `drive.appdata`. That is a special
  hidden folder in the user's own Drive that only this app can see. It cannot read,
  list, or touch any of the user's other files, photos, or documents.
- **Data stays with the user.** Entries are stored on the user's device and in their own
  Drive. There is no shared server and no database you or anyone else controls. You
  cannot see students' entries.
- **No third parties.** The app makes network calls only to Google (sign-in and Drive)
  and to Google Fonts. No analytics, no trackers, no other services.
- **Token in memory only.** The Google access token is held in memory for the session and
  is never written to storage. Signing out revokes it.
- **Offline first.** If a student never signs in, nothing leaves their device.
- **Feedback stays out-of-band.** The feedback box at the bottom opens the person's own
  email app with a message addressed to mswaran.r@collab.isdm.org.in. The app itself
  never sends anything anywhere.

## Ideas to take further in Claude Code

Open this folder in Claude Code to keep building. Good next steps:

- A gentle daily reminder or streak nudge.
- Export a month as a PDF or printable page for the circle.
- A shared, opt-in "circle wall" (this would need a small backend and careful consent,
  since it changes the privacy model).
- Simple charts of emotion over time from the emoji check-ins.
