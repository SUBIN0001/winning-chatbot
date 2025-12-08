// n8n.js - Updated to use proxy
export async function sendMessageToN8N(message) {
  // Change from direct n8n URL to proxy URL
  const res = await fetch("https://solutionseekers.app.n8n.cloud/webhook/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  console.log("n8n response:", data);
  return data.reply;   // <-- gets reply field from n8n
}
