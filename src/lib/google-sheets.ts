import { createSign } from "node:crypto";

/**
 * Appends a row to a Google Sheet using a service account, with no SDK
 * dependency: a hand-built JWT (Node's built-in crypto covers RS256 signing)
 * exchanged for an OAuth token, then a plain REST call to the Sheets API.
 *
 * Setup:
 * 1. Google Cloud Console -> create a project -> enable the "Google Sheets API".
 * 2. Create a service account, add a JSON key, and read `client_email` /
 *    `private_key` from it.
 * 3. Share the target Google Sheet with that `client_email` as an Editor.
 * 4. Set env vars: GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY
 *    (paste the JSON key's private_key value as-is, "\n" and all), and
 *    GOOGLE_SHEETS_SPREADSHEET_ID (the id from the sheet's URL).
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

async function getAccessToken(clientEmail: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claims}`;
  const signature = base64url(
    createSign("RSA-SHA256").update(signingInput).sign(privateKey.replace(/\\n/g, "\n")),
  );
  const jwt = `${signingInput}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** No-ops (and logs why) when the Sheets env vars aren't configured, so local dev without them still works. */
export async function appendSubmissionRow(row: (string | number)[]): Promise<void> {
  const clientEmail = process.env["GOOGLE_SHEETS_CLIENT_EMAIL"];
  const privateKey = process.env["GOOGLE_SHEETS_PRIVATE_KEY"];
  const spreadsheetId = process.env["GOOGLE_SHEETS_SPREADSHEET_ID"];
  const range = process.env["GOOGLE_SHEETS_RANGE"] || "Sheet1!A1";

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.warn("Google Sheets logging skipped: env vars not configured.");
    return;
  }

  const accessToken = await getAccessToken(clientEmail, privateKey);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) throw new Error(`Sheets append failed: ${res.status} ${await res.text()}`);
}
