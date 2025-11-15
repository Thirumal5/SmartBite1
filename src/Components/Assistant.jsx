import { useState } from "react";
export default function Assistant(){
  const [msgs,setMsgs] = useState([{from:"bot", text:"Hello! Ask me about food prediction, trends or signals."}]);
  const [text,setText] = useState("");
  const send = async ()=>{
    if(!text) return;
    setMsgs(m=>[...m,{from:"user", text}]);
    setText("");
   
    const res = await fetch((import.meta.env.VITE_BACKEND_URL||"http://localhost:5000") + "/api/chat", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({message:text})
    });
    if(res.ok){
      const j = await res.json();
      setMsgs(m=>[...m,{from:"bot", text: j.reply || "..." }]);
    } else {
      setMsgs(m=>[...m,{from:"bot", text: "Assistant unavailable." }]);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">AI Assistant</h1>
      <div className="p-4 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)] flex flex-col" style={{height: '60vh'}}>
        <div className="flex-1 overflow-auto space-y-3 mb-3">
          {msgs.map((m,i)=>(
            <div key={i} className={m.from==="user" ? "text-right" : ""}>
              <div className={`inline-block p-2 rounded ${m.from==="user" ? "bg-[var(--primary)] text-black" : "bg-[#ffffff10] text-white"}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white"/>
          <button onClick={send} className="px-4 py-2 rounded-xl bg-[var(--primary)] text-black">Send</button>
        </div>
      </div>
    </div>
  );
}
