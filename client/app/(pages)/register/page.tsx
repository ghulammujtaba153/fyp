"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { IconBrandGoogle, IconCamera } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import axios from "axios";
import upload from "@/utils/upload"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const router=useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadPromise = profilePic ? upload(profilePic) : Promise.resolve(null);
    
    const profilePicUrl = await toast.promise(uploadPromise, {
      loading: 'Uploading image...',
      success: 'Image uploaded successfully',
      error: 'Error uploading image'
    });

    const data = {
      ...formData,
      profile: profilePicUrl
    };

    const registerPromise = axios.post("http://localhost:5000/api/register", data);
    
    toast.promise(registerPromise, {
      loading: 'Registering user...',
      success: 'User registered successfully',
      error: 'Error registering user'
    });
    router.push("/login")
  };

  return (
    <div className="flex bg-black-100 py-[140px]">
      <motion.div initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 50 }} className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Cardio Hema Hub
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center mb-4 bg-black-default border rounded-full w-[100px] h-[100px] align-middle relative">
            {profilePicPreview ? (
              <img src={profilePicPreview} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <IconCamera className="w-10 h-10 text-gray-500 absolute" />
            )}
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="cursor-pointer opacity-0 absolute inset-0 z-10"
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Tyler" type="text" value={formData.firstName} onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Durden" type="text" value={formData.lastName} onChange={handleChange} />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleChange} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
          </LabelInputContainer>
          <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">
            Sign up &rarr;
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col space-y-4">
            <button  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="button">
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
        <p className="text-gray-200">Don't have an account? <a className="cursor-pointer" href="/login">Login</a></p>
      </motion.div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
