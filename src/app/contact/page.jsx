"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    const emailData = { ...data, time: new Date().toLocaleString() };

    emailjs
      .send(
        "service_qacgh0d",
        "template_jvjtk14",
        emailData,
        "uGabjwwF3X2CncGfc"
      )
      .then(
        () => {
          setServerMessage("Your message has been sent successfully!");
          reset();
          setLoading(false);
          setTimeout(() => setServerMessage(""), 5000);
        },
        (error) => {
          setServerMessage("Failed to send message. Please try again.");
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Dynamic Header */}
      <div className="bg-slate-900 pt-32 pb-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Connect</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 poppins tracking-tight">
            Let's Start a <span className="text-primary-gradient">Conversation</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Have questions about our tech? Our experts are standing by to assist you with your digital transition.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Info Side */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 poppins">Information</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-primary shrink-0 shadow-sm border border-blue-100/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Dossier</h4>
                    <p className="text-slate-900 font-bold">support@techtrove.io</p>
                    <p className="text-slate-500 text-sm font-medium">response within 4hrs</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm border border-emerald-100/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">HQ Location</h4>
                    <p className="text-slate-900 font-bold">101 Silicon Valley Dr.</p>
                    <p className="text-slate-500 text-sm font-medium">Palo Alto, CA 94301</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 shadow-sm border border-amber-100/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Active Hours</h4>
                    <p className="text-slate-900 font-bold">Mon — Fri</p>
                    <p className="text-slate-500 text-sm font-medium">09:00 AM - 06:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
              {serverMessage && (
                <div className={`mb-8 p-4 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-2 ${serverMessage.includes("successfully") ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
                  {serverMessage.includes("successfully") && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {serverMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Identity</label>
                    <input
                      {...register("name", { required: "Identity is required" })}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                      placeholder="Full Name"
                    />
                    {errors.name && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Digital Address</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                      })}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                      placeholder="Email Address"
                    />
                    {errors.email && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Communication Type</label>
                  <input
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                    placeholder="Core Subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Dossier Details</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    rows={6}
                    className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 resize-none"
                    placeholder="Your detailed request..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Encrypting Dossier...
                    </>
                  ) : (
                    <>
                      Commence Transmission
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
