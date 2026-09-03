// Daily Loop - configuration
// Google OAuth "Web application" client ID for project "The Daily Loop".
// The client ID is safe to keep in this file. It is not a secret.
// Authorized JavaScript origin currently set in Google Cloud: http://localhost:8000
// (add your deploy URL as another origin in the console before hosting it online).
//
// Feedback form (optional, free, unlimited): a tiny Google Apps Script tied
// to your own Google account emails you when someone taps "Send feedback" -
// no third-party service, no monthly cap (Gmail's own limit is 500/day).
// One-time setup, about 5 minutes:
//   1. Go to https://script.google.com and click "New project".
//   2. Delete the placeholder code, paste in the contents of
//      "feedback-mailer.gs.txt" (in this same folder), and save.
//   3. Click Deploy > New deployment > gear icon > Web app.
//      - Execute as: Me
//      - Who has access: Anyone
//   4. Click Deploy. The first time, Google will ask you to authorize the
//      script to send email as you - approve it (it's your own script).
//   5. Copy the "Web app" URL it gives you (ends in /exec) and paste it
//      below as feedbackFormEndpoint.
// Leave it blank ("") to keep the feedback box working the old way, which
// opens the visitor's own email app instead of sending in-app.
// If you ever edit the script, you must create a new deployment (or "Manage
// deployments" > edit > New version) for the change to go live.
window.DAILY_LOOP_CONFIG = {
  clientId: "994119404319-jenqmenq7u7fjk4j6nhs6p4d6kiqvnla.apps.googleusercontent.com",
  feedbackFormEndpoint: "https://script.google.com/macros/s/AKfycbzN6sUirhGi5Qk7-sB7dOTuzyC2VJ0a96-_PHgel3SH55BqWu-7baJgFah7LIANqFoC/exec"
};
