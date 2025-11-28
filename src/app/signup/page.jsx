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
        if (variables.reset) {
          variables.reset();
        }
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
    <div className="min-h-screen flex items-center justify-center bg-primary-gradient p-6 inter">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/70">
        {signupMutation.isLoading && <Loader />}
        <h2 className="poppins text-3xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white">Full Name</label>
            <input
              name="name"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-white">Email</label>
            <input
              name="email"
              type="email"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="example@mail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-white">Username</label>
            <input
              name="username"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="Username123"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-white">Password</label>
            <input
              name="password"
              type="password"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="******"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={signupMutation.isLoading}
            className="poppins w-full py-3 rounded-xl bg-white text-black font-semibold text-lg hover:bg-white/90 transition-all duration-300 cursor-pointer"
          >
            {signupMutation.isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white"></div>
          <span className="text-white text-sm">OR</span>
          <div className="flex-1 h-px bg-white"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="btn w-full bg-white text-black border-[#e5e5e5] flex items-center justify-center gap-2"
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
        <p className="text-center text-white font-light mt-6">
          Already have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-white hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
