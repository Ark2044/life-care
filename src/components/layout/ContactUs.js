'use client'

import emailjs from "emailjs-com";
import { useRef, useState } from "react";

const sendEmail = (templateParams) => {
  emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
};

const ContactUs = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await sendEmail(form); // Call the sendEmail function

      alert("Thank you. I will get back to you as soon as possible.");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Ahh, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden w-full max-w-3xl mx-auto"
      id="contactus"
    >
      <div className="flex-1 xl:pr-8 w-full xl:w-2/3">
        <h3 className="text-3xl text-center font-bold mb-6">Contact Us</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <label className="flex flex-col">
            <span className="text-gray-800 font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-gray-200 py-3 px-4 placeholder-gray-500 text-gray-700 rounded-lg outline-none border border-gray-300"
              aria-required="true"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-gray-800 font-medium mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="bg-gray-200 py-3 px-4 placeholder-gray-500 text-gray-700 rounded-lg outline-none border border-gray-300"
              aria-required="true"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-gray-800 font-medium mb-2">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-gray-200 py-3 px-4 placeholder-gray-500 text-gray-700 rounded-lg outline-none border border-gray-300"
              aria-required="true"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 py-2 px-6 rounded-lg outline-none w-fit text-white font-semibold shadow-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
