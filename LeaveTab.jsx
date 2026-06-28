/* ── Leave Management Tab (paste this into App.jsx replacing LeaveTab) ── */

const BOT_API = "https://efar-bot.onrender.com"; // change to your Render URL

function LeaveTab() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BOT_API}/api/pending-approvals`);
      const data = await res.json();
      const list = Object.entries(data).map(([ref_id, v]) => ({ ref_id, ...v }));
      setApprovals(list);
    } catch {
      setApprovals([]);
    }
    setLoading(false);
  };

  const approve = async (ref_id) => {
    const res = await fetch(`${BOT_API}/api/approve/${ref_id}`, { method: "POST" });
    const data = await res.json();
    setActionMsg(data.message || data.error);
    fetchApprovals();
  };

  const reject = async (ref_id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    const res = await fetch(`${BOT_API}/api/reject/${ref_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    setActionMsg(data.message || data.error);
    fetchApprovals();
  };

  useState(() => { fetchApprovals(); }, []);

  return (
    <>
      {/* Info banner */}
      <div style={{ background:G.hero,border:`1px solid ${C.border}`,borderRadius:14,padding:"22px 28px",marginBottom:20,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.teal }} />
        <div style={{ display:"flex",alignItems:"center",gap:14 }}>
          <div style={{ width:46,height:46,borderRadius:12,background:`${C.teal}20`,border:`1px solid ${C.teal}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>💬</div>
          <div>
            <div style={{ fontSize:15,fontWeight:700,color:C.white,marginBottom:3 }}>Leave Management — WhatsApp Bot</div>
            <div style={{ fontSize:12.5,color:C.muted,lineHeight:1.6 }}>
              Staff apply for leave via WhatsApp. Requests appear here for the Operations Director to approve or reject. Staff are notified instantly via WhatsApp.
            </div>
          </div>
        </div>
      </div>

      {/* Action message */}
      {actionMsg && (
        <div style={{ background:`${C.teal}18`,border:`1px solid ${C.teal}40`,borderRadius:10,padding:"12px 16px",marginBottom:16,fontSize:13,color:C.teal,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <span>✅ {actionMsg}</span>
          <button onClick={()=>setActionMsg("")} style={{ background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:16 }}>×</button>
        </div>
      )}

      {/* How it works */}
      <SCard title="📌 How It Works" g={G.teal} style={{ marginBottom:20 }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12 }}>
          {[
            { step:"1",label:"Staff texts bot",desc:'Staff sends "leave" on WhatsApp to start the flow.',col:C.teal },
            { step:"2",label:"Bot collects details",desc:"Bot asks for name, role, date, ambulance, type, and MC.",col:C.blue },
            { step:"3",label:"Appears here",desc:"Request shows up in this dashboard pending your approval.",col:C.orange },
            { step:"4",label:"Staff notified",desc:"Approve or reject here — staff gets an instant WhatsApp message.",col:C.green },
          ].map(s=>(
            <div key={s.step} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}`,textAlign:"center" }}>
              <div style={{ width:30,height:30,borderRadius:"50%",background:`${s.col}20`,border:`1px solid ${s.col}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:s.col,margin:"0 auto 10px" }}>{s.step}</div>
              <div style={{ fontSize:12.5,fontWeight:700,color:C.white,marginBottom:3 }}>{s.label}</div>
              <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </SCard>

      {/* Pending approvals table */}
      <SCard
        title="📋 Pending Leave Requests"
        sub="Requests submitted via WhatsApp awaiting your approval"
        g={G.pink}
      >
        <div style={{ display:"flex",justifyContent:"flex-end",marginBottom:14 }}>
          <button onClick={fetchApprovals} style={{ padding:"7px 18px",borderRadius:8,backgroundImage:G.pink,color:"#fff",fontWeight:600,fontSize:12,border:"none",cursor:"pointer" }}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign:"center",padding:"32px",color:C.muted,fontSize:13 }}>Loading requests...</div>
        ) : approvals.length === 0 ? (
          <div style={{ textAlign:"center",padding:"40px",color:C.muted }}>
            <div style={{ fontSize:36,marginBottom:12,opacity:0.3 }}>📭</div>
            <div style={{ fontSize:14,fontWeight:600,color:C.white,marginBottom:6 }}>No Pending Requests</div>
            <div style={{ fontSize:12.5 }}>All caught up! New requests will appear here automatically.</div>
          </div>
        ) : (
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
            <thead>
              <tr>
                {["Ref ID","Name","Role","Date","Ambulance","Type","Submitted","Actions"].map(h=>(
                  <th key={h} style={TH}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approvals.map(r=>(
                <tr key={r.ref_id}>
                  <td style={{ ...TD,fontWeight:700,fontSize:11,color:C.muted }}>{r.ref_id}</td>
                  <td style={{ ...TD,fontWeight:600,color:C.white }}>{r.name}</td>
                  <td style={TD}><span style={{ padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:600,color:C.blue,background:`${C.blue}20`,border:`1px solid ${C.blue}40` }}>{r.role}</span></td>
                  <td style={TD}>{r.date}</td>
                  <td style={TD}>{r.ambulance}</td>
                  <td style={TD}><span style={{ padding:"2px 9px",borderRadius:12,fontSize:11,fontWeight:600,color:C.teal,background:`${C.teal}20`,border:`1px solid ${C.teal}40` }}>{r.type}</span></td>
                  <td style={{ ...TD,fontSize:11,color:C.muted }}>{new Date(r.submitted).toLocaleString("en-SG",{dateStyle:"short",timeStyle:"short"})}</td>
                  <td style={TD}>
                    <div style={{ display:"flex",gap:8 }}>
                      <button onClick={()=>approve(r.ref_id)} style={{ padding:"5px 14px",borderRadius:7,background:`${C.green}20`,border:`1px solid ${C.green}50`,color:C.green,fontSize:12,fontWeight:600,cursor:"pointer" }}>
                        ✓ Approve
                      </button>
                      <button onClick={()=>reject(r.ref_id)} style={{ padding:"5px 14px",borderRadius:7,background:`${C.red}20`,border:`1px solid ${C.red}50`,color:C.red,fontSize:12,fontWeight:600,cursor:"pointer" }}>
                        ✕ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SCard>
    </>
  );
}