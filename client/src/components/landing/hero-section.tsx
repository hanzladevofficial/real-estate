"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
export default function HeroSection() {
  return (
    <div className="relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
      >
        <div className="max-w-4xl mx-auto px-16 sm:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Find Your Perfect Place to Call Home.
          </h1>
          <p className="text-xl text-white mb-8">
            Explore a wide range of rentals thoughtfully matched to your unique
            needs.
          </p>
          <div className="flex justify-center">
            <Input
              type="text"
              value="City"
              onChange={() => {}}
              placeholder="Type a city, neighborhood, or street name"
              className={cn(
                `w-full max-w-lg rounded-none rounded-l-xl border-none !bg-white h-12`
              )}
            />
            <Button onClick={() => {}} className="bg-secondary-600 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-700 h-12 cursor-pointer">Search</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
