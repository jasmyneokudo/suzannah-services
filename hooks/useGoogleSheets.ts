"use client";

export function useGoogleSheets() {
  const updateValues = async (values: any[][]) => {
    try {
      const res = await fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });
      const data = await res.json();
      return data;
    } finally {
      // setLoading(false);
    }
  };

  return { updateValues };
}
