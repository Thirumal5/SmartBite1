import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  }, []);

  return <div className="text-white p-6">Logging out...</div>;
}
