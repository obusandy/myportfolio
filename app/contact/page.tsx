"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence, Variants } from "framer-motion";
import HackerNavbar from "@/components/HackerNavbar";
import {
  Mail,
  Linkedin,
  Twitter,
  Github,
  Send,
  LoaderCircle,
  Check,
} from "lucide-react";

// --- CONFIGURATION ---
const EMAIL = process.env.NEXT_MY_EMAIL;
const LINKEDIN_URL = process.env.NEXT_MY_LINKEDIN_URL;
const X_URL = process.env.NEXT_MY_X_URL;
const GITHUB_URL = process.env.NEXT_MY_GITHUB_URL;

// Type-safe environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = process.env
  .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;
// ---

// Removed the unused `FormState` type
type FormStatus = "idle" | "loading" | "success" | "error";

// Corrected the Variants type
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, ease: "easeInOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <EkiBackground />
      <HackerNavbar />
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={itemVariants}>
            <ContactForm />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ConnectWithMe />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

// === LEFT COLUMN COMPONENT ===
function ContactForm() {
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          ...form,
          from_name: form.user_name,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );
      setStatus("success");
      setForm({ user_name: "", user_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EMAILJS FAILED...", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  return (
    <div>
      <h3 className="text-3xl font-bold text-white">Contact Me</h3>
      <p className="mt-3 text-white/70">
        Have a project in mind or just want to say hi? Send me a message and
        lets talk.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <input
          type="text"
          name="user_name"
          value={form.user_name}
          onChange={update("user_name")}
          placeholder="Your Name"
          className="form-input"
          required
        />
        <input
          type="email"
          name="user_email"
          value={form.user_email}
          onChange={update("user_email")}
          placeholder="Your Email"
          className="form-input"
          required
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={update("subject")}
          placeholder="Subject"
          className="form-input"
          required
        />
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Your Message"
          className="form-input resize-none"
          required
        />
        <div>
          <button
            type="submit"
            disabled={status !== "idle"}
            className="form-button"
          >
            {status === "loading" && (
              <LoaderCircle size={18} className="animate-spin" />
            )}
            {status === "success" && <Check size={18} />}
            {status !== "loading" && status !== "success" && <Send size={18} />}
            <span className="ml-2.5">
              {status === "loading"
                ? "Sending..."
                : status === "success"
                ? "Message Sent!"
                : "Send Message"}
            </span>
          </button>
          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-rose-400"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

// === RIGHT COLUMN COMPONENT ===
function ConnectWithMe() {
  const socialLinks = [
    {
      icon: Linkedin,
      title: "Let's Connect",
      subtitle: "on LinkedIn",
      href: LINKEDIN_URL,
    },
    {
      icon: Twitter,
      title: "Follow Me",
      subtitle: "@SandraObunga",
      href: X_URL,
    },
    {
      icon: Github,
      title: "See My Code",
      subtitle: "@SandraObunga",
      href: GITHUB_URL,
    },
    {
      icon: Mail,
      title: "Send an Email",
      subtitle: "Direct to my inbox",
      href: `mailto:${EMAIL}`,
    },
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-white">Connect With Me</h3>
      <div className="mt-8 space-y-4">
        {socialLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card group"
          >
            <div className="social-icon-wrapper">
              <link.icon size={22} />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-white">{link.title}</p>
              <p className="text-sm text-white/60">{link.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Visual component to match the background of the reference site
function EkiBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1] bg-black"
      style={{
        backgroundImage: `
          radial-gradient(circle at 15% 25%, rgba(56, 191, 248, 0.2), transparent 35%),
          radial-gradient(circle at 85% 75%, rgba(14, 10, 26, 0.35), transparent 40%)
        `,
      }}
    />
  );
}
