import { useState } from "react";
const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Home(){
  const today = new Date().toISOString().slice(0,10);
  const [date,setDate] = useState(today);
  const [mealType,setMealType] = useState("lunch");
  const [cooked,setCooked] = useState("");
  const [eaten,setEaten] = useState("");
  const [leftover,setLeftover] = useState("");
  const [msg,setMsg] = useState("");
  const [prediction,setPrediction] = useState(null);

  const save = async ()=>{
    try{
      const res = await fetch(`${BACKEND}/api/data`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ date, mealType, cooked: Number(cooked), eaten: Number(eaten), leftover: Number(leftover) })
      });
      if(res.ok) setMsg("Saved ✔️");
      else setMsg("Save failed");
    }catch(e){ setMsg("Network error"); }
  };

  const predict = async ()=>{
    try{
      const res = await fetch(`${BACKEND}/api/assess`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ date, cooked_today_guess: Number(cooked) })
      });
      const data = await res.json();
      setPrediction(data);
    }catch(e){
      setPrediction({ predicted_leftover: leftover || 0, suggested_cooking: Math.round((cooked||0)*0.9), risk_score:0.4, advice:"Fallback" });
    }
  };

  return (
    <div className="w-full text-white">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-6">Home</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--primary)] text-center">
          <div className="text-lg font-semibold">Total Cooked</div>
          <div className="text-3xl font-bold mt-2">--</div>
        </div>
        <div className="p-5 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--primary)] text-center">
          <div className="text-lg font-semibold">Total Eaten</div>
          <div className="text-3xl font-bold mt-2">--</div>
        </div>
        <div className="p-5 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--primary)] text-center">
          <div className="text-lg font-semibold">Total Waste</div>
          <div className="text-3xl font-bold mt-2">--</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h2 className="text-xl font-semibold text-[var(--primary)] mb-4">Enter Today's Data</h2>
          <label className="block mb-2">Date</label>
          <input type="date" className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white mb-4" value={date} onChange={e=>setDate(e.target.value)} />
          <label className="block mb-2">Meal Type</label>
          <select className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white mb-4" value={mealType} onChange={e=>setMealType(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snack">Snack</option>
            <option value="dinner">Dinner</option>
          </select>
          <label className="block mb-2">Cooked</label>
          <input type="number" className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white mb-4" value={cooked} onChange={e=>setCooked(e.target.value)} />
          <label className="block mb-2">Eaten</label>
          <input type="number" className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white mb-4" value={eaten} onChange={e=>setEaten(e.target.value)} />
          <label className="block mb-2">Leftover</label>
          <input type="number" className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white mb-4" value={leftover} onChange={e=>setLeftover(e.target.value)} />

          <div className="flex gap-3">
            <button className="flex-1 bg-[var(--primary)] text-black py-2 rounded-xl" onClick={save}>Save</button>
            <button className="flex-1 bg-[var(--primary-soft)] text-black py-2 rounded-xl" onClick={predict}>Predict</button>
          </div>

          {msg && <p className="mt-3 text-[var(--primary-soft)]">{msg}</p>}
        </div>

        <div className="p-6 rounded-xl bg-[var(--glass)] border border-[var(--glass-border)]">
          <h2 className="text-xl font-semibold text-[var(--primary)] mb-4">AI Prediction</h2>
          {!prediction && <div className="opacity-60">No prediction yet</div>}
          {prediction && (
            <div className="space-y-3">
              <div><strong>Predicted Leftover:</strong> {prediction.predicted_leftover}</div>
              <div><strong>Suggested Cooking:</strong> {prediction.suggested_cooking}</div>
              <div><strong>Risk:</strong> {(prediction.risk_score*100).toFixed(0)}%</div>
              <div className="bg-[#ffffff10] p-3 rounded-xl">{prediction.advice}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
