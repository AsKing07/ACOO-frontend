import { PLAUSIBLE_API_KEY, SITE_ID, PLAUSIBLE_API_URL } from "../config.js"

// Check if the API key is present and throw a clear error if not
if (!PLAUSIBLE_API_KEY || PLAUSIBLE_API_KEY === "YOUR_PLAUSIBLE_API_KEY") {
    throw new Error("Missing or invalid Plausible API key. Please set PLAUSIBLE_API_KEY in config.js.");
}

console.log("Plausible API KEY:", PLAUSIBLE_API_KEY);


export async function getPlausibleStats() {
    const url = `${PLAUSIBLE_API_URL}/aggregate?site_id=${SITE_ID}&metrics=visits,pageviews,visitors`;
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${PLAUSIBLE_API_KEY}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des stats Plausible");
    return res.json();
}

export async function getPlausibleTopPages() {
    const url = `${PLAUSIBLE_API_URL}/breakdown?site_id=${SITE_ID}&property=event:page&metrics=pageviews&limit=5`;
    const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${PLAUSIBLE_API_KEY}`,
            "Content-Type": "application/json"
         }
    });
    if (!res.ok) throw new Error("Erreur top pages Plausible");
    return res.json();
}