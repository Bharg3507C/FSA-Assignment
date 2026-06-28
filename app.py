"""
EFAR WhatsApp Bot — Flask Webhook Server
Handles leave requests via WhatsApp Cloud API with Meta templates.
"""
import os
import json
import logging
import hmac
import hashlib
from datetime import datetime
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── Config from .env ────────────────────────────────────────────────────────
VERIFY_TOKEN        = os.environ.get("VERIFY_TOKEN", "EFAR_WEBHOOK_2025")
PHONE_NUMBER_ID     = os.environ.get("PHONE_NUMBER_ID", "1174469149077170")
ACCESS_TOKEN        = os.environ.get("ACCESS_TOKEN", "")
APP_SECRET          = os.environ.get("APP_SECRET", "")
WHATSAPP_API_URL    = f"https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages"

# ── In-memory session store (replace with DB in production) ─────────────────
# sessions[phone] = { step, name, role, date, ambulance, type, ref_id }
sessions = {}

# ── Pending approvals store ─────────────────────────────────────────────────
# pending_approvals[ref_id] = { phone, name, role, date, ambulance, type, status }
pending_approvals = {}

ROLES      = ["driver", "paramedic", "emt"]
LEAVE_TYPES = ["annual leave", "medical leave", "mc", "emergency leave", "unpaid leave"]


def generate_ref_id():
    """Generate a unique reference ID for the leave request."""
    ts = datetime.now().strftime("%Y%m%d%H%M%S")
    return f"LR-{ts}"


def send_message(to, body):
    """Send a plain text WhatsApp message."""
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": body},
    }
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    resp = requests.post(WHATSAPP_API_URL, json=payload, headers=headers, timeout=10)
    logger.info("send_message to %s → %s", to, resp.status_code)
    return resp


def send_template(to, template_name, components):
    """Send a Meta-approved template message."""
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {"code": "en"},
            "components": components,
        },
    }
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    resp = requests.post(WHATSAPP_API_URL, json=payload, headers=headers, timeout=10)
    logger.info("send_template %s to %s → %s", template_name, to, resp.status_code)
    return resp


def send_leave_request_confirmation(to, name, role, date, ambulance, leave_type, ref_id):
    """Send leave_request_confirmation template."""
    components = [
        {
            "type": "body",
            "parameters": [
                {"type": "text", "text": name},
                {"type": "text", "text": role},
                {"type": "text", "text": date},
                {"type": "text", "text": ambulance},
                {"type": "text", "text": leave_type},
                {"type": "text", "text": ref_id},
            ],
        }
    ]
    return send_template(to, "leave_request_confirmation", components)


def send_leave_approved(to, name, date, ambulance, leave_type):
    """Send leave_approved template."""
    components = [
        {
            "type": "body",
            "parameters": [
                {"type": "text", "text": name},
                {"type": "text", "text": date},
                {"type": "text", "text": ambulance},
                {"type": "text", "text": leave_type},
            ],
        }
    ]
    return send_template(to, "leave_approved", components)


def send_shift_approved(to, name, date, ambulance, role, pay):
    """Send shift_approved template."""
    components = [
        {
            "type": "body",
            "parameters": [
                {"type": "text", "text": name},
                {"type": "text", "text": date},
                {"type": "text", "text": ambulance},
                {"type": "text", "text": role},
                {"type": "text", "text": pay},
            ],
        }
    ]
    return send_template(to, "shift_approved", components)


# ── Validation helpers ───────────────────────────────────────────────────────

def validate_name(text):
    """Return cleaned name or None."""
    cleaned = text.strip()
    if len(cleaned) < 2 or not any(c.isalpha() for c in cleaned):
        return None
    return cleaned


def validate_role(text):
    """Return normalised role or None."""
    lower = text.strip().lower()
    for role in ROLES:
        if role in lower:
            return text.strip().title()
    return None


def validate_date(text):
    """Return date string if it looks valid."""
    cleaned = text.strip()
    if len(cleaned) < 5 or not any(c.isdigit() for c in cleaned):
        return None
    return cleaned


def validate_ambulance(text):
    """Return ambulance ID or None."""
    cleaned = text.strip().upper()
    if "AMB" not in cleaned and not any(c.isdigit() for c in cleaned):
        return None
    return cleaned


def validate_leave_type(text):
    """Return leave type or None."""
    lower = text.strip().lower()
    for lt in LEAVE_TYPES:
        if lt in lower:
            return text.strip().title()
    return None


# ── Conversation flow ────────────────────────────────────────────────────────

def handle_message(phone, body):
    """Route the incoming message based on current session step."""
    body = (body or "").strip()
    lower = body.lower()
    session = sessions.get(phone, {})
    step = session.get("step", "idle")

    # ── Trigger keywords ──
    if step == "idle":
        if any(kw in lower for kw in ["leave", "apply", "mc", "medical", "off"]):
            sessions[phone] = {"step": "ask_name"}
            send_message(phone,
                "👋 Hello! Welcome to *EFAR Leave Management*.\n\n"
                "I'll help you submit your leave request. Let's get started!\n\n"
                "*Please enter your Full Name:*\n"
                "_Example: Sarah Lim_"
            )
        else:
            send_message(phone,
                "👋 Hi! I'm the *EFAR Operations Bot*.\n\n"
                "How can I help you today?\n\n"
                "• Type *leave* to apply for leave\n"
                "• Type *shift* for shift-related queries\n"
                "• Type *help* for assistance"
            )
        return

    # ── Step: ask name ──
    if step == "ask_name":
        name = validate_name(body)
        if not name:
            send_message(phone,
                "❌ *Invalid name.*\n\n"
                "Please enter your *Full Name* (at least 2 characters).\n"
                "_Example: Sarah Lim_"
            )
            return
        sessions[phone] = {"step": "ask_role", "name": name}
        send_message(phone,
            f"✅ Got it, *{name}*!\n\n"
            "*Please enter your Role:*\n\n"
            "• Driver\n"
            "• Paramedic\n"
            "• EMT"
        )
        return

    # ── Step: ask role ──
    if step == "ask_role":
        role = validate_role(body)
        if not role:
            send_message(phone,
                "❌ *Invalid role.*\n\n"
                "*Please enter your Role:*\n\n"
                "• Driver\n"
                "• Paramedic\n"
                "• EMT"
            )
            return
        session["role"] = role
        session["step"] = "ask_date"
        sessions[phone] = session
        send_message(phone,
            f"✅ Role: *{role}*\n\n"
            "*Please enter the Leave Date(s):*\n\n"
            "_Example: 10 Jun 2025_ or _10–12 Jun 2025_"
        )
        return

    # ── Step: ask date ──
    if step == "ask_date":
        date = validate_date(body)
        if not date:
            send_message(phone,
                "❌ *Invalid date.*\n\n"
                "*Please enter your Leave Date(s):*\n"
                "_Example: 10 Jun 2025_ or _10–12 Jun 2025_"
            )
            return
        session["date"] = date
        session["step"] = "ask_ambulance"
        sessions[phone] = session
        send_message(phone,
            f"✅ Date(s): *{date}*\n\n"
            "*Please enter your Ambulance ID:*\n\n"
            "_Example: AMB-01_"
        )
        return

    # ── Step: ask ambulance ──
    if step == "ask_ambulance":
        ambulance = validate_ambulance(body)
        if not ambulance:
            send_message(phone,
                "❌ *Invalid ambulance ID.*\n\n"
                "*Please enter your Ambulance ID:*\n"
                "_Example: AMB-01_"
            )
            return
        session["ambulance"] = ambulance
        session["step"] = "ask_type"
        sessions[phone] = session
        send_message(phone,
            f"✅ Ambulance: *{ambulance}*\n\n"
            "*Please enter the Leave Type:*\n\n"
            "• Medical Leave (MC)\n"
            "• Annual Leave\n"
            "• Emergency Leave\n"
            "• Unpaid Leave"
        )
        return

    # ── Step: ask leave type ──
    if step == "ask_type":
        leave_type = validate_leave_type(body)
        if not leave_type:
            send_message(phone,
                "❌ *Invalid leave type.*\n\n"
                "*Please enter the Leave Type:*\n\n"
                "• Medical Leave (MC)\n"
                "• Annual Leave\n"
                "• Emergency Leave\n"
                "• Unpaid Leave"
            )
            return
        session["type"] = leave_type
        session["step"] = "ask_mc"
        sessions[phone] = session

        mc_required = "mc" in leave_type.lower() or "medical" in leave_type.lower()
        if mc_required:
            send_message(phone,
                f"✅ Leave Type: *{leave_type}*\n\n"
                "⚠️ *Medical Certificate (MC) is required for this leave type.*\n\n"
                "Please *upload a photo of your MC* now.\n\n"
                "_Without an MC, your application cannot be processed._"
            )
        else:
            send_message(phone,
                f"✅ Leave Type: *{leave_type}*\n\n"
                "Please upload any *supporting document* (optional), "
                "or type *skip* to proceed without one."
            )
        return

    # ── Step: ask MC ──
    if step == "ask_mc":
        leave_type = session.get("type", "")
        mc_required = "mc" in leave_type.lower() or "medical" in leave_type.lower()

        # Check if they sent a media message or typed "skip"
        has_media = session.get("has_media", False)
        skipped   = lower == "skip"

        if mc_required and not has_media:
            send_message(phone,
                "❌ *MC is required for Medical Leave.*\n\n"
                "Please *upload a photo of your MC* to proceed.\n\n"
                "_Your application cannot be submitted without an MC._"
            )
            return

        # Generate reference ID and save to pending approvals
        ref_id = generate_ref_id()
        session["ref_id"] = ref_id
        session["step"]   = "submitted"
        sessions[phone]   = session

        pending_approvals[ref_id] = {
            "phone":     phone,
            "name":      session.get("name"),
            "role":      session.get("role"),
            "date":      session.get("date"),
            "ambulance": session.get("ambulance"),
            "type":      session.get("type"),
            "status":    "pending",
            "submitted": datetime.now().isoformat(),
        }

        # Send template confirmation
        send_leave_request_confirmation(
            phone,
            session["name"],
            session["role"],
            session["date"],
            session["ambulance"],
            session["type"],
            ref_id,
        )

        send_message(phone,
            f"📋 *Leave Request Submitted!*\n\n"
            f"Your reference ID is: *{ref_id}*\n\n"
            "Your application has been sent to the *Operations Director* for approval.\n"
            "You will receive a WhatsApp notification once it has been reviewed.\n\n"
            "_Please keep your MC ready if requested._"
        )
        return

    # ── Already submitted ──
    if step == "submitted":
        send_message(phone,
            "✅ Your leave request has already been submitted.\n\n"
            f"Reference ID: *{sessions[phone].get('ref_id', 'N/A')}*\n\n"
            "You will be notified once the Operations Director reviews it.\n"
            "Type *leave* to start a new request."
        )
        sessions[phone]["step"] = "idle"
        return


def handle_media(phone, media_type):
    """Handle incoming media (MC upload)."""
    session = sessions.get(phone, {})
    if session.get("step") == "ask_mc":
        session["has_media"] = True
        sessions[phone] = session
        send_message(phone,
            "✅ *MC received!*\n\n"
            "Type *confirm* to submit your leave request, or type *cancel* to start over."
        )
        sessions[phone]["step"] = "confirm_submit"
    else:
        send_message(phone, "📎 Document received. How can I help you?")


def handle_confirm_submit(phone, body):
    """Handle final confirmation step after MC upload."""
    session = sessions.get(phone, {})
    lower = body.strip().lower()

    if lower == "confirm":
        ref_id = generate_ref_id()
        session["ref_id"] = ref_id
        session["step"]   = "submitted"
        sessions[phone]   = session

        pending_approvals[ref_id] = {
            "phone":     phone,
            "name":      session.get("name"),
            "role":      session.get("role"),
            "date":      session.get("date"),
            "ambulance": session.get("ambulance"),
            "type":      session.get("type"),
            "status":    "pending",
            "submitted": datetime.now().isoformat(),
        }

        send_leave_request_confirmation(
            phone,
            session["name"],
            session["role"],
            session["date"],
            session["ambulance"],
            session["type"],
            ref_id,
        )

        send_message(phone,
            f"📋 *Leave Request Submitted!*\n\n"
            f"Reference ID: *{ref_id}*\n\n"
            "Sent to the *Operations Director* for approval.\n"
            "You will be notified once reviewed."
        )

    elif lower == "cancel":
        sessions[phone] = {"step": "idle"}
        send_message(phone,
            "❌ Request cancelled.\n\nType *leave* to start a new application."
        )
    else:
        send_message(phone,
            "Please type *confirm* to submit or *cancel* to start over."
        )


# ── Webhook endpoints ────────────────────────────────────────────────────────

@app.route("/webhook", methods=["GET"])
def verify_webhook():
    """Meta webhook verification handshake."""
    mode      = request.args.get("hub.mode")
    token     = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")

    if mode == "subscribe" and token == VERIFY_TOKEN:
        logger.info("Webhook verified successfully.")
        return challenge, 200

    logger.warning("Webhook verification failed.")
    return "Forbidden", 403


@app.route("/webhook", methods=["POST"])
def receive_message():
    """Handle incoming WhatsApp messages."""
    # Verify signature if APP_SECRET is set
    if APP_SECRET:
        sig = request.headers.get("X-Hub-Signature-256", "")
        expected = "sha256=" + hmac.new(
            APP_SECRET.encode(), request.data, hashlib.sha256
        ).hexdigest()
        if not hmac.compare_digest(sig, expected):
            return "Forbidden", 403

    data = request.get_json(silent=True) or {}

    try:
        entry   = data["entry"][0]
        changes = entry["changes"][0]["value"]
        messages = changes.get("messages", [])

        for msg in messages:
            phone = msg["from"]
            msg_type = msg.get("type")

            if msg_type == "text":
                body = msg["text"]["body"]
                step = sessions.get(phone, {}).get("step", "idle")
                if step == "confirm_submit":
                    handle_confirm_submit(phone, body)
                else:
                    handle_message(phone, body)

            elif msg_type in ("image", "document"):
                handle_media(phone, msg_type)

    except (KeyError, IndexError, TypeError) as exc:
        logger.error("Error parsing webhook payload: %s", exc)

    return jsonify({"status": "ok"}), 200


# ── Dashboard API endpoints ──────────────────────────────────────────────────

@app.route("/api/pending-approvals", methods=["GET"])
def get_pending_approvals():
    """Return all pending leave approvals for the dashboard."""
    pending = {
        ref: data for ref, data in pending_approvals.items()
        if data["status"] == "pending"
    }
    return jsonify(pending), 200


@app.route("/api/all-approvals", methods=["GET"])
def get_all_approvals():
    """Return all leave requests regardless of status."""
    return jsonify(pending_approvals), 200


@app.route("/api/approve/<ref_id>", methods=["POST"])
def approve_leave(ref_id):
    """Approve a leave request and send WhatsApp notification to staff."""
    if ref_id not in pending_approvals:
        return jsonify({"error": "Reference ID not found"}), 404

    record = pending_approvals[ref_id]
    if record["status"] != "pending":
        return jsonify({"error": f"Request is already {record['status']}"}), 400

    record["status"]    = "approved"
    record["approved_at"] = datetime.now().isoformat()
    pending_approvals[ref_id] = record

    # Send leave_approved template to staff member
    send_leave_approved(
        record["phone"],
        record["name"],
        record["date"],
        record["ambulance"],
        record["type"],
    )

    # Send a warm get-well message
    send_message(
        record["phone"],
        f"🎉 *Congratulations, {record['name']}!*\n\n"
        f"Your *{record['type']}* from *{record['date']}* has been *approved* ✅\n\n"
        "We hope you have a restful recovery. Get well soon! 🙏\n\n"
        "_Please ensure your duties are covered. Contact your supervisor if needed._\n\n"
        f"Reference ID: *{ref_id}*"
    )

    return jsonify({"message": f"Leave {ref_id} approved and staff notified."}), 200


@app.route("/api/reject/<ref_id>", methods=["POST"])
def reject_leave(ref_id):
    """Reject a leave request and notify the staff member."""
    if ref_id not in pending_approvals:
        return jsonify({"error": "Reference ID not found"}), 404

    record = pending_approvals[ref_id]
    if record["status"] != "pending":
        return jsonify({"error": f"Request is already {record['status']}"}), 400

    body_data  = request.get_json(silent=True) or {}
    reason     = body_data.get("reason", "No reason provided.")

    record["status"]     = "rejected"
    record["rejected_at"] = datetime.now().isoformat()
    record["reason"]     = reason
    pending_approvals[ref_id] = record

    # Reset session so staff can reapply
    phone = record["phone"]
    sessions[phone] = {"step": "idle"}

    send_message(
        phone,
        f"❌ *Leave Request Update, {record['name']}*\n\n"
        f"Unfortunately your *{record['type']}* request for *{record['date']}* "
        f"has been *rejected*.\n\n"
        f"*Reason:* {reason}\n\n"
        "Please contact your Operations Director for clarification.\n"
        "Type *leave* to submit a new request.\n\n"
        f"Reference ID: *{ref_id}*"
    )

    return jsonify({"message": f"Leave {ref_id} rejected and staff notified."}), 200


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "service": "EFAR WhatsApp Bot"}), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)