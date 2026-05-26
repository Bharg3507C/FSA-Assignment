import { useState } from "react";
 
const C = {
  bg:         "#1e3a5f",
  navBg:      "#183354",
  card:       "#234570",
  cardDeep:   "#1e3d65",
  border:     "#2e5485",
  pink:       "#ec4899",
  pink2:      "#f472b6",
  purple:     "#a855f7",
  purple2:    "#c084fc",
  teal:       "#00c9a7",
  green:      "#22c55e",
  orange:     "#f97316",
  red:        "#ef4444",
  blue:       "#3b82f6",
  yellow:     "#f59e0b",
  text:       "#e2e8f0",
  sub:        "#94a3b8",
  muted:      "#6b8db5",
  white:      "#ffffff",
};
 
const G = {
  pink:     "linear-gradient(90deg,#ec4899,#a855f7)",
  pinkSoft: "linear-gradient(90deg,#f472b6,#c084fc)",
  teal:     "linear-gradient(90deg,#00c9a7,#22c55e)",
  orange:   "linear-gradient(90deg,#f97316,#ef4444)",
  blue:     "linear-gradient(90deg,#3b82f6,#a855f7)",
  yellow:   "linear-gradient(90deg,#f59e0b,#f97316)",
  green:    "linear-gradient(90deg,#22c55e,#16a34a)",
  hero:     "linear-gradient(135deg,#1e3a5f 0%,#254a78 50%,#1e3a5f 100%)",
};
 
/* ── shared ── */
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
    <Card g={g} style={{ padding:"22px 24px",marginBottom:22 }}>
      {title && <div style={{ fontSize:15,fontWeight:700,color:C.white,marginBottom:sub?3:14,textAlign:"left" }}>{title}</div>}
      {sub   && <div style={{ fontSize:12,color:C.muted,marginBottom:16,textAlign:"left" }}>{sub}</div>}
      {children}
    </Card>
  );
}
 
/* ── NAVBAR (shared) ── */
function Navbar({ active, onNav, onLogin }) {
  const SECTIONS = [
    { id:"home",    label:"Home" },
    { id:"about",   label:"About Us" },
    { id:"contact", label:"Contact Us" },
  ];
  return (
    <div style={{ position:"sticky",top:0,zIndex:50,background:C.navBg+"f0",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:960,margin:"0 auto",padding:"0 32px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
 
        {/* logo */}
        <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
          <div style={{ width:36,height:36,borderRadius:"50%",backgroundImage:G.pink,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>🚑</div>
          <div>
            <div style={{ fontSize:14,fontWeight:700,color:C.white,lineHeight:1.2 }}>Emergencies F&R</div>
            <div style={{ fontSize:10,color:C.muted }}>MediFlow Platform</div>
          </div>
        </div>
 
        {/* centre nav */}
        <nav style={{ display:"flex",alignItems:"center",gap:2 }}>
          {SECTIONS.map(s=>(
            <button key={s.id} onClick={()=>onNav(s.id)} style={{
              padding:"7px 18px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,
              fontWeight:active===s.id?600:400,
              background:active===s.id?`${C.pink}18`:"transparent",
              color:active===s.id?C.pink:C.sub,
              transition:"all 0.15s",
            }}>{s.label}</button>
          ))}
        </nav>
 
        {/* right: date + avatar + login */}
        <div style={{ display:"flex",alignItems:"center",gap:14,flexShrink:0 }}>
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
 
          {/* divider */}
          <div style={{ width:1,height:24,background:C.border }} />
 
          {/* Login button — far right */}
          <button onClick={onLogin} style={{
            display:"flex",alignItems:"center",gap:7,
            padding:"8px 20px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:600,
            backgroundImage:G.pink,color:"#fff",border:"none",
            boxShadow:"0 4px 16px rgba(236,72,153,0.38)",
            transition:"all 0.15s",flexShrink:0,
          }}>
            {/* lock icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Login
          </button>
        </div>
 
      </div>
    </div>
  );
}
 
/* ── HOME ── */
function Hero() {
  return (
    <div style={{ background:G.hero,border:`1px solid ${C.border}`,borderRadius:16,padding:"52px 48px",marginBottom:28,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.pink }} />
      <div style={{ position:"absolute",right:48,top:"50%",transform:"translateY(-50%)",fontSize:120,opacity:0.04,userSelect:"none",pointerEvents:"none" }}>🚑</div>
      <div style={{ position:"absolute",top:-80,right:-80,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,#ec489915 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ position:"absolute",bottom:-60,left:-60,width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,#a855f710 0%,transparent 70%)",pointerEvents:"none" }} />
      <div style={{ fontSize:11,color:C.pink,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:14,textAlign:"left" }}>Singapore's Trusted Emergency Services</div>
      <div style={{ fontSize:40,fontWeight:800,color:C.white,lineHeight:1.15,marginBottom:14,textAlign:"left" }}>
        Rapid Response.<br /><span style={{ color:C.pink }}>Saving Lives</span> Every Day.
      </div>
      <div style={{ fontSize:14,color:C.sub,maxWidth:540,lineHeight:1.8,marginBottom:28,textAlign:"left" }}>
        Emergencies First Aid &amp; Rescue provides professional ambulance services, first aid training,
        and event medical coverage across Singapore. Our 24/7 operations ensure no emergency goes unanswered.
      </div>
      <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
        {[["24/7 Operations",C.pink],["Certified Paramedics",C.purple2],["Island-Wide Coverage",C.teal],["MOH Accredited",C.yellow]].map(([l,col])=>(
          <span key={l} style={{ padding:"7px 16px",borderRadius:20,fontSize:12,fontWeight:600,color:col,background:`${col}16`,border:`1px solid ${col}40` }}>{l}</span>
        ))}
      </div>
    </div>
  );
}
 
function Services() {
  const list = [
    { icon:"🚑",title:"Ambulance Services",     desc:"24/7 emergency & non-emergency dispatch across Singapore.",  col:C.pink },
    { icon:"🏥",title:"Event Medical Coverage", desc:"On-site medical teams for events, marathons & gatherings.",  col:C.purple2 },
    { icon:"💉",title:"First Aid Training",     desc:"MOH-accredited CPR and first aid certification courses.",    col:C.teal },
    { icon:"🩺",title:"Paramedic Services",     desc:"Advanced life support by certified paramedics & EMTs.",      col:C.blue },
    { icon:"📋",title:"Medical Standby",        desc:"Dedicated standby medical teams for corporate clients.",     col:C.orange },
    { icon:"🔧",title:"Rescue Operations",      desc:"Specialised rescue support for complex emergencies.",        col:C.red },
  ];
  return (
    <SCard title="Our Services" sub="Full-spectrum emergency and healthcare solutions" g={G.pinkSoft}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
        {list.map(s=>(
          <div key={s.title} style={{ background:C.cardDeep,borderRadius:10,padding:"16px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${s.col}`,textAlign:"left" }}>
            <div style={{ fontSize:24,marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:12.5,fontWeight:600,color:C.white,marginBottom:4 }}>{s.title}</div>
            <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.55 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </SCard>
  );
}
 
/* ── ABOUT ── */
function About() {
  return (
    <>
      <div style={{ background:G.hero,border:`1px solid ${C.border}`,borderRadius:16,padding:"44px 48px",marginBottom:22,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.pinkSoft }} />
        <div style={{ position:"absolute",right:48,top:"50%",transform:"translateY(-50%)",fontSize:110,opacity:0.04,userSelect:"none" }}>🏥</div>
        <div style={{ position:"absolute",top:-60,right:-60,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,#a855f712 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ fontSize:11,color:C.purple2,fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:12,textAlign:"left" }}>Who We Are</div>
        <div style={{ fontSize:34,fontWeight:800,color:C.white,lineHeight:1.2,marginBottom:12,textAlign:"left" }}>
          Built on <span style={{ color:C.pink }}>Trust.</span><br />Driven by Purpose.
        </div>
        <div style={{ fontSize:13.5,color:C.sub,maxWidth:520,lineHeight:1.8,marginBottom:24,textAlign:"left" }}>
          Founded in Singapore, Emergencies First Aid &amp; Rescue is a healthcare and training service provider
          committed to saving lives through rapid response, expert training, and operational excellence.
        </div>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          {[["Est. 2010",C.pink],["MOH Licensed",C.teal],["50+ Staff",C.purple2],["24/7 Operations",C.orange]].map(([l,col])=>(
            <span key={l} style={{ padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,color:col,background:`${col}16`,border:`1px solid ${col}40` }}>{l}</span>
          ))}
        </div>
      </div>
 
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:22 }}>
        <SCard title="🎯 Our Mission" g={G.pink}>
          <p style={{ fontSize:13,color:C.sub,lineHeight:1.8,margin:0 }}>
            To provide rapid, reliable, and compassionate emergency medical services to the people of Singapore —
            ensuring every individual receives timely care when it matters most. We believe no emergency should go without a professional response.
          </p>
        </SCard>
        <SCard title="🔭 Our Vision" g={G.pinkSoft}>
          <p style={{ fontSize:13,color:C.sub,lineHeight:1.8,margin:0 }}>
            To become Singapore's most trusted emergency services provider — innovating through technology,
            building a highly skilled workforce, and setting the gold standard for pre-hospital care and first aid training excellence.
          </p>
        </SCard>
      </div>
 
      <SCard title="🤝 Our Core Values" g={G.pink}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
          {[
            { icon:"⚡",title:"Speed",         desc:"Every second counts. We optimise for the fastest possible response.", col:C.teal },
            { icon:"🎓",title:"Excellence",    desc:"MOH-accredited training and certified paramedics at every level.",    col:C.pink },
            { icon:"❤️", title:"Compassion",   desc:"We treat every patient with dignity, care, and empathy.",            col:C.red },
            { icon:"🔒",title:"Reliability",   desc:"Operational 24/7, 365 days — rain or shine, no exceptions.",         col:C.orange },
            { icon:"🔗",title:"Collaboration", desc:"Working alongside hospitals, SCDF, and community partners.",          col:C.purple2 },
            { icon:"💡",title:"Innovation",    desc:"Embracing technology to build leaner, smarter operations.",           col:C.blue },
          ].map(v=>(
            <div key={v.title} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:22,marginBottom:8 }}>{v.icon}</div>
              <div style={{ fontSize:12.5,fontWeight:600,color:v.col,marginBottom:4 }}>{v.title}</div>
              <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}
 
/* ── CONTACT ── */
function Contact() {
  const [form, setForm] = useState({ name:"",email:"",phone:"",subject:"",message:"" });
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const inp = { width:"100%",background:C.cardDeep,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box" };
  const lbl = { fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6 };
  return (
    <>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:22 }}>
        {[
          { icon:"📞",label:"Emergency Hotline",value:"+65 6XXX XXXX",sub:"Available 24/7",          col:C.pink,   g:G.pink },
          { icon:"📧",label:"General Enquiries", value:"info@emergencies.com.sg",sub:"Reply within 1 business day",col:C.purple2,g:G.pinkSoft },
          { icon:"📍",label:"Our Office",        value:"Singapore",sub:"Serving island-wide",          col:C.teal,   g:G.teal },
        ].map(c=>(
          <Card key={c.label} g={c.g} style={{ padding:"22px 20px" }}>
            <div style={{ width:42,height:42,borderRadius:"50%",background:`${c.col}20`,border:`1px solid ${c.col}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,marginBottom:14 }}>{c.icon}</div>
            <div style={{ fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4 }}>{c.label}</div>
            <div style={{ fontSize:14,fontWeight:600,color:C.white,marginBottom:3 }}>{c.value}</div>
            <div style={{ fontSize:11.5,color:C.muted }}>{c.sub}</div>
          </Card>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:22 }}>
        <SCard title="✉️ Send Us a Message" sub="We'll get back to you as soon as possible" g={G.pink}>
          {sent ? (
            <div style={{ textAlign:"center",padding:"32px 0" }}>
              <div style={{ fontSize:44,marginBottom:16 }}>✅</div>
              <div style={{ fontSize:16,fontWeight:700,color:C.white,marginBottom:8 }}>Message Sent!</div>
              <div style={{ fontSize:13,color:C.sub,marginBottom:20 }}>Thanks for reaching out. We'll be in touch shortly.</div>
              <button onClick={()=>{ setSent(false); setForm({ name:"",email:"",phone:"",subject:"",message:"" }); }} style={{ padding:"9px 24px",borderRadius:8,backgroundImage:G.pink,color:"#fff",fontWeight:600,fontSize:13,border:"none",cursor:"pointer" }}>Send Another</button>
            </div>
          ) : (
            <>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div><label style={lbl}>Full Name</label><input placeholder="Jane Tan" value={form.name} onChange={e=>set("name",e.target.value)} style={inp} /></div>
                <div><label style={lbl}>Email Address</label><input type="email" placeholder="you@example.com" value={form.email} onChange={e=>set("email",e.target.value)} style={inp} /></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div><label style={lbl}>Phone Number</label><input placeholder="+65 9XXX XXXX" value={form.phone} onChange={e=>set("phone",e.target.value)} style={inp} /></div>
                <div>
                  <label style={lbl}>Subject</label>
                  <select value={form.subject} onChange={e=>set("subject",e.target.value)} style={{ ...inp,cursor:"pointer" }}>
                    <option value="">Select a topic...</option>
                    <option>Ambulance Services</option>
                    <option>First Aid Training</option>
                    <option>Event Medical Coverage</option>
                    <option>Corporate / Medical Standby</option>
                    <option>General Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:18 }}>
                <label style={lbl}>Message</label>
                <textarea rows={4} placeholder="Tell us how we can help..." value={form.message} onChange={e=>set("message",e.target.value)} style={{ ...inp,resize:"vertical",lineHeight:1.6 }} />
              </div>
              <button onClick={()=>setSent(true)} style={{ width:"100%",padding:"11px",borderRadius:8,backgroundImage:G.pink,color:"#fff",fontWeight:700,fontSize:14,border:"none",cursor:"pointer" }}>Send Message →</button>
            </>
          )}
        </SCard>
        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          <SCard title="🕐 Operating Hours" g={G.pinkSoft}>
            {[
              { day:"Emergency Dispatch",hours:"24 / 7 / 365",  col:C.pink },
              { day:"Monday – Friday",   hours:"8:00am – 6:00pm",col:C.teal },
              { day:"Saturday",          hours:"8:00am – 1:00pm",col:C.purple2 },
              { day:"Sunday & PH",       hours:"Emergency only", col:C.muted },
            ].map(r=>(
              <div key={r.day} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}18` }}>
                <span style={{ fontSize:13,color:C.sub }}>{r.day}</span>
                <span style={{ fontSize:13,fontWeight:600,color:r.col }}>{r.hours}</span>
              </div>
            ))}
          </SCard>
          <SCard title="🔗 Quick Links" g={G.blue}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
              {[
                { icon:"🎓",label:"Book Training",     col:C.teal },
                { icon:"📋",label:"Request Standby",   col:C.purple2 },
                { icon:"🚑",label:"Non-Emergency Amb", col:C.pink },
                { icon:"📄",label:"Download Brochure", col:C.orange },
              ].map(l=>(
                <div key={l.label} style={{ background:C.cardDeep,borderRadius:9,padding:"12px 14px",border:`1px solid ${C.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:10 }}>
                  <span style={{ fontSize:18 }}>{l.icon}</span>
                  <span style={{ fontSize:12,fontWeight:500,color:l.col }}>{l.label}</span>
                </div>
              ))}
            </div>
          </SCard>
          <SCard title="📲 Follow Us" g={G.pink}>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {[
                { icon:"🌐",label:"Website",  value:"emergencies.com.sg",         col:C.teal },
                { icon:"📘",label:"Facebook", value:"fb.com/emergenciessg",        col:C.blue },
                { icon:"📸",label:"Instagram",value:"@emergencies.sg",             col:C.pink },
                { icon:"💼",label:"LinkedIn", value:"linkedin.com/company/ef-rescue",col:C.purple2 },
              ].map(s=>(
                <div key={s.label} style={{ display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:`1px solid ${C.border}18` }}>
                  <span style={{ fontSize:18,width:24,textAlign:"center" }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize:11,color:C.muted,marginBottom:1 }}>{s.label}</div>
                    <div style={{ fontSize:12.5,color:s.col,fontWeight:500 }}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </SCard>
        </div>
      </div>
    </>
  );
}
 
/* ── LOGIN PAGE (separate full page) ── */
function LoginPage({ onBack }) {
  const [email, setEmail] = useState("");
  const [pw,    setPw]    = useState("");
 
  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#152d4d 0%,#1e3a5f 35%,#243f6a 60%,#1a3358 100%)",
      fontFamily:"'Inter','Segoe UI',sans-serif",
      color:C.text,
      display:"flex",
      flexDirection:"column",
    }}>
      {/* minimal top bar */}
      <div style={{ background:"#13284499",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"0 40px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:32,height:32,borderRadius:"50%",backgroundImage:G.pink,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>🚑</div>
          <span style={{ fontSize:13,fontWeight:700,color:C.white }}>Emergencies F&R</span>
        </div>
        <button onClick={onBack} style={{ display:"flex",alignItems:"center",gap:6,background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 14px",color:C.sub,fontSize:12,cursor:"pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to site
        </button>
      </div>
 
      {/* centered card */}
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px" }}>
 
        {/* glow blobs */}
        <div style={{ position:"fixed",top:"20%",left:"15%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,#ec489918 0%,transparent 65%)",pointerEvents:"none" }} />
        <div style={{ position:"fixed",bottom:"15%",right:"15%",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,#a855f714 0%,transparent 65%)",pointerEvents:"none" }} />
 
        <div style={{
          width:"100%",maxWidth:440,
          background:"linear-gradient(160deg,#1e3d65 0%,#234570 60%,#1e3a5f 100%)",
          border:`1px solid #3a5f90`,
          borderRadius:18,
          padding:"40px 44px",
          position:"relative",
          overflow:"hidden",
          boxShadow:"0 24px 64px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
        }}>
          {/* gradient top stripe */}
          <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:G.pink,borderRadius:"18px 18px 0 0" }} />
          {/* inner glow */}
          <div style={{ position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,#ec489910 0%,transparent 70%)",pointerEvents:"none" }} />
 
          {/* header */}
          <div style={{ textAlign:"center",marginBottom:28 }}>
            <div style={{ width:60,height:60,borderRadius:"50%",backgroundImage:G.pink,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px",boxShadow:"0 8px 24px rgba(236,72,153,0.4)" }}>🚑</div>
            <div style={{ fontSize:22,fontWeight:800,color:C.white,marginBottom:6 }}>Welcome Back</div>
            <div style={{ fontSize:12.5,color:C.muted }}>Operations Director · MediFlow Platform</div>
          </div>
 
          {/* role badge */}
          <div style={{ display:"flex",justifyContent:"center",marginBottom:24 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:20,background:`${C.pink}18`,border:`1px solid ${C.pink}40`,boxShadow:`0 2px 12px rgba(236,72,153,0.15)` }}>
              <span style={{ fontSize:14 }}>🚑</span>
              <span style={{ fontSize:12.5,fontWeight:600,color:C.pink }}>Operations Director</span>
            </div>
          </div>
 
          {/* email */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6 }}>Email Address</label>
            <input type="email" placeholder="you@emergencies.com.sg" value={email} onChange={e=>setEmail(e.target.value)}
              style={{ width:"100%",background:"#172e50",border:`1px solid #2e5485`,borderRadius:9,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box" }} />
          </div>
 
          {/* password */}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6 }}>Password</label>
            <input type="password" placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)}
              style={{ width:"100%",background:"#172e50",border:`1px solid #2e5485`,borderRadius:9,padding:"11px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box" }} />
          </div>
 
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22 }}>
            <label style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.muted,cursor:"pointer" }}>
              <input type="checkbox" style={{ accentColor:C.pink }} /> Remember me
            </label>
            <span style={{ fontSize:12,color:C.pink,cursor:"pointer",fontWeight:500 }}>Forgot password?</span>
          </div>
 
          <button style={{ width:"100%",padding:"13px",borderRadius:10,backgroundImage:G.pink,color:"#fff",fontWeight:700,fontSize:14,border:"none",cursor:"pointer",letterSpacing:"0.03em",boxShadow:"0 6px 20px rgba(236,72,153,0.42)" }}>
            Sign In →
          </button>
 
          <div style={{ display:"flex",alignItems:"center",gap:10,margin:"20px 0 16px",color:C.muted,fontSize:11 }}>
            <div style={{ flex:1,height:1,background:"#2e5485" }} />
            <span>or continue with</span>
            <div style={{ flex:1,height:1,background:"#2e5485" }} />
          </div>
 
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:22 }}>
            {["🔑  Single Sign-On","📱  OTP / 2FA"].map(opt=>(
              <button key={opt} style={{ padding:"10px",borderRadius:9,background:"#172e50",border:`1px solid #2e5485`,color:C.sub,fontSize:12,cursor:"pointer",fontWeight:500 }}>{opt}</button>
            ))}
          </div>
 
          <div style={{ padding:"12px 14px",background:`${C.pink}12`,borderRadius:9,border:`1px solid ${C.pink}25` }}>
            <div style={{ fontSize:11,color:C.pink,fontWeight:600,marginBottom:3 }}>🔒 Secure Access</div>
            <div style={{ fontSize:11,color:C.muted,lineHeight:1.6 }}>All login activity is logged and monitored. Unauthorised attempts are reported to your administrator.</div>
          </div>
 
          <div style={{ textAlign:"center",marginTop:18,fontSize:11.5,color:C.muted }}>
            Need access? <span style={{ color:C.pink,cursor:"pointer",fontWeight:500 }}>Contact your administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
/* ── SHELL ── */
export default function App() {
  const [active,    setActive]    = useState("home");
  const [showLogin, setShowLogin] = useState(false);
 
  const scroll = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  };
 
  if (showLogin) return <LoginPage onBack={()=>setShowLogin(false)} />;
 
  return (
    <div style={{ background:C.bg,minHeight:"100vh",fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text }}>
      <Navbar active={active} onNav={scroll} onLogin={()=>setShowLogin(true)} />
      <div style={{ maxWidth:960,margin:"0 auto",padding:"0 32px" }}>
 
        <section id="home" style={{ paddingTop:40 }}>
          <div style={{ fontSize:28,fontWeight:800,color:C.white,marginBottom:4,textAlign:"left" }}>Home</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:28,textAlign:"left" }}>Welcome to Emergencies First Aid &amp; Rescue — MediFlow Platform</div>
          <Hero />
          <Services />
        </section>
 
        <section id="about" style={{ paddingTop:20 }}>
          <div style={{ fontSize:28,fontWeight:800,color:C.white,marginBottom:4 }}>About Us</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:28 }}>Our mission, values, and what drives us</div>
          <About />
        </section>
 
        <section id="contact" style={{ paddingTop:20,paddingBottom:60 }}>
          <div style={{ fontSize:28,fontWeight:800,color:C.white,marginBottom:4 }}>Contact Us</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:28 }}>Get in touch with our team — we're here to help</div>
          <Contact />
        </section>
 
      </div>
    </div>
  );
}