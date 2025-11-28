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

  const inputClass =
    "input input-bordered w-full border border-[#39424e50] rounded-lg outline-none focus:ring focus:ring-primary focus:border-none";

  return (
    <div className="w-11/12 max-w-3xl mx-auto mt-12 p-8 rounded-3xl shadow-lg bg-base-100 dark:bg-base-200">
      <h1 className="poppins text-4xl font-extrabold mb-8 text-center text-primary-gradient">
        Contact Us
      </h1>

      {serverMessage && (
        <p
          className={`mb-6 font-semibold text-center ${
            serverMessage.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {serverMessage}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 inter">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className={inputClass}
            placeholder="Enter you name..."
          />
          {errors.name && (
            <p className="text-error mt-1">{errors.name.message}</p>
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
            className={inputClass}
            placeholder="Enter you email..."
          />
          {errors.email && (
            <p className="text-error mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            {...register("subject", { required: "Subject is required" })}
            className={inputClass}
            placeholder="Enter email subject..."
          />
          {errors.subject && (
            <p className="text-error mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows={5}
            className="textarea textarea-bordered w-full resize-none border border-[#39424e50] rounded-lg outline-none focus:ring focus:ring-primary focus:border-none"
            placeholder="Write your message..."
          />
          {errors.message && (
            <p className="text-error mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn w-full ${
            loading ? "btn-disabled" : "bg-primary-gradient"
          } bg-primary-gradient poppins text-white font-semibold rounded-md hover:opacity-85 transition-all duration-300`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
