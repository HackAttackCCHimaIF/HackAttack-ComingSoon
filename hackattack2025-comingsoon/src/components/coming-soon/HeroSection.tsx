"use client";

import ReCAPTCHA from "react-google-recaptcha";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FloatingOrb } from "./planet/FloatingOrb";
import { motion } from "framer-motion";
import { toast } from "sonner";
import StarryBackground from "./planet/StarryBackground";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/notifyme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          token: captchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setEmail("");
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again (Hero).");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-start text-white overflow-hidden">
      {/* Background */}
      <Image
        src="/bg.svg"
        alt="background planet"
        fill
        className="absolute inset-0 w-full h-full object-cover -z-20 pointer-events-none select-none opacity-60"
        priority
      />

      {/* Starfield */}
      <StarryBackground count={25} />

      {/* Central content */}
      <div className="w-[95%] mx-auto z-10">
        <div className="container px-4 w-fit">
          <motion.div
            className="max-w-4xl flex flex-col gap-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="[@media(min-height:700px)]:mt-0 mt-14" />
            <p className="font-semibold text-lg tracking-tight text-gray-200">
              HackAttack2025
            </p>

            <motion.h1
              className="font-black uppercase font-koulen text-[8vh] leading-[7vh]
                sm:text-[10vh] sm:leading-[8vh]
                md:text-[12vh] md:leading-[9vh]
                lg:text-[14vh] lg:leading-[11vh]
                text-start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-br from-[#01A850] to-white text-transparent bg-clip-text">
                Coming
              </span>
              <br className="hidden [@media(min-height:700px)]:block" />
              <span> Soon!</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-gray-300 max-w-xl font-medium mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              An exciting collaboration between HIMA IF and CCI, bringing you
              one of the most anticipated hackathons of the year.
            </motion.p>

            {/* Floating Orbs */}
            <FloatingOrb
              type="planet3"
              color="#F9A318"
              className="absolute top-[60%] left-[20%] sm:left-[70%] sm:top-[30%] md:left-1/2 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 -z-10 pointer-events-none"
              animationProps={{
                initial: { opacity: 0.8, scale: 1, x: 0, y: 0 },
                animate: {
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.15, 1],
                  x: [0, 2, -1.5, 0],
                  y: [0, -2, 1.5, 0],
                },
                transition: {
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              }}
            />

            <div className="absolute w-[120px] h-[120px] top-[15%] right-[5%] sm:w-[140px] sm:h-[140px] sm:top-[20%] sm:right-[70%] md:w-[160px] md:h-[160px] md:top-[16%] md:right-[10%]lg:w-[180px] lg:h-[180px] lg:top-[15%] lg:right-[12%]xl:w-[200px] xl:h-[200px] xl:top-[16%] xl:right-[25%]">
              <FloatingOrb
                type="planet1"
                color="#047A3C"
                className="w-24 h-24 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animationProps={{
                  animate: {
                    x: [0, 5, -5, 0],
                    y: [0, -4, 4, 0],
                  },
                  transition: {
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  },
                  initial: {},
                }}
              />
            </div>

            <FloatingOrb
              type="planet2"
              color="#2F67B4"
              className="w-24 h-24 top-[60%] right-[5%] sm:top-[50%] sm:right-[10%] md:top-[45%] md:right-[12%] lg:top-[45%] lg:right-[14%] xl:top-[45%] xl:right-[15%] absolute"
              animationProps={{
                animate: {
                  x: [0, -6, 6, 0],
                  y: [0, 3, -3, 0],
                },
                transition: {
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
                initial: {},
              }}
            />

            {/* Email Input */}
            <motion.form
              onSubmit={handleSubmit}
              className="mt-6 w-full flex flex-col items-start gap-8 overflow-x-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-row gap-3 w-full items-center justify-center">
                <div className="rounded-full p-[4px] bg-gradient-to-r from-[#666666] to-[#FFFFFF]/15 w-full sm:flex-1 min-w-0">
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-6 bg-neutral-900/80 
                    text-base text-white placeholder:text-neutral-400 
                    border-none rounded-full backdrop-blur-[18px] 
                    shadow-[0px_0px_6px_0px_rgba(91,91,91,0.25)] 
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 
                    focus:ring-offset-2 focus:ring-offset-neutral-900"
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  className="rounded-full p-[3px] sm:p-[4px] bg-gradient-to-r from-[#01A850]/65 to-[#01A850]/70 shrink-0"
                  initial={{ opacity: 1, y: 20, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="group w-[120px] h-[42px] sm:w-[142px] sm:h-[44px] md:w-[160px] md:h-[48px]
                  bg-[#01A850]/10 border-none rounded-full text-white text-sm sm:text-base md:text-base
                    font-semibold backdrop-blur-[14px] sm:backdrop-blur-[18px] disabled:opacity-50 
                    disabled:cursor-not-allowed"
                  >
                    <motion.div
                      whileHover={isLoading ? { y: -2, scale: 1.03 } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {isLoading ? "Loading..." : "Notify me!"}
                    </motion.div>
                  </Button>
                </motion.div>
              </div>

              {/* reCAPTCHA */}
              <div className="mt-2 sm:mt-0">
                <ReCAPTCHA
                  sitekey="6LdqUn8rAAAAABWxsoXM75rs7dt65eZk4J9lTxj1"
                  ref={recaptchaRef}
                  onChange={(token) => setCaptchaToken(token)}
                  theme="dark"
                  className="scale-[0.9] sm:scale-100"
                />
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
