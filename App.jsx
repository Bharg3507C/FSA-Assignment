import { useState } from "react";

const C = {
  bg:       "#0f1c2e",
  sidebar:  "#0a1628",
  card:     "#132237",
  cardDeep: "#0d1b2e",
  border:   "#1e3a5a",
  pink:     "#ec4899",
  purple2:  "#c084fc",
  teal:     "#00c9a7",
  green:    "#22c55e",
  orange:   "#f97316",
  red:      "#ef4444",
  blue:     "#3b82f6",
  yellow:   "#f59e0b",
  text:     "#e2e8f0",
  sub:      "#94a3b8",
  muted:    "#4a6a8a",
  white:    "#ffffff",
};

const G = {
  pink:     "linear-gradient(90deg,#ec4899,#a855f7)",
  pinkSoft: "linear-gradient(90deg,#f472b6,#c084fc)",
  teal:     "linear-gradient(90deg,#00c9a7,#22c55e)",
  blue:     "linear-gradient(90deg,#3b82f6,#a855f7)",
  orange:   "linear-gradient(90deg,#f97316,#ef4444)",
  hero:     "linear-gradient(135deg,#0f1c2e 0%,#162b45 50%,#0f1c2e 100%)",
};

/* ── tiny helpers ── */
function GTop({ g }) {
  return <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:g,borderRadius:"12px 12px 0 0" }} />;
}
function Card({ g=G.pink, style={}, children }) {
  return (
    <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:12,position:"relative",overflow:"hidden",...style }}>
      <GTop g={g} />
      {children}
    </div>
  );
}
function SCard({ title, sub, g=G.pink, children }) {
  return (
    <Card g={g} style={{ padding:"22px 24px",marginBottom:20 }}>
      {title && <div style={{ fontSize:15,fontWeight:700,color:C.white,marginBottom:sub?4:14,textAlign:"left" }}>{title}</div>}
      {sub   && <div style={{ fontSize:12,color:C.muted,marginBottom:16,textAlign:"left" }}>{sub}</div>}
      {children}
    </Card>
  );
}
function Badge({ label, color }) {
  return <span style={{ display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,color,background:`${color}20`,border:`1px solid ${color}40` }}>{label}</span>;
}
const TH = { color:C.muted,fontWeight:500,fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",padding:"8px 14px",textAlign:"left",borderBottom:`1px solid ${C.border}` };
const TD = { padding:"12px 14px",borderBottom:`1px solid ${C.border}18`,color:C.text,fontSize:13 };

/* ════════════════════════════════════════
   PUBLIC SITE PAGES (Home / About / Contact)
   ════════════════════════════════════════ */
function Hero() {
  return (
    <div style={{ background:G.hero,border:`1px solid ${C.border}`,borderRadius:16,padding:"52px 48px",marginBottom:24,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.pink }} />
      <div style={{ position:"absolute",right:48,top:"50%",transform:"translateY(-50%)",fontSize:120,opacity:0.03,userSelect:"none",pointerEvents:"none" }}>🚑</div>
      <div style={{ position:"absolute",top:-80,right:-80,width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,#ec489912 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ fontSize:11,color:C.pink,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:14 }}>Singapore's Leading Emergency Medical Services Provider</div>
      <div style={{ fontSize:38,fontWeight:800,color:C.white,lineHeight:1.15,marginBottom:14 }}>
        Your Trusted Partner in<br /><span style={{ color:C.pink }}>Emergency Response</span> &amp; First Aid.
      </div>
      <div style={{ fontSize:14,color:C.sub,maxWidth:580,lineHeight:1.8,marginBottom:28 }}>
        Emergencies First Aid &amp; Rescue (EFAR) is a private ambulance and first aid training company
        registered with the Ministry of Health Singapore. We provide 24/7 emergency and non-emergency
        ambulance services, event medical coverage, and WSQ-accredited first aid training island-wide.
      </div>
      <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:28 }}>
        <a href="https://wa.me/12013899402" target="_blank" rel="noreferrer"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 24px",borderRadius:10,backgroundImage:G.pink,color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none" }}>
          🚑 Call Us: +65 6297 8000
        </a>
        <span style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 24px",borderRadius:10,color:C.teal,fontWeight:600,fontSize:14,border:`1px solid ${C.teal}50` }}>
          📧 admin@emergencies.com.sg
        </span>
      </div>
      <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
        {[["MOH Licensed",C.pink],["WSQ Accredited",C.purple2],["24/7 Operations",C.teal],["Island-Wide Coverage",C.yellow],["BCLS & AED Certified",C.blue]].map(([l,col])=>(
          <span key={l} style={{ padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,color:col,background:`${col}16`,border:`1px solid ${col}40` }}>{l}</span>
        ))}
      </div>
    </div>
  );
}
function StatsBar() {
  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:20 }}>
      {[["24/7","Emergency ambulance availability"],["2010","Year established"],["1000+","Events covered annually"],["WSQ","Accredited training provider"]].map(([n,l])=>(
        <Card key={l} g={G.pink} style={{ padding:"18px 20px" }}>
          <div style={{ fontSize:26,fontWeight:800,color:C.pink,marginBottom:4 }}>{n}</div>
          <div style={{ fontSize:12,color:C.muted,lineHeight:1.5 }}>{l}</div>
        </Card>
      ))}
    </div>
  );
}
function ServicesGrid() {
  const list = [
    { icon:"🚑",title:"Private Ambulance Services",desc:"MOH-licensed 24/7 emergency and non-emergency ambulance services with AED-equipped fleet.",col:C.pink },
    { icon:"🏥",title:"Event Medical Services",desc:"On-site medical standby for marathons, concerts, corporate events and mass gatherings.",col:C.purple2 },
    { icon:"🎓",title:"First Aid Training",desc:"WSQ-accredited BCLS+AED, Standard First Aid, and occupational first aid courses.",col:C.teal },
    { icon:"🩺",title:"Medical Escort Services",desc:"Safe transport with trained medical personnel between hospitals, clinics, or home care.",col:C.blue },
    { icon:"🏢",title:"Corporate Medical Retainer",desc:"Dedicated first aid officers and AED management for workplaces and industrial sites.",col:C.orange },
    { icon:"📋",title:"CPR & AED Courses",desc:"Practical CPR and AED certification recognised under Singapore's Heart Safe Community.",col:C.red },
  ];
  return (
    <SCard title="Our Services" sub="Comprehensive emergency medical services and first aid training across Singapore" g={G.pinkSoft}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
        {list.map(s=>(
          <div key={s.title} style={{ background:C.cardDeep,borderRadius:10,padding:"16px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${s.col}` }}>
            <div style={{ fontSize:24,marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:12.5,fontWeight:700,color:C.white,marginBottom:4 }}>{s.title}</div>
            <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.55 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </SCard>
  );
}
function WhyUs() {
  return (
    <SCard title="Why Choose EFAR?" sub="Trusted by hospitals, corporations, event organisers, and individuals across Singapore" g={G.blue}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
        {[
          { icon:"✅",title:"MOH-Licensed Ambulance Operator",desc:"Fully licensed by MOH Singapore to operate private ambulances and provide pre-hospital emergency care." },
          { icon:"🎓",title:"WSQ-Accredited Training Provider",desc:"First aid and CPR courses accredited under Singapore's Workforce Skills Qualifications framework." },
          { icon:"⏱️",title:"Fast Response Times",desc:"Strategically located fleet for swift island-wide deployment, 24/7, 365 days a year." },
          { icon:"👩‍⚕️",title:"Trained Medical Professionals",desc:"Qualified EMTs, paramedics, nurses, and first aid instructors with extensive field experience." },
          { icon:"🏆",title:"Experienced Event Partner",desc:"Over a decade providing medical coverage for major sporting events, concerts, and functions." },
          { icon:"📞",title:"24/7 Hotline Support",desc:"Reach us any time via WhatsApp. Our team is always ready to assist with bookings and dispatch." },
        ].map(w=>(
          <div key={w.title} style={{ display:"flex",gap:12,background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:20,flexShrink:0,marginTop:2 }}>{w.icon}</div>
            <div>
              <div style={{ fontSize:12.5,fontWeight:700,color:C.white,marginBottom:3 }}>{w.title}</div>
              <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.55 }}>{w.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </SCard>
  );
}
function CtaStrip() {
  return (
    <div style={{ background:G.hero,border:`1px solid ${C.border}`,borderRadius:14,padding:"26px 36px",marginBottom:20,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.pink }} />
      <div>
        <div style={{ fontSize:17,fontWeight:800,color:C.white,marginBottom:4 }}>Need an ambulance or medical standby?</div>
        <div style={{ fontSize:12.5,color:C.muted }}>Available 24 hours, 7 days a week — including public holidays.</div>
      </div>
      <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
        <a href="https://wa.me/12013899402" target="_blank" rel="noreferrer"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",borderRadius:10,backgroundImage:G.pink,color:"#fff",fontWeight:700,fontSize:13,textDecoration:"none" }}>
          📞 +65 6297 8000
        </a>
        <a href="mailto:admin@emergencies.com.sg"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",borderRadius:10,color:C.teal,fontWeight:600,fontSize:13,border:`1px solid ${C.teal}50`,textDecoration:"none" }}>
          ✉️ Email Us
        </a>
      </div>
    </div>
  );
}
function AboutPage() {
  return (
    <>
      <div style={{ background:G.hero,border:`1px solid ${C.border}`,borderRadius:16,padding:"44px 48px",marginBottom:20,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.pinkSoft }} />
        <div style={{ position:"absolute",right:48,top:"50%",transform:"translateY(-50%)",fontSize:100,opacity:0.03,userSelect:"none" }}>🏥</div>
        <div style={{ fontSize:11,color:C.purple2,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:12 }}>Who We Are</div>
        <div style={{ fontSize:32,fontWeight:800,color:C.white,lineHeight:1.2,marginBottom:12 }}>Built on <span style={{ color:C.pink }}>Trust.</span><br />Driven by Purpose.</div>
        <div style={{ fontSize:13.5,color:C.sub,maxWidth:520,lineHeight:1.8,marginBottom:22 }}>
          Founded in Singapore, Emergencies First Aid &amp; Rescue is a healthcare and training service provider
          committed to saving lives through rapid response, expert training, and operational excellence.
        </div>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          {[["Est. 2010",C.pink],["MOH Licensed",C.teal],["50+ Staff",C.purple2],["24/7 Operations",C.orange]].map(([l,col])=>(
            <span key={l} style={{ padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,color:col,background:`${col}16`,border:`1px solid ${col}40` }}>{l}</span>
          ))}
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20 }}>
        <SCard title="🎯 Our Mission" g={G.pink}>
          <p style={{ fontSize:13,color:C.sub,lineHeight:1.8,margin:0 }}>
            To provide rapid, reliable, and compassionate emergency medical services to the people of Singapore —
            ensuring every individual receives timely care when it matters most.
          </p>
        </SCard>
        <SCard title="🔭 Our Vision" g={G.pinkSoft}>
          <p style={{ fontSize:13,color:C.sub,lineHeight:1.8,margin:0 }}>
            To become Singapore's most trusted emergency services provider — innovating through technology and
            setting the gold standard for pre-hospital care and first aid training excellence.
          </p>
        </SCard>
      </div>
      <SCard title="🤝 Our Core Values" g={G.pink}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
          {[
            { icon:"⚡",title:"Speed",desc:"Every second counts. We optimise for the fastest possible response.",col:C.teal },
            { icon:"🎓",title:"Excellence",desc:"MOH-accredited training and certified paramedics at every level.",col:C.pink },
            { icon:"❤️",title:"Compassion",desc:"We treat every patient with dignity, care, and empathy.",col:C.red },
            { icon:"🔒",title:"Reliability",desc:"Operational 24/7, 365 days — rain or shine, no exceptions.",col:C.orange },
            { icon:"🔗",title:"Collaboration",desc:"Working alongside hospitals, SCDF, and community partners.",col:C.purple2 },
            { icon:"💡",title:"Innovation",desc:"Embracing technology to build leaner, smarter operations.",col:C.blue },
          ].map(v=>(
            <div key={v.title} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:20,marginBottom:8 }}>{v.icon}</div>
              <div style={{ fontSize:12.5,fontWeight:600,color:v.col,marginBottom:3 }}>{v.title}</div>
              <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}
function ContactPage() {
  const [form,setForm]=useState({name:"",email:"",phone:"",subject:"",message:""});
  const [sent,setSent]=useState(false);
  const inp={width:"100%",background:C.cardDeep,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box"};
  const lbl={fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6};
  return (
    <>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:20 }}>
        {[
          { icon:"📞",label:"Emergency Hotline",value:"+65 6297 8000",sub:"Available 24/7",col:C.pink,g:G.pink },
          { icon:"📧",label:"General Enquiries",value:"admin@emergencies.com.sg",sub:"Reply within 1 business day",col:C.purple2,g:G.pinkSoft },
          { icon:"📍",label:"Our Office",value:"Singapore",sub:"Serving island-wide",col:C.teal,g:G.teal },
        ].map(c=>(
          <Card key={c.label} g={c.g} style={{ padding:"20px" }}>
            <div style={{ width:40,height:40,borderRadius:"50%",background:`${c.col}20`,border:`1px solid ${c.col}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:12 }}>{c.icon}</div>
            <div style={{ fontSize:10.5,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3 }}>{c.label}</div>
            <div style={{ fontSize:13.5,fontWeight:600,color:C.white,marginBottom:2 }}>{c.value}</div>
            <div style={{ fontSize:11.5,color:C.muted }}>{c.sub}</div>
          </Card>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <SCard title="✉️ Send Us a Message" sub="We'll get back to you as soon as possible" g={G.pink}>
          {sent ? (
            <div style={{ textAlign:"center",padding:"28px 0" }}>
              <div style={{ fontSize:40,marginBottom:12 }}>✅</div>
              <div style={{ fontSize:16,fontWeight:700,color:C.white,marginBottom:6 }}>Message Sent!</div>
              <div style={{ fontSize:13,color:C.sub,marginBottom:18 }}>We'll be in touch shortly.</div>
              <button onClick={()=>{ setSent(false); setForm({name:"",email:"",phone:"",subject:"",message:""}); }} style={{ padding:"9px 22px",borderRadius:8,backgroundImage:G.pink,color:"#fff",fontWeight:600,fontSize:13,border:"none",cursor:"pointer" }}>Send Another</button>
            </div>
          ) : (
            <>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div><label style={lbl}>Full Name</label><input placeholder="Jane Tan" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inp} /></div>
                <div><label style={lbl}>Email</label><input type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={inp} /></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div><label style={lbl}>Phone</label><input placeholder="+65 9XXX XXXX" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} style={inp} /></div>
                <div>
                  <label style={lbl}>Subject</label>
                  <select value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} style={{ ...inp,cursor:"pointer" }}>
                    <option value="">Select a topic...</option>
                    <option>Ambulance Services</option><option>First Aid Training</option>
                    <option>Event Medical Coverage</option><option>Corporate / Medical Standby</option>
                    <option>General Enquiry</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Message</label>
                <textarea rows={4} placeholder="Tell us how we can help..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} style={{ ...inp,resize:"vertical",lineHeight:1.6 }} />
              </div>
              <button onClick={()=>setSent(true)} style={{ width:"100%",padding:"11px",borderRadius:8,backgroundImage:G.pink,color:"#fff",fontWeight:700,fontSize:14,border:"none",cursor:"pointer" }}>Send Message →</button>
            </>
          )}
        </SCard>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <SCard title="🕐 Operating Hours" g={G.pinkSoft}>
            {[["Emergency Dispatch","24 / 7 / 365",C.pink],["Monday – Friday","8:00am – 6:00pm",C.teal],["Saturday","8:00am – 1:00pm",C.purple2],["Sunday & PH","Emergency only",C.muted]].map(([d,h,col])=>(
              <div key={d} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}18` }}>
                <span style={{ fontSize:13,color:C.sub }}>{d}</span>
                <span style={{ fontSize:13,fontWeight:600,color:col }}>{h}</span>
              </div>
            ))}
          </SCard>
          <SCard title="📲 Follow Us" g={G.pink}>
            {[["🌐","Website","emergencies.com.sg",C.teal],["📘","Facebook","fb.com/emergenciessg",C.blue],["📸","Instagram","@emergencies.sg",C.pink],["💼","LinkedIn","linkedin.com/company/ef-rescue",C.purple2]].map(([icon,label,val,col])=>(
              <div key={label} style={{ display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:`1px solid ${C.border}18` }}>
                <span style={{ fontSize:18,width:22 }}>{icon}</span>
                <div>
                  <div style={{ fontSize:10.5,color:C.muted,marginBottom:1 }}>{label}</div>
                  <div style={{ fontSize:12.5,color:col,fontWeight:500 }}>{val}</div>
                </div>
              </div>
            ))}
          </SCard>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════
   LOGIN PAGE
   ════════════════════════════════════════ */
function LoginPage({ onLogin, onBack }) {
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  function handleLogin() {
    if(!email||!pw){ setErr("Please enter both email and password."); return; }
    onLogin();
  }
  return (
    <div style={{ minHeight:"100vh",background:"linear-gradient(135deg,#070f1a 0%,#0f1c2e 50%,#070f1a 100%)",fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text,display:"flex",flexDirection:"column" }}>
      <div style={{ background:"#06101a99",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"0 40px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:32,height:32,borderRadius:"50%",backgroundImage:G.pink,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>🚑</div>
          <span style={{ fontSize:13,fontWeight:700,color:C.white }}>Emergencies F&amp;R</span>
        </div>
        <button onClick={onBack} style={{ display:"flex",alignItems:"center",gap:6,background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 14px",color:C.sub,fontSize:12,cursor:"pointer" }}>
          ← Back to site
        </button>
      </div>
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px" }}>
        <div style={{ width:"100%",maxWidth:420,background:"linear-gradient(160deg,#0d1e35 0%,#132237 60%,#0f1c2e 100%)",border:`1px solid #2a4a6a`,borderRadius:18,padding:"40px 44px",position:"relative",overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,0.5)" }}>
          <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.pink,borderRadius:"18px 18px 0 0" }} />
          <div style={{ position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,#ec489910 0%,transparent 70%)",pointerEvents:"none" }} />
          <div style={{ textAlign:"center",marginBottom:26 }}>
            <div style={{ width:58,height:58,borderRadius:"50%",backgroundImage:G.pink,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px" }}>🚑</div>
            <div style={{ fontSize:21,fontWeight:700,color:C.white }}>Welcome Back</div>
            <div style={{ fontSize:12,color:C.muted,marginTop:4 }}>Operations Director · MediFlow Platform</div>
          </div>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:22 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"7px 18px",borderRadius:20,background:`${C.pink}18`,border:`1px solid ${C.pink}40` }}>
              <span>🚑</span><span style={{ fontSize:12.5,fontWeight:600,color:C.pink }}>Operations Director</span>
            </div>
          </div>
          {err && <div style={{ background:`${C.red}18`,border:`1px solid ${C.red}40`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.red,marginBottom:14 }}>{err}</div>}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6 }}>Email Address</label>
            <input type="email" placeholder="you@emergencies.com.sg" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:"100%",background:"#0a1828",border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6 }}>Password</label>
            <input type="password" placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{ width:"100%",background:"#0a1828",border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22 }}>
            <label style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.muted,cursor:"pointer" }}>
              <input type="checkbox" style={{ accentColor:C.pink }} /> Remember me
            </label>
            <span style={{ fontSize:12,color:C.pink,cursor:"pointer",fontWeight:500 }}>Forgot password?</span>
          </div>
          <button onClick={handleLogin} style={{ width:"100%",padding:"13px",borderRadius:10,backgroundImage:G.pink,color:"#fff",fontWeight:700,fontSize:14,border:"none",cursor:"pointer" }}>
            Sign In →
          </button>
          <div style={{ display:"flex",alignItems:"center",gap:10,margin:"18px 0 14px",color:C.muted,fontSize:11 }}>
            <div style={{ flex:1,height:1,background:C.border }} /><span>or continue with</span><div style={{ flex:1,height:1,background:C.border }} />
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20 }}>
            {["🔑  Single Sign-On","📱  OTP / 2FA"].map(opt=>(
              <button key={opt} style={{ padding:"10px",borderRadius:9,background:"#0a1828",border:`1px solid ${C.border}`,color:C.sub,fontSize:12,cursor:"pointer" }}>{opt}</button>
            ))}
          </div>
          <div style={{ padding:"12px 14px",background:`${C.pink}10`,borderRadius:9,border:`1px solid ${C.pink}20` }}>
            <div style={{ fontSize:11,color:C.pink,fontWeight:600,marginBottom:3 }}>🔒 Secure Access</div>
            <div style={{ fontSize:11,color:C.muted,lineHeight:1.55 }}>All login activity is logged and monitored. Unauthorised attempts are reported to your administrator.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DASHBOARD TABS
   ════════════════════════════════════════ */
const TABS = [
  { id:"dashboard",  label:"Dashboard",       icon:"⊞" },
  { id:"scheduler",  label:"Auto Scheduler",  icon:"🗓" },
  { id:"roster",     label:"Roster",          icon:"📋" },
  { id:"leave",      label:"Leave Management",icon:"🏖" },
  { id:"conflicts",  label:"Conflict Detection",icon:"⚠️" },
  { id:"employees",  label:"Employee Database",icon:"👥" },
];

/* ── Dashboard ── */
function DashboardTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.3 }}>⊞</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.white,marginBottom:8 }}>Workforce Dashboard</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        Real-time ambulance manpower visibility, KPI tracking, and roster coverage will be displayed here once data is connected.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.teal}18`,border:`1px solid ${C.teal}40`,fontSize:12.5,fontWeight:600,color:C.teal }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}

/* ── Auto Scheduler (empty) ── */
function SchedulerTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.3 }}>🗓</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.white,marginBottom:8 }}>Auto Scheduler</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        AI-powered scheduling will automatically assign manpower based on availability, demand patterns, and operational constraints.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.pink}18`,border:`1px solid ${C.pink}40`,fontSize:12.5,fontWeight:600,color:C.pink }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}

/* ── Roster (empty) ── */
function RosterTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.3 }}>📋</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.white,marginBottom:8 }}>Roster Management</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        Staff rosters will be managed here. View weekly and monthly schedules, assign shifts, and track attendance across all ambulance crews.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.blue}18`,border:`1px solid ${C.blue}40`,fontSize:12.5,fontWeight:600,color:C.blue }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}

/* ── Leave Management ── */
function LeaveTab() {
  const WA_NUMBER = "https://wa.me/12013899402";

  return (
    <>
      {/* Banner */}
      <div style={{ background:G.hero,border:`1px solid ${C.border}`,borderRadius:14,padding:"26px 32px",marginBottom:20,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.teal }} />
        <div style={{ display:"flex",alignItems:"center",gap:14 }}>
          <div style={{ width:48,height:48,borderRadius:12,background:`${C.teal}20`,border:`1px solid ${C.teal}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>💬</div>
          <div>
            <div style={{ fontSize:16,fontWeight:700,color:C.white,marginBottom:4 }}>Leave Management via WhatsApp Bot</div>
            <div style={{ fontSize:12.5,color:C.muted,lineHeight:1.6 }}>
              Click the button below to open WhatsApp. Once the chat opens, type <strong style={{ color:C.white }}>leave</strong> and the bot will guide you through your application step by step.
            </div>
          </div>
        </div>
      </div>

      {/* Single CTA */}
      <div style={{ display:"flex",justifyContent:"center",marginBottom:28 }}>
        <a href={WA_NUMBER} target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:10,padding:"14px 36px",borderRadius:12,backgroundImage:G.teal,color:"#fff",fontWeight:700,fontSize:15,textDecoration:"none",boxShadow:"0 6px 20px rgba(0,201,167,0.35)" }}>
          <span style={{ fontSize:20 }}>💬</span> Open WhatsApp Chat
        </a>
      </div>

      {/* How it works */}
      <SCard title="📌 How It Works" sub="Once you open WhatsApp, the bot takes over" g={G.teal}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:12 }}>
          {[
            { step:"1", label:"Open Chat",    desc:'Click the button above to open WhatsApp.',           col:C.teal },
            { step:"2", label:'Type "leave"', desc:"Send the word leave to start the bot flow.",          col:C.blue },
            { step:"3", label:"Bot asks you", desc:"Bot asks for your name, role, dates, ambulance & leave type one by one.", col:C.purple2 },
            { step:"4", label:"Upload MC",    desc:"For Medical Leave, upload your MC. Without it the bot will not proceed.", col:C.orange },
            { step:"5", label:"Done",         desc:"Bot confirms submission. Ops Director reviews it on this dashboard.", col:C.green },
          ].map(s=>(
            <div key={s.step} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}`,textAlign:"center" }}>
              <div style={{ width:30,height:30,borderRadius:"50%",background:`${s.col}20`,border:`1px solid ${s.col}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:s.col,margin:"0 auto 10px" }}>{s.step}</div>
              <div style={{ fontSize:12,fontWeight:700,color:C.white,marginBottom:4 }}>{s.label}</div>
              <div style={{ fontSize:11,color:C.muted,lineHeight:1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </SCard>

      {/* What bot will ask */}
      <SCard title="🤖 What the Bot Will Ask You" sub="Each question is asked one at a time — just reply with your answer" g={G.blue}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          {[
            { q:"Full Name",      ex:"Sarah Lim",          note:"As per employment records",       col:C.teal },
            { q:"Role",           ex:"Driver / Paramedic / EMT", note:"Select your assigned role", col:C.blue },
            { q:"Leave Date(s)",  ex:"10 Jun 2025",         note:"Single date or date range",       col:C.purple2 },
            { q:"Ambulance ID",   ex:"AMB-01",              note:"Your assigned ambulance",         col:C.orange },
            { q:"Leave Type",     ex:"Medical / Annual / Emergency / Unpaid", note:"Choose your leave type", col:C.pink },
            { q:"MC Upload",      ex:"Photo or PDF",        note:"Required for Medical Leave only", col:C.red },
          ].map(item=>(
            <div key={item.q} style={{ display:"flex",gap:12,background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
              <div style={{ width:8,borderRadius:4,background:item.col,flexShrink:0 }} />
              <div>
                <div style={{ fontSize:12.5,fontWeight:700,color:C.white,marginBottom:3 }}>"{item.q}"</div>
                <div style={{ fontSize:12,color:item.col,fontWeight:600,marginBottom:2 }}>e.g. {item.ex}</div>
                <div style={{ fontSize:11,color:C.muted }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}

/* ── Conflict Detection (sample data) ── */
function ConflictsTab() {
  const conflicts = [
    { id:"C-001",type:"Double Booking",     staff:"Nur Aisyah",    shift1:"AMB-01 08:00–20:00",shift2:"AMB-03 07:00–19:00",date:"25 May 2025",severity:"High",   sc:C.red },
    { id:"C-002",type:"Overtime Breach",    staff:"Kumar Raj",     shift1:"AMB-02 07:00–19:00",shift2:"Extended +2hrs",    date:"25 May 2025",severity:"Medium", sc:C.orange },
    { id:"C-003",type:"Rest Period Breach", staff:"Daniel Tan",    shift1:"AMB-01 20:00 end",   shift2:"Next shift 04:00", date:"26 May 2025",severity:"High",   sc:C.red },
    { id:"C-004",type:"Understaffed Crew",  staff:"AMB-04 crew",   shift1:"06:00–18:00",        shift2:"Missing medic",    date:"25 May 2025",severity:"Medium", sc:C.orange },
    { id:"C-005",type:"Skill Mismatch",     staff:"Reza Malik",    shift1:"AMB-04 driver slot",  shift2:"Req. paramedic",  date:"27 May 2025",severity:"Low",    sc:C.yellow },
  ];
  const summary = [
    { count:2,label:"High Severity",col:C.red },
    { count:2,label:"Medium Severity",col:C.orange },
    { count:1,label:"Low Severity",col:C.yellow },
    { count:5,label:"Total Conflicts",col:C.pink },
  ];
  return (
    <>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:20 }}>
        {summary.map(s=>(
          <Card key={s.label} g={G.orange} style={{ padding:"18px 20px" }}>
            <div style={{ fontSize:28,fontWeight:800,color:s.col,marginBottom:4 }}>{s.count}</div>
            <div style={{ fontSize:12,color:C.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <SCard title="⚠️ Active Scheduling Conflicts" sub="Auto-detected conflicts requiring immediate attention" g={G.orange}>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
          <thead><tr>{["ID","Type","Staff / Unit","Shift 1","Shift 2","Date","Severity"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>
            {conflicts.map(r=>(
              <tr key={r.id}>
                <td style={{ ...TD,fontWeight:700,color:C.muted,fontSize:11 }}>{r.id}</td>
                <td style={{ ...TD,fontWeight:600,color:C.white }}>{r.type}</td>
                <td style={TD}>{r.staff}</td>
                <td style={{ ...TD,fontSize:12 }}>{r.shift1}</td>
                <td style={{ ...TD,fontSize:12 }}>{r.shift2}</td>
                <td style={{ ...TD,fontSize:12,color:C.muted }}>{r.date}</td>
                <td style={TD}><Badge label={r.severity} color={r.sc} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SCard>
      <SCard title="📊 Conflict Breakdown by Type" g={G.blue}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          {[
            { type:"Double Booking",count:1,pct:60,col:C.red },
            { type:"Overtime Breach",count:1,pct:40,col:C.orange },
            { type:"Rest Period Breach",count:1,pct:80,col:C.red },
            { type:"Understaffed Crew",count:1,pct:50,col:C.orange },
            { type:"Skill Mismatch",count:1,pct:30,col:C.yellow },
          ].map(b=>(
            <div key={b.type} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                <span style={{ fontSize:12.5,fontWeight:600,color:C.white }}>{b.type}</span>
                <span style={{ fontSize:12,color:b.col,fontWeight:700 }}>{b.count}</span>
              </div>
              <div style={{ height:6,borderRadius:3,background:C.border,overflow:"hidden" }}>
                <div style={{ height:"100%",width:`${b.pct}%`,background:b.col,borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}

/* ── Employee Database (empty) ── */
function EmployeesTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.3 }}>👥</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.white,marginBottom:8 }}>Employee Database</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        The employee management system will store staff profiles, certifications, contact details, and employment records for all EFAR personnel.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.purple2}18`,border:`1px solid ${C.purple2}40`,fontSize:12.5,fontWeight:600,color:C.purple2 }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DASHBOARD SHELL
   ════════════════════════════════════════ */
function DashboardShell({ onLogout }) {
  const [tab,setTab]=useState("dashboard");
  const content = {
    dashboard: <DashboardTab />,
    scheduler: <SchedulerTab />,
    roster:    <RosterTab />,
    leave:     <LeaveTab />,
    conflicts: <ConflictsTab />,
    employees: <EmployeesTab />,
  };
  const titles = {
    dashboard:"Workforce Dashboard",
    scheduler:"Auto Scheduler",
    roster:"Roster Management",
    leave:"Leave Management",
    conflicts:"Conflict Detection",
    employees:"Employee Database",
  };
  const subs = {
    dashboard:"Real-time ambulance manpower visibility and roster coverage",
    scheduler:"AI-powered shift scheduling based on availability and demand",
    roster:"Manage weekly and monthly staff rosters",
    leave:"Manage leave applications via WhatsApp",
    conflicts:"Auto-detected scheduling conflicts requiring attention",
    employees:"Staff profiles, certifications and employment records",
  };
  return (
    <div style={{ display:"flex",height:"100vh",background:C.bg,fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text,overflow:"hidden" }}>
      {/* SIDEBAR */}
      <div style={{ width:220,background:C.sidebar,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0 }}>
        <div style={{ padding:"18px 16px 14px",borderBottom:`1px solid ${C.border}` }}>
          <div style={{ width:38,height:38,borderRadius:"50%",backgroundImage:G.pink,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:8 }}>🚑</div>
          <div style={{ fontSize:13.5,fontWeight:700,color:C.white,lineHeight:1.2 }}>MediFlow</div>
          <div style={{ fontSize:10.5,color:C.muted,marginTop:2 }}>Emergencies F&R</div>
        </div>
        <nav style={{ flex:1,padding:"10px 8px" }}>
          {TABS.map(t=>(
            <div key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,background:tab===t.id?"#1e4a2e":"transparent",color:tab===t.id?C.teal:C.sub,fontWeight:tab===t.id?600:400,fontSize:13,border:tab===t.id?`1px solid ${C.teal}28`:"1px solid transparent",transition:"all 0.15s" }}>
              <span style={{ fontSize:14,width:18,textAlign:"center" }}>{t.icon}</span>
              {t.label}
            </div>
          ))}
        </nav>
        <div style={{ padding:"12px 14px",borderTop:`1px solid ${C.border}` }}>
          <button onClick={onLogout} style={{ width:"100%",padding:"9px",borderRadius:8,background:"transparent",border:`1px solid ${C.border}`,color:C.muted,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}>
            ← Log Out
          </button>
          <div style={{ fontSize:10.5,color:C.muted,marginTop:8,textAlign:"center" }}>v1.0 · emergencies.com.sg</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        {/* TOPBAR */}
        <div style={{ background:C.sidebar,borderBottom:`1px solid ${C.border}`,padding:"0 28px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0 }}>
          <input type="text" placeholder="🔍  Search..." style={{ flex:1,maxWidth:380,background:C.cardDeep,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 14px",color:C.text,fontSize:13,outline:"none" }} />
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <div style={{ fontSize:11,color:C.muted,textAlign:"right" }}>
              <div style={{ fontSize:10 }}>Today</div>
              <div style={{ fontWeight:600,color:C.sub }}>Mon, May 25</div>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12,fontWeight:600,color:C.white }}>MediFlow</div>
                <div style={{ fontSize:10,color:C.muted }}>Operations Director</div>
              </div>
              <div style={{ width:34,height:34,borderRadius:"50%",backgroundImage:G.pinkSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>🚑</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex:1,overflowY:"auto",padding:"28px 32px" }}>
          <div style={{ fontSize:24,fontWeight:800,color:C.white,marginBottom:4 }}>{titles[tab]}</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:24 }}>{subs[tab]}</div>
          {content[tab]}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   PUBLIC SITE NAVBAR
   ════════════════════════════════════════ */
function PublicNav({ active, onNav, onLoginClick }) {
  const NAV = [{ id:"home",label:"Home" },{ id:"about",label:"About Us" },{ id:"contact",label:"Contact Us" }];
  return (
    <div style={{ position:"sticky",top:0,zIndex:50,background:C.sidebar+"f0",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:960,margin:"0 auto",padding:"0 32px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
          <div style={{ width:36,height:36,borderRadius:"50%",backgroundImage:G.pink,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>🚑</div>
          <div>
            <div style={{ fontSize:14,fontWeight:700,color:C.white,lineHeight:1.2 }}>Emergencies F&R</div>
            <div style={{ fontSize:10,color:C.muted }}>MediFlow Platform</div>
          </div>
        </div>
        <nav style={{ display:"flex",alignItems:"center",gap:2 }}>
          {NAV.map(s=>(
            <button key={s.id} onClick={()=>onNav(s.id)} style={{ padding:"7px 18px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:active===s.id?600:400,background:active===s.id?`${C.pink}18`:"transparent",color:active===s.id?C.pink:C.sub,transition:"all 0.15s" }}>{s.label}</button>
          ))}
        </nav>
        <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
          <div style={{ fontSize:11,color:C.muted,textAlign:"right" }}>
            <div style={{ fontSize:10 }}>Today</div>
            <div style={{ fontWeight:600,color:C.sub }}>Mon, May 25</div>
          </div>
          <div style={{ width:1,height:22,background:C.border }} />
          <button onClick={onLoginClick} style={{ display:"flex",alignItems:"center",gap:7,padding:"8px 18px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:600,backgroundImage:G.pink,color:"#fff",border:"none",boxShadow:"0 4px 14px rgba(236,72,153,0.35)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   APP ROOT
   ════════════════════════════════════════ */
export default function App() {
  const [view,setView]=useState("public");        // public | login | dashboard
  const [section,setSection]=useState("home");

  const scroll = (id) => {
    setSection(id);
    setTimeout(()=>document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }),50);
  };

  if(view==="login")     return <LoginPage onLogin={()=>setView("dashboard")} onBack={()=>setView("public")} />;
  if(view==="dashboard") return <DashboardShell onLogout={()=>setView("public")} />;

  return (
    <div style={{ background:C.bg,minHeight:"100vh",fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text }}>
      <PublicNav active={section} onNav={scroll} onLoginClick={()=>setView("login")} />
      <div style={{ maxWidth:960,margin:"0 auto",padding:"0 32px" }}>
        <section id="home" style={{ paddingTop:40 }}>
          <Hero /><StatsBar /><ServicesGrid /><WhyUs /><CtaStrip />
        </section>
        <section id="about" style={{ paddingTop:20 }}>
          <div style={{ fontSize:26,fontWeight:800,color:C.white,marginBottom:4 }}>About Us</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:24 }}>Our mission, values, and what drives us</div>
          <AboutPage />
        </section>
        <section id="contact" style={{ paddingTop:20,paddingBottom:60 }}>
          <div style={{ fontSize:26,fontWeight:800,color:C.white,marginBottom:4 }}>Contact Us</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:24 }}>Get in touch with our team — we're here to help</div>
          <ContactPage />
        </section>
      </div>
    </div>
  );
}