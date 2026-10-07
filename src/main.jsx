
import React,{useRef,useState} from "react";
import {createRoot} from "react-dom/client";
import {motion,useMotionValueEvent,useScroll,useSpring,useTransform} from "framer-motion";
import "./styles.css";

const M="/mentor/";
const SCENES=["Welcome","Mentor","Practice","Progress","Ecosystem","Stories","Journey"];

function Btn({children,primary=false,href="#journey"}){
  return <motion.a className={`btn ${primary?"primary":""}`} href={href} whileHover={{y:-3,scale:1.015}} whileTap={{scale:.985}}>{children}</motion.a>
}
function Eyebrow({children,light=false}){return <span className={`eyebrow ${light?"light":""}`}>{children}</span>}
const POSE_MOTIONS = {
  hero: {
    initial: { opacity: 0, x: 75, y: 22, scale: 0.94 },
    animate: {
      opacity: 1,
      x: [0, -4, 0],
      y: [0, -8, 0],
      rotate: [-0.6, 0.6, -0.6],
      scale: [1, 1.012, 1]
    },
    transition: {
      x: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
      y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
      scale: { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
    }
  },
  explain: {
    initial: { opacity: 0, x: -32, y: 16, scale: 0.94 },
    animate: {
      opacity: 1,
      x: [0, 4, 0],
      y: [0, -7, 0],
      rotate: [-1, 0.4, -1],
      scale: [1, 1.01, 1]
    },
    transition: {
      x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.85 },
      y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
      scale: { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
    }
  },
  point: {
    initial: { opacity: 0, x: 35, y: 20, scale: 0.94 },
    animate: {
      opacity: 1,
      x: [0, -10, 0],
      y: [0, -8, 0],
      rotate: [-1.8, -0.4, -1.8],
      scale: [1, 1.014, 1]
    },
    transition: {
      x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.8 },
      y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 4.6, repeat: Infinity, ease: "easeInOut" },
      scale: { duration: 4.6, repeat: Infinity, ease: "easeInOut" }
    }
  },
  think: {
    initial: { opacity: 0, y: 22, scale: 0.94 },
    animate: {
      opacity: 1,
      y: [0, -6, 0],
      rotate: [-1.5, 0.4, -1.5],
      scale: [1, 1.008, 1]
    },
    transition: {
      y: { duration: 5.4, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 5.4, repeat: Infinity, ease: "easeInOut" },
      scale: { duration: 5.4, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 0.85 }
    }
  },
  cta: {
    initial: { opacity: 0, y: 26, scale: 0.93 },
    animate: {
      opacity: 1,
      y: [0, -10, 0],
      rotate: [-0.6, 0.8, -0.6],
      scale: [1, 1.016, 1]
    },
    transition: {
      y: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
      scale: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
      opacity: { duration: 0.85 }
    }
  }
};

function Mentor({pose,style,className=""}){
  const motionPreset = POSE_MOTIONS[pose] || POSE_MOTIONS.hero;
  return <div className={`mentor ${className}`} style={style}>
    <motion.img
      className="mentor-human-img"
      src={`${M}${pose}.png`}
      alt="AI CSAT mentor"
      draggable="false"
      initial={motionPreset.initial}
      animate={motionPreset.animate}
      transition={motionPreset.transition}
      whileHover={{scale:1.025,y:-4,transition:{duration:0.3}}}
    />
    <div className="mentor-aura"/>
  </div>
}
function sceneTrack(p,a,b,isFirst=false){
  const opacity = isFirst
    ? useTransform(p, [0, b - 0.045, b], [1, 1, 0])
    : useTransform(p, [a, a + 0.045, b - 0.045, b], [0, 1, 1, 0]);
  const y = isFirst
    ? useTransform(p, [0, b], [0, -24])
    : useTransform(p, [a, b], [30, -24]);
  const scale = useTransform(p, [a, b], [.985, .996]);
  return {opacity,y,scale};
}
function Bar({label,width}){return <div><span>{label}</span><i style={{width}}/></div>}
function App(){
 const ref=useRef(null);
 const {scrollYProgress:raw}=useScroll({target:ref,offset:["start start","end end"]});
 const p=useSpring(raw,{stiffness:80,damping:24,mass:.3});
 const [active,setActive]=useState(0);
 useMotionValueEvent(p,"change",v=>setActive(Math.min(6,Math.floor(v*7))));
 const bgScale=useTransform(p,[0,1],[1,1.13]);
 const bgY=useTransform(p,[0,1],[0,-22]);

 const hero=sceneTrack(p,0,.15,true);
 const mentor=sceneTrack(p,.135,.30);
 const practice=sceneTrack(p,.285,.445);
 const progress=sceneTrack(p,.43,.59);
 const eco=sceneTrack(p,.575,.735);
 const stories=sceneTrack(p,.72,.87);
 const journey=sceneTrack(p,.855,1);

 return <div ref={ref} className="app">
   <header className="nav">
     <a className="brand"><span className="logo">✦</span>CSAT Mentor</a>
     <nav>{["Features","How It Works","PYQs","Progress"].map(x=><a key={x}>{x}</a>)}</nav>
     <Btn primary>Get Started →</Btn>
   </header>

   <div className="story-index"><b>0{active+1}</b><span>/ 07</span><div>{SCENES.map((s,i)=><i key={s} className={i===active?"on":""}/>)}</div></div>

   <main className="story">
     <div className="stage">
       <motion.div className="global-bg" style={{scale:bgScale,y:bgY}}/>
       <motion.div className="global-halo" style={{x:useTransform(p,[0,1],["0%","18%"])}}/>

       <motion.section 
         className="scene hero-scene" 
         style={hero}
         initial={{ opacity: 0, y: 32, scale: 0.985 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
       >
         <motion.div 
           className="hero-copy" 
           style={{opacity:useTransform(p,[0,.07,.145],[1,1,0]),y:useTransform(p,[0,.17],[0,-70])}}
           initial={{ opacity: 0, y: 28 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
         >
           <Eyebrow>AI-powered CSAT preparation for UPSC</Eyebrow>
           <h1>Your Personal<br/><span className="gradient">CSAT Mentor</span></h1>
           <p>Practice smarter. Understand deeper. Improve faster — with a real-person AI mentor that explains, hints, adapts and remembers how you learn.</p>
           <div className="actions"><Btn primary>Start Learning →</Btn><Btn>◉ Watch Demo</Btn></div>
           <div className="hero-stats"><div><b>14+ Years</b><span>PYQs</span></div><div><b>Personalised</b><span>Guidance</span></div><div><b>Adaptive</b><span>Practice</span></div><div><b>Detailed</b><span>Analytics</span></div></div>
         </motion.div>
         <motion.div 
           className="hero-person" 
           style={{x:useTransform(p,[0,.17,.35,.68,1],[0,-5,-85,-45,0]),y:useTransform(p,[0,.35,.8],[0,18,0]),scale:useTransform(p,[0,.17,.35,.68,1],[1,.98,.82,.86,1.02])}}
         >
           <Mentor pose="hero"/>
           <motion.div 
             className="scribble" 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1, rotate: [-2, 1, -2] }}
             transition={{ opacity: { duration: 0.6, delay: 0.65 }, scale: { duration: 0.6, delay: 0.65 }, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
           >
             Let's crack<br/>CSAT together <span>↘</span>
           </motion.div>
         </motion.div>
         <motion.div 
           className="hero-chat glass" 
           style={{opacity:useTransform(p,[.015,.065,.145],[0,1,0]),x:useTransform(p,[.015,.075,.15],[85,0,-25])}}
           initial={{ opacity: 0, x: 45 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
         >
           <div className="chat-head"><img src={`${M}hero.png`} alt=""/><div><b>CSAT Mentor</b><small>Online · ready to help</small></div><i/></div>
           <div className="bubble user">How do I approach Data Interpretation?</div><div className="bubble">Let's slow it down. First identify the trend, then choose the quickest method.</div>
           <div className="chip-row"><span>Give me a hint</span><span>Explain approach</span></div>
         </motion.div>
       </motion.section>

       <motion.section className="scene" style={mentor}>
         <motion.div className="split-copy" style={{opacity:mentor.opacity,x:useTransform(p,[.135,.22,.30],[-65,0,28])}}>
           <Eyebrow>It’s like having a mentor beside you</Eyebrow>
           <h2>Ask. Understand.<br/><span className="gradient">Improve.</span></h2>
           <p>Hints, explanations and the right approach — exactly when you need them.</p>
           <div className="feature-list">
             <div><b>✦</b><span><strong>Ask anything</strong><small>No awkward questions. Just ask.</small></span></div>
             <div><b>◌</b><span><strong>Get hints</strong><small>Learn without being handed the answer.</small></span></div>
             <div><b>↗</b><span><strong>Step-by-step</strong><small>See the reasoning, not just the result.</small></span></div>
             <div><b>◎</b><span><strong>Analyse mistakes</strong><small>Turn wrong answers into progress.</small></span></div>
           </div>
         </motion.div>
         <motion.div className="mentor-scene-person" style={{opacity:mentor.opacity,x:useTransform(p,[.135,.23,.30],[-75,0,35]),scale:useTransform(p,[.135,.23,.30],[.88,1,.95])}}>
           <Mentor pose="explain"/><div className="scribble small">I’ll show you<br/>the logic. ↙</div>
         </motion.div>
         <motion.div className="chat-window glass" style={{opacity:mentor.opacity,x:useTransform(p,[.135,.22,.30],[100,0,-35]),rotateY:useTransform(p,[.135,.22,.30],[-10,0,3])}}>
           <div className="window-top"><b>CSAT Mentor</b><span>•••</span></div>
           <div className="window-user">I'm confused about this question. Can you explain the approach?</div>
           <div className="window-ai">Of course. Let's break it down step by step.</div>
           <div className="approach"><b>Approach</b><div><em>01</em> Understand the question</div><div><em>02</em> Identify key information</div><div><em>03</em> Apply the right concept</div><div><em>04</em> Eliminate weak options</div></div>
           <div className="fake-input">Ask anything about CSAT <span>→</span></div>
         </motion.div>
       </motion.section>

       <motion.section className="scene" style={practice}>
         <motion.div className="practice-copy" style={{opacity:practice.opacity,x:useTransform(p,[.285,.37,.445],[60,0,-30])}}>
           <Eyebrow>Experience real CSAT practice</Eyebrow>
           <h2>Real Questions.<br/><span className="gradient">Real Explanations.</span></h2>
           <p>PYQs, timed practice, smart hints and a mentor who teaches you how to think.</p>
           <div className="practice-tabs"><span className="active">▣ PYQ Practice</span><span>◌ Topic Tests</span><span>◌ Mocks</span></div>
         </motion.div>
         <motion.div className="question-card" style={{opacity:practice.opacity,x:useTransform(p,[.285,.38,.445],[170,0,-55]),rotateY:useTransform(p,[.285,.38,.445],[-13,0,5]),scale:useTransform(p,[.285,.38,.445],[.9,1,.95])}}>
           <div className="q-top"><span>CSAT · PYQ 2022</span><b>02:15</b></div><h3>A train 120 m long is running at a speed of 72 km/h. In what time will it cross a platform 180 m long?</h3>
           <div className="answers"><span>A <b>12 sec</b></span><span className="chosen">B <b>15 sec</b></span><span>C <b>18 sec</b></span><span>D <b>20 sec</b></span></div>
           <Btn primary>Submit Answer →</Btn><div className="answer-note"><b>Mentor hint:</b> Start with the total distance.</div>
         </motion.div>
         <motion.div className="practice-person" style={{opacity:practice.opacity,x:useTransform(p,[.285,.38,.445],[100,0,-20]),scale:useTransform(p,[.285,.38,.445],[.9,1,.94])}}>
           <Mentor pose="point"/><div className="hint-card glass"><span>✦</span><div><b>Hint</b><small>Start with the total distance.</small></div></div>
         </motion.div>
       </motion.section>

       <motion.section className="scene" style={progress}>
         <motion.div className="progress-copy" style={{opacity:progress.opacity,x:useTransform(p,[.43,.51,.59],[-65,0,30])}}>
           <Eyebrow>Your progress, personalised</Eyebrow><h2>Know your strengths.<br/><span className="gradient">Fix weak areas.</span></h2><p>Your mentor studies every answer and turns performance into your next best study move.</p><Btn primary>View Detailed Analytics →</Btn>
         </motion.div>
         <motion.div className="analytics glass" style={{opacity:progress.opacity,x:useTransform(p,[.43,.51,.59],[90,0,-35]),scale:useTransform(p,[.43,.51,.59],[.9,1,.95])}}>
           <div className="analytics-title"><b>Performance Overview</b><small>Last 30 days</small></div>
           <div className="analytics-grid"><div className="ring"><strong>78%</strong><span>Accuracy</span></div><div className="bar-list"><Bar label="Number System" width="85%"/><Bar label="Ratio & Proportion" width="72%"/><Bar label="Time & Work" width="45%"/><Bar label="Data Interpretation" width="82%"/></div></div>
           <div className="study-plan"><b>Your Study Plan</b><span>✓ Focus on weak topics</span><span>✓ Practice targeted questions</span><span>✓ Revise key concepts</span><span>✓ Attempt a mock this week</span></div>
         </motion.div>
         <motion.div className="progress-person" style={{opacity:progress.opacity,x:useTransform(p,[.43,.52,.59],[70,0,-25]),scale:useTransform(p,[.43,.52,.59],[.92,1,.95])}}>
           <Mentor pose="think"/><div className="stat one">81%<small>Accuracy</small></div><div className="stat two">347+<small>Questions</small></div><div className="stat three">12d<small>Study streak</small></div>
         </motion.div>
       </motion.section>

       <motion.section className="scene light-scene" style={eco}>
         <motion.div className="ecosystem-heading" style={{opacity:eco.opacity,y:useTransform(p,[.575,.65,.735],[35,0,-24])}}>
           <Eyebrow light>Everything in one place</Eyebrow><h2>More than practice —<br/>a complete CSAT ecosystem.</h2><p>Learn, practise, analyse and improve in one connected experience.</p>
         </motion.div>
         <motion.div className="ecosystem-grid" style={{opacity:eco.opacity,y:useTransform(p,[.575,.66,.735],[50,0,-30])}}>
           {[["14+ Years of PYQs","Topic-wise questions with detailed solutions.","▣"],["Adaptive Practice","Questions adjust to your current level.","◉"],["AI Mentor","Hints, explanations and smart strategies.","✦"],["Personalised Plan","A plan built around your strengths.","↗"]].map(([t,s,i])=>
            <motion.div className="eco-card" key={t} whileHover={{y:-7,scale:1.015}}><span className="eco-icon">{i}</span><b>{t}</b><small>{s}</small><i>↗</i></motion.div>
           )}
         </motion.div>
         <motion.div className="ecosystem-person" style={{opacity:eco.opacity,x:useTransform(p,[.575,.66,.735],[70,0,-25])}}><Mentor pose="cta"/></motion.div>
       </motion.section>

       <motion.section className="scene stories-scene" style={stories}>
         <motion.div className="stories-head" style={{opacity:stories.opacity,y:useTransform(p,[.72,.79,.87],[30,0,-18])}}>
           <Eyebrow>Loved by UPSC aspirants</Eyebrow><h2>Real students.<br/><span className="gradient">Real progress.</span></h2><p>Clear guidance matters most when the exam pressure is real.</p>
         </motion.div>
         <motion.div className="testimonials" style={{opacity:stories.opacity,y:useTransform(p,[.725,.80,.87],[45,0,-25])}}>
          {[["“The explanations are clear and easy to understand.”","Ananya S.","UPSC Aspirant"],["“It feels like a real teacher — not just an answer engine.”","Rohit K.","UPSC Aspirant"],["“Adaptive practice keeps me focused on my weak areas.”","Meera T.","UPSC Aspirant"]].map(([q,n,r])=>
            <motion.article className="testimonial" key={n} whileHover={{y:-7,scale:1.01}}><div className="stars">★★★★★</div><p>{q}</p><div className="person-line"><span>{n[0]}</span><div><b>{n}</b><small>{r}</small></div></div></motion.article>
          )}
         </motion.div>
       </motion.section>

       <motion.section className="scene journey-scene" id="journey" style={journey}>
         <motion.div className="journey-bg" style={{opacity:journey.opacity}}/>
         <motion.div className="journey-copy" style={{opacity:journey.opacity,y:useTransform(p,[.855,1],[55,0])}}>
           <Eyebrow>Your journey starts here</Eyebrow><h2>Stop Preparing<br/><span className="gradient">Alone.</span></h2><p>Meet your personal CSAT Mentor — explanations when you're stuck, practice when you're ready, and a plan that changes with you.</p>
           <div className="actions"><Btn primary>Start Your CSAT Journey →</Btn><Btn>◉ Watch Demo</Btn></div><div className="trust"><span>◉ No credit card required</span><span>✓ Free plan available</span><span>◌ Cancel anytime</span></div>
         </motion.div>
         <motion.div className="journey-person" style={{opacity:journey.opacity,x:useTransform(p,[.855,1],[100,0]),scale:useTransform(p,[.855,1],[.9,1])}}><Mentor pose="cta"/></motion.div>
       </motion.section>
     </div>
   </main>

   <footer className="footer">CSAT Mentor · Personalised CSAT preparation for serious UPSC aspirants.</footer>
 </div>;
}
createRoot(document.getElementById("root")).render(<App/>);
