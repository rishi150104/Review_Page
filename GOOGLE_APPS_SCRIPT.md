# Google Sheets logging via Apps Script

The app logs review + referral submissions to Google Sheets through a small
Apps Script Web App bound to the target spreadsheet — no GCP project, no
service account, no Sheets API to enable.

## 1. Add the script to your Sheet

1. Open the Google Sheet you want submissions logged to.
2. **Extensions → Apps Script**.
3. Delete whatever's in the editor and paste this:

```js
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(data.sheet);
    if (!sheet) sheet = ss.insertSheet(data.sheet);
    sheet.appendRow(data.row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (or Ctrl+S).

## 2. Deploy it as a Web App

1. **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → **Web app**.
3. Description: anything (e.g. "submissions logger").
4. **Execute as: Me**. **Who has access: Anyone**.
5. Click **Deploy**, then **Authorize access** and approve the permissions
   prompt with your own Google account (this is expected — it's your own
   script asking to edit your own sheet).
6. Copy the **Web app URL** — it ends in `/exec`.

## 3. Set the env var

Set `GOOGLE_APPS_SCRIPT_URL` to that `/exec` URL:
- Locally: add it to `.env`.
- Vercel: Project → Settings → Environment Variables (Production, and
  Preview if you want logging on preview deploys too) → redeploy.

The old `GOOGLE_SHEETS_CLIENT_EMAIL` / `GOOGLE_SHEETS_PRIVATE_KEY` /
`GOOGLE_SHEETS_SPREADSHEET_ID` vars are no longer used and can be removed.
`GOOGLE_SHEETS_RANGE` (default `Sheet1!A1`, used by review submissions) and
`GOOGLE_SHEETS_REFERRAL_RANGE` (default `Referrals!A1`, used by referral
submissions) still work the same way — only the sheet-name part before `!`
is actually used; the script creates that tab automatically the first time
a row is appended to it if it doesn't already exist.

## Redeploying after script edits

Apps Script Web App URLs are versioned: editing the script code and hitting
Save does **not** update what the live `/exec` URL runs. To ship a script
change, go to **Deploy → Manage deployments → edit (pencil icon) → Version:
New version → Deploy**. The URL stays the same either way.
