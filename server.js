import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Serve React build
app.use(express.static(path.join(__dirname, "my-app", "dist")));

// =========================
// META WEBHOOK VERIFICATION
// =========================
const VERIFY_TOKEN = "EFAR_WEBHOOK_2025";

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// =========================
// RECEIVE WEBHOOK EVENTS
// =========================
app.post("/webhook", (req, res) => {
  console.log("Webhook received:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// React catch-all route (MUST BE LAST)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "my-app", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});