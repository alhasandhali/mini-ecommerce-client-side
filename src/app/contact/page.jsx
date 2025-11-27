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
        },
        (error) => {
          setServerMessage("Failed to send message. Please try again.");
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <div className="w-11/12 max-w-3xl mx-auto mt-12 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">
        Contact Us
      </h1>
      {serverMessage && (
        <p
          className={`mb-6 font-semibold text-center ${
            serverMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {serverMessage}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            {...register("subject", { required: "Subject is required" })}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.subject && (
            <p className="text-red-500 mt-1">{errors.subject.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows={5}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          {errors.message && (
            <p className="text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-semibold py-3 rounded-xl transition-transform duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
