"use client";

import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const signupMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `https://techtrove-server-side.vercel.app/signup`,
        formData
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Signup successful! You can now log in.");
        router.push("/login");
      } else {
        toast.error(data.error || "Signup failed.");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Signup error occurred.");
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate(form);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-950 p-6 overflow-hidden inter">
      {/* Background visual elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full"></div>

      {signupMutation.isPending && <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center"><Loader /></div>}

      <div className="w-full max-w-md relative z-10 animate-fadeIn">
        {/* Back to Home */}
        <button
          onClick={() => router.push('/')}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Explorer Entrance
        </button>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
              <span className="text-white font-bold text-3xl poppins">T</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white poppins tracking-tight mb-2">
              Join Network
            </h2>
            <p className="text-slate-400 text-sm font-medium">Create your permanent digital identity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Identity</label>
              <input
                name="name"
                placeholder="Real Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Digital Address</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Archive Username</label>
              <input
                name="username"
                placeholder="Handle_123"
                value={form.username}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                required
              />
            </div>
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full py-5 mt-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              {signupMutation.isPending ? "Syncing..." : "Initialize Profile"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/5"></div>
            <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">Direct Sync</span>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google Protocol
          </button>

          <p className="text-center text-slate-500 font-medium mt-10 text-sm">
            Active member?{" "}
            <a
              href="/login"
              className="text-white font-bold hover:underline"
            >
              System Entry
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
