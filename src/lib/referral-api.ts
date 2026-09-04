export interface ReferralSubmission {
  yourName: string;
  yourEmail: string;
  services: string[];
  message: string;
}

export async function submitReferral(payload: ReferralSubmission): Promise<void> {
  const response = await fetch("/api/submit-referral", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || `Referral submission failed with status ${response.status}`);
  }
}
