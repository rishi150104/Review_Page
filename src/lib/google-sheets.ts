/**
 * Appends a row to a Google Sheet via a Google Apps Script Web App bound to
 * that sheet — no service account, no GCP project, no Sheets API to enable.
 *
 * Setup:
 * 1. Open the target Google Sheet -> Extensions -> Apps Script.
 * 2. Replace the editor content with the doPost script documented in
 *    GOOGLE_APPS_SCRIPT.md (repo root), then Deploy -> New deployment ->
 *    type "Web app", execute as "Me", who has access "Anyone".
 * 3. Copy the deployment's /exec URL into GOOGLE_APPS_SCRIPT_URL.
 */

/**
 * No-ops (and logs why) when GOOGLE_APPS_SCRIPT_URL isn't configured, so
 * local dev without it still works. `range` is kept in "SheetName!A1" shape
 * for compatibility with existing env vars (GOOGLE_SHEETS_RANGE,
 * GOOGLE_SHEETS_REFERRAL_RANGE) — only the sheet-name part before "!" is
 * used, since Apps Script's appendRow always targets the next empty row.
 */
export async function appendSubmissionRow(
  row: (string | number)[],
  range = process.env["GOOGLE_SHEETS_RANGE"] || "Sheet1!A1",
): Promise<void> {
  const scriptUrl = process.env["GOOGLE_APPS_SCRIPT_URL"];
  if (!scriptUrl) {
    console.warn("Google Sheets logging skipped: GOOGLE_APPS_SCRIPT_URL not configured.");
    return;
  }

  const sheetName = range.split("!")[0];
  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ sheet: sheetName, row }),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Apps Script append failed: ${res.status} ${await res.text()}`);

  const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!data?.ok) throw new Error(`Apps Script append failed: ${data?.error || "unknown error"}`);
}
