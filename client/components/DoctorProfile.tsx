"use client";
import React, { useState } from "react";
import { IconCamera } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import axios from "axios";
import upload from "@/utils/upload"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/apiConfig";

export default function DoctorProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "doctor",
    dateOfBirth: "",
    contactNumber: "",
    postalAddress: "",
    permanentAddress: "",
    specialization: "",
    doctor_qualification: [
      { qualificationName: "", startYear: "", endYear: "" },
      { qualificationName: "", startYear: "", endYear: "" }
    ],
    availability: { startTime: "", endTime: "" }
  });

  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    // Validate all fields including availability
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!formData.postalAddress) newErrors.postalAddress = "Postal Address is required";
    if (!formData.permanentAddress) newErrors.permanentAddress = "Permanent Address is required";
    if (!formData.specialization) newErrors.specialization = "Specialization is required";
    if (!formData.availability.startTime) newErrors.startTime = "Start Time is required";
    if (!formData.availability.endTime) newErrors.endTime = "End Time is required";

    formData.doctor_qualification.forEach((qual, index) => {
      if (!qual.qualificationName) newErrors[`qualificationName${index}`] = "Qualification Name is required";
      if (!qual.startYear) newErrors[`startYear${index}`] = "Start Year is required";
      if (!qual.endYear) newErrors[`endYear${index}`] = "End Year is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleAvailabilityChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      availability: {
        ...prevState.availability,
        [id]: value
      }
    }));
  };

  const handleQualificationChange = (index, e) => {
    const { id, value } = e.target;
    const newQualifications = [...formData.doctor_qualification];
    newQualifications[index][id] = value;
    setFormData(prevState => ({
      ...prevState,
      doctor_qualification: newQualifications
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const uploadPromise = profilePic ? upload(profilePic) : Promise.resolve(null);

    try {
      const profilePicUrl = await toast.promise(uploadPromise, {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully',
        error: 'Error uploading image'
      });

      const data = {
        ...formData,
        profile: profilePicUrl
      };

      await toast.promise(
        axios.post(`${API_BASE_URL}/doctors/register`, data),
        {
          loading: 'Registering doctor...',
          success: 'Doctor registered successfully',
          error: 'Error registering doctor'
        }
      );

      router.push("/admin");
    } catch (error) {
      console.error('Error:', error);
      toast.error('Registration failed');
    }
  };

  return (
    <div className="flex bg-black-100 py-[140px]">
      <motion.div 
        initial={{ x: "-100vw" }} 
        animate={{ x: 0 }} 
        transition={{ type: "spring", stiffness: 50 }} 
        className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Register Doctor
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

          {/* Personal Information Fields */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Tyler" type="text" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Durden" type="text" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </LabelInputContainer>
          </div>

          {/* Email, Password, and Date of Birth Fields */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" placeholder="YYYY-MM-DD" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          </LabelInputContainer>

          {/* Contact Information Fields */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" placeholder="123-456-7890" type="tel" value={formData.contactNumber} onChange={handleChange} />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="postalAddress">Postal Address</Label>
            <Input id="postalAddress" placeholder="1234 Paper St." type="text" value={formData.postalAddress} onChange={handleChange} />
            {errors.postalAddress && <p className="text-red-500 text-sm">{errors.postalAddress}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            <Input id="permanentAddress" placeholder="5678 Solid Ln." type="text" value={formData.permanentAddress} onChange={handleChange} />
            {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress}</p>}
          </LabelInputContainer>

          {/* Specialization and Qualification Fields */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="specialization">Specialization</Label>
            <Input id="specialization" placeholder="Cardiology" type="text" value={formData.specialization} onChange={handleChange} />
            {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
          </LabelInputContainer>
          <h3 className="font-bold text-lg mb-2 text-white">Qualifications</h3>
          {formData.doctor_qualification.map((qual, index) => (
            <div key={index} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor={`qualificationName${index}`}>Qualification Name</Label>
                <Input id="qualificationName" placeholder="MD" type="text" value={qual.qualificationName} onChange={(e) => handleQualificationChange(index, e)} />
                {errors[`qualificationName${index}`] && <p className="text-red-500 text-sm">{errors[`qualificationName${index}`]}</p>}
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor={`startYear${index}`}>Start Year</Label>
                <Input id="startYear" placeholder="2010" type="text" value={qual.startYear} onChange={(e) => handleQualificationChange(index, e)} />
                {errors[`startYear${index}`] && <p className="text-red-500 text-sm">{errors[`startYear${index}`]}</p>}
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor={`endYear${index}`}>End Year</Label>
                <Input id="endYear" placeholder="2014" type="text" value={qual.endYear} onChange={(e) => handleQualificationChange(index, e)} />
                {errors[`endYear${index}`] && <p className="text-red-500 text-sm">{errors[`endYear${index}`]}</p>}
              </LabelInputContainer>
            </div>
          ))}

          {/* Availability Fields */}
          <h3 className="font-bold text-lg mb-2 text-white">Availability</h3>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" placeholder="09:00 AM" type="time" value={formData.availability.startTime} onChange={handleAvailabilityChange} />
              {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" placeholder="05:00 PM" type="time" value={formData.availability.endTime} onChange={handleAvailabilityChange} />
              {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
            </LabelInputContainer>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Register Doctor
          </button>
        </form>
      </motion.div>
    </div>
  );
}

const LabelInputContainer = ({ children }) => (
  <div className="w-full">
    {children}
  </div>
);
