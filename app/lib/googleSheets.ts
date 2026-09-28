// lib/googleSheets.ts

export async function updateValues(values: any[][]) {
  const baseUrl = process.env.BASE_URL;

  const res = await fetch(`${baseUrl}/api/sheets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}