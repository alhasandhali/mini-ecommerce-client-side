"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.error) {
      setMessage("Invalid email or password.");
    } else {
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    // Sign in with Google, redirect after login
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {message && <p className="text-red-300 text-center mb-4">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-white font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="text-white font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-indigo-600 font-semibold text-lg hover:bg-white/90 transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-white/80">OR</div>

        {/* Google Login Button (UI Only) */}
        <button
          onClick={handleGoogleLogin}
          className="btn w-full bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className="text-center text-white/70 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-white hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
