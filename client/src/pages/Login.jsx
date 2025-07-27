import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SideLogo from "../assets/liblibRestBar.jpg";

function Login() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await login(form);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#39110c] to-[#f96815] px-4 py-8">
      <section className="flex flex-col-reverse md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full">
        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-black p-8 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-6"
            aria-label="Login form"
          >
            <header className="text-center">
              <h1 className="text-3xl font-bold text-yellow-300 mb-1">
                Sign-In
              </h1>
              <p className="text-sm text-gray-400">Sign in to your account</p>
            </header>

            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl border-2 border-[#39110c]">
              <i className="bxr  bxs-user-circle text-orange-500 mr-2 text-3xl"></i>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                value={form.username}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-gray-900 font-medium"
              />
            </div>

            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl border-2 border-[#39110c]">
              <i className="bxr  bxs-lock-keyhole text-orange-500 mr-2 text-3xl"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-gray-900 font-medium"
              />
              <i
                className={`bxr text-gray-500 ml-2 text-2xl ${
                  showPassword ? "bxs-eye" : "bxs-eye-slash"
                }`}
                onClick={togglePassword}
              ></i>
            </div>

            <div className="text-right">
              <NavLink to="#" className="text-sm text-white hover:underline">
                Forgot password?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-300 hover:bg-amber-400"
              } text-black font-bold py-2 rounded-xl transition`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Side Panel */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-white bg-gradient-to-tl from-[#39110c] to-[#f96815] p-8 text-center">
          <div>
            <h2 className="text-2xl font-semibold mb-2 leading-tight">
              Welcome to LIBLIB <br /> Resto Bar
            </h2>
            <p className="text-sm opacity-90">
              Please sign-in with your credentials.
            </p>
          </div>
          <img
            src={SideLogo}
            alt="Liblib Restobar Logo"
            className="mt-6 w-40 h-40 object-cover rounded-full shadow-lg border-4 border-white"
          />
        </div>
      </section>
    </main>
  );
}

export default Login;
