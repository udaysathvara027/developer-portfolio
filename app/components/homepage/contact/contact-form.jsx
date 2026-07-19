"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError((currentError) => ({ ...currentError, required: true }));
      toast.error("Please complete all fields.");
      return;
    } else if (!isValidEmail(userInput.email)) {
      setError((currentError) => ({ ...currentError, email: true }));
      toast.error("Please enter a valid email address.");
      return;
    } else {
      setError({ email: false, required: false });
    };

    try {
      setIsLoading(true);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        userInput,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.text || "Unable to send your message. Please try again.");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Contact with me</p>
      <p className="text-sm mb-5 text-[#d3d8e8]">{"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}</p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <div className="flex flex-col gap-4">
          <div className="relative pt-2">
            <input
              id="contact-name"
              className="peer h-14 w-full rounded-md border border-[#353a52] bg-[#10172d] px-4 pt-1 text-left outline-0 transition-all duration-300 focus:border-[#16f2b3]"
              type="text"
              maxLength="100"
              placeholder=" "
              required={true}
              onChange={(e) => {
                setUserInput({ ...userInput, name: e.target.value });
                setError((currentError) => ({ ...currentError, required: false }));
              }}
              value={userInput.name}
            />
            <label htmlFor="contact-name" className="pointer-events-none absolute left-4 top-[55%] -translate-y-1/2 bg-[#10172d] px-2 text-base text-gray-400 transition-all duration-200 peer-focus:left-4 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#16f2b3] peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-sm">
              Your Name
            </label>
          </div>

          <div className="relative pt-2">
            <input
              id="contact-email"
              className={`peer h-14 w-full rounded-md border bg-[#10172d] px-4 pt-1 outline-0 transition-all duration-300 ${error.email ? "border-red-400 focus:border-red-400" : "border-[#353a52] focus:border-[#16f2b3]"}`}
              type="email"
              maxLength="100"
              placeholder=" "
              required={true}
              value={userInput.email}
              onChange={(e) => {
                const email = e.target.value;
                setUserInput({ ...userInput, email });
                setError((currentError) => ({ ...currentError, email: Boolean(email) && !isValidEmail(email), required: false }));
              }}
              onBlur={() => {
                setError((currentError) => ({ ...currentError, email: Boolean(userInput.email) && !isValidEmail(userInput.email) }));
              }}
            />
            <label htmlFor="contact-email" className="pointer-events-none absolute left-4 top-[55%] -translate-y-1/2 bg-[#10172d] px-2 text-base text-gray-400 transition-all duration-200 peer-focus:left-4 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#16f2b3] peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-sm">
              Your Email
            </label>
            {error.email && <p className="mt-2 text-sm text-red-400">Please enter a valid email address.</p>}
          </div>

          <div className="relative pt-2">
            <textarea
              id="contact-message"
              className="peer w-full rounded-md border border-[#353a52] bg-[#10172d] px-4 pb-3 pt-7 text-left outline-0 transition-all duration-300 focus:border-[#16f2b3]"
              maxLength="500"
              name="message"
              placeholder=" "
              required={true}
              onChange={(e) => {
                setUserInput({ ...userInput, message: e.target.value });
                setError((currentError) => ({ ...currentError, required: false }));
              }}
              rows="4"
              value={userInput.message}
            />
            <label
              htmlFor="contact-message"
              className="pointer-events-none absolute left-4 top-9 -translate-y-1/2 bg-[#10172d] px-2 text-base text-gray-400 transition-all duration-200 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#16f2b3] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-sm"
            >
              Your Message
            </label>
          </div>
          <div className="flex flex-col items-center gap-3">
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              {
                isLoading ?
                  <span>Sending Message...</span> :
                  <span className="flex items-center gap-1">
                    Send Message
                    <TbMailForward size={20} />
                  </span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
