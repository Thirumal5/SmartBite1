import { useState } from "react";
import { User, Mail, Shield, Save, Camera } from "lucide-react";

export default function Profile() {
  const [name, setName] = useState("Thiru");
  const [email, setEmail] = useState("thiru@example.com");
  const [role, setRole] = useState("Admin");

  const saveProfile = () => {
    alert("Profile Updated Successfully ✔");
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold text-[var(--primary)] mb-8 tracking-wide">
        Profile Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="col-span-1 p-6 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-xl flex flex-col items-center hover:scale-105 transition">

          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-[#00e67620] flex items-center justify-center">
              <User size={60} className="text-[var(--primary)]" />
            </div>
            <div className="absolute bottom-2 right-2 p-2 bg-[var(--primary)] rounded-full cursor-pointer">
              <Camera size={18} className="text-black" />
            </div>
          </div>

          <div className="text-xl font-semibold mt-4">{name}</div>
          <div className="text-gray-400 text-sm">{email}</div>

          <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)]">
            <Shield size={18} className="text-[var(--primary)]" />
            <span className="text-gray-300 text-sm">{role}</span>
          </div>
        </div>

        <div className="col-span-2 p-6 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-xl">

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-6">
            Edit Your Details
          </h2>

          <div className="space-y-6">

            <div>
              <label className="text-sm text-gray-300">Full Name</label>
              <div className="flex items-center gap-3 mt-1 p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)]">
                <User size={18} className="opacity-70" />
                <input
                  className="bg-transparent w-full outline-none text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Email Address</label>
              <div className="flex items-center gap-3 mt-1 p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)]">
                <Mail size={18} className="opacity-70" />
                <input
                  type="email"
                  className="bg-transparent w-full outline-none text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Role</label>
              <select
                className="w-full mt-1 p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option className="bg-[#081017]" value="Admin">Admin</option>
                <option className="bg-[#081017]" value="Manager">Manager</option>
                <option className="bg-[#081017]" value="Staff">Staff</option>
              </select>
            </div>

          </div>

          <button
            onClick={saveProfile}
            className="mt-8 px-6 py-3 rounded-xl bg-[var(--primary)] text-black font-semibold flex items-center gap-2 hover:bg-[var(--primary-dark)] transition"
          >
            <Save size={18} />
            Save Changes
          </button>

        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox label="Total Entries" value="72" />
        <StatBox label="Average Waste" value="3.1 kg/day" />
        <StatBox label="Last Updated" value="2 hours ago" />
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-xl text-center hover:scale-105 transition">
      <div className="text-gray-400 text-sm">{label}</div>
      <div className="text-2xl font-bold text-[var(--primary)] mt-1">{value}</div>
    </div>
  );
}
