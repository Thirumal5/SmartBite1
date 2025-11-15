import { useState } from "react";
import { Bell, Shield, User, Globe, Database, Save } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    alerts: true,
    dailySummary: false,
    aiMode: "hybrid",
    theme: "dark",
    weatherAPI: true,
    newsAPI: true,
    autoDelete: false
  });

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const changeValue = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveAll = () => {
    alert("Settings Updated ✔");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold text-[var(--primary)] mb-8 tracking-wide">
        Settings
      </h1>

      <div className="space-y-8">

        <Section title="Profile Settings" icon={<User className="text-[var(--primary)]" />}>
          <Row label="Change Name" value="Update your full name" />
          <Row label="Change Email" value="Update your email" />
          <Row label="Change Password" value="Reset or update your password" />
        </Section>

        <Section title="Notifications" icon={<Bell className="text-[var(--primary)]" />}>
          <ToggleRow
            label="Smart Alerts"
            sub="Notify when waste is high"
            value={settings.alerts}
            onClick={() => toggle("alerts")}
          />
          <ToggleRow
            label="Daily Summary"
            sub="Get daily food insight report"
            value={settings.dailySummary}
            onClick={() => toggle("dailySummary")}
          />
        </Section>

        <Section title="AI Assistant" icon={<Shield className="text-[var(--primary)]" />}>
          <SelectRow
            label="AI Mode"
            value={settings.aiMode}
            options={[
              { value: "simple", label: "Simple Model" },
              { value: "weighted", label: "Weighted Model" },
              { value: "hybrid", label: "Hybrid AI (Recommended)" }
            ]}
            onChange={(v) => changeValue("aiMode", v)}
          />

          <SelectRow
            label="Theme"
            value={settings.theme}
            options={[
              { value: "dark", label: "Dark (Default)" },
              { value: "light", label: "Light" },
              { value: "neon", label: "Neon Glow" }
            ]}
            onChange={(v) => changeValue("theme", v)}
          />
        </Section>

        <Section title="External APIs" icon={<Globe className="text-[var(--primary)]" />}>
          <ToggleRow
            label="Weather API"
            sub="Use live OpenWeather data"
            value={settings.weatherAPI}
            onClick={() => toggle("weatherAPI")}
          />

          <ToggleRow
            label="News API"
            sub="Use real trending news data"
            value={settings.newsAPI}
            onClick={() => toggle("newsAPI")}
          />
        </Section>

        <Section title="Data Management" icon={<Database className="text-[var(--primary)]" />}>
          <ToggleRow
            label="Auto Delete Old Data"
            sub="Remove entries older than 6 months"
            value={settings.autoDelete}
            onClick={() => toggle("autoDelete")}
          />
        </Section>

        <div className="flex justify-end pt-4">
          <button
            onClick={saveAll}
            className="px-6 py-3 rounded-xl bg-[var(--primary)] text-black font-semibold flex items-center gap-2 hover:bg-[var(--primary-dark)] transition"
          >
            <Save size={18} /> Save All Settings
          </button>
        </div>

      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="p-6 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-bold text-[var(--primary)]">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-[var(--glass-border)]">
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-gray-400 text-sm">{value}</div>
      </div>
    </div>
  );
}

function ToggleRow({ label, sub, value, onClick }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--glass-border)]">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-gray-400 text-sm">{sub}</div>
      </div>

      <div
        onClick={onClick}
        className={`w-12 h-6 rounded-full cursor-pointer transition flex items-center 
          ${value ? "bg-[var(--primary)]" : "bg-gray-600"}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow transform transition 
            ${value ? "translate-x-6" : "translate-x-1"}`}
        />
      </div>
    </div>
  );
}

function SelectRow({ label, value, options, onChange }) {
  return (
    <div className="py-2 border-b border-[var(--glass-border)]">
      <div className="text-sm mb-1 text-gray-300">{label}</div>

      <select
        className="w-full p-3 rounded-xl bg-[#ffffff10] border border-[var(--glass-border)] text-white outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#081017]">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
