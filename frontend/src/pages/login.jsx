import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("fatima@test.com");
  const [password, setPassword] = useState("123456");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data?.message || "Login failed");
        return;
      }

      // token reçu
      localStorage.setItem("token", data.token);
      setMsg("✅ Login réussi ! Token sauvegardé.");
    } catch (err) {
      setMsg("Erreur réseau: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            style={{ width: "100%", padding: 8 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            style={{ width: "100%", padding: 8 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={{ padding: "10px 14px" }} type="submit">
          Login
        </button>
      </form>

      <p style={{ marginTop: 16 }}>{msg}</p>
    </div>
  );
}
