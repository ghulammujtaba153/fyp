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

interface Qualification {
  qualificationName: string;
  startYear: string;
  endYear: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  dateOfBirth: string;
  contactNumber: string;
  postalAddress: string;
  permanentAddress: string;
  specialization: string;
  doctor_qualification: Qualification[];
  availability: {
    startTime: string;
    endTime: string;
  };
}

interface Errors {
  [key: string]: string;
}

export default function DoctorProfile() {
  const [formData, setFormData] = useState<FormData>({
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

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Errors = {};
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      availability: {
        ...prevState.availability,
        [id]: value
      }
    }));
  };

  const handleQualificationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newQualifications = [...formData.doctor_qualification];
    newQualifications[index][id] = value;
    setFormData((prevState) => ({
      ...prevState,
      doctor_qualification: newQualifications
    }));
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const uploadPromise = profilePic ? upload(profilePic) : Promise.resolve(null);

    try {
      const profilePicUrl = await toast.promise(uploadPromise, {
        loading: "Uploading image...",
        success: "Image uploaded successfully",
        error: "Error uploading image"
      });

      const data = {
        ...formData,
        profile: profilePicUrl
      };

      await toast.promise(
        axios.post(`${API_BASE_URL}/doctors/register`, data),
        {
          loading: "Registering doctor...",
          success: "Doctor registered successfully",
          error: "Error registering doctor"
        }
      );

      router.push("/admin");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex py-[50px]">
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        className="bg-white text-black max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <h2 className="font-bold text-xl mb-2">Register Doctor</h2>
        <form className="my-8" onSubmit={handleSubmit} className="text-black-default">
          <div className="flex items-center justify-center mb-4 border rounded-full w-[100px] h-[100px] align-middle relative">
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
            <LabelInputContainer >
              <Label htmlFor="firstName" style={{ color: 'black' }}>
                First name
              </Label>
              <Input id="firstName" placeholder="Tyler" type="text" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName" style={{ color: 'black' }}>
                Last name
              </Label>
              <Input id="lastName" placeholder="Durden" type="text" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </LabelInputContainer>
          </div>

          {/* Email, Password, and Date of Birth Fields */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" style={{ color: 'black' }}>
              Email Address
            </Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" style={{ color: 'black' }}>
              Password
            </Label>
            <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="dateOfBirth" style={{ color: 'black' }}>
              Date of Birth
            </Label>
            <Input id="dateOfBirth" placeholder="yyyy-mm-dd" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          </LabelInputContainer>

          {/* Contact and Address Fields */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="contactNumber" style={{ color: 'black' }}>
              Contact Number
            </Label>
            <Input id="contactNumber" placeholder="+123456789" type="text" value={formData.contactNumber} onChange={handleChange} />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="postalAddress" style={{ color: 'black' }}>
              Postal Address
            </Label>
            <Input id="postalAddress" placeholder="123 Paper Street" type="text" value={formData.postalAddress} onChange={handleChange} />
            {errors.postalAddress && <p className="text-red-500 text-sm">{errors.postalAddress}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="permanentAddress" style={{ color: 'black' }}>
              Permanent Address
            </Label>
            <Input id="permanentAddress" placeholder="123 Paper Street" type="text" value={formData.permanentAddress} onChange={handleChange} />
            {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress}</p>}
          </LabelInputContainer>

          {/* Specialization Field */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="specialization" style={{ color: 'black' }}>
              Specialization
            </Label>
            <Input id="specialization" placeholder="Psychiatrist" type="text" value={formData.specialization} onChange={handleChange} />
            {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
          </LabelInputContainer>

          {/* Availability Fields */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="startTime" style={{ color: 'black' }}>
                Start Time
              </Label>
              <Input id="startTime" placeholder="08:00 AM" type="time" value={formData.availability.startTime} onChange={handleAvailabilityChange} />
              {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="endTime" style={{ color: 'black' }}>
                End Time
              </Label>
              <Input id="endTime" placeholder="05:00 PM" type="time" value={formData.availability.endTime} onChange={handleAvailabilityChange} />
              {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
            </LabelInputContainer>
          </div>

          {/* Qualification Fields */}
          <h3 className="font-bold text-lg mb-4">Qualifications</h3>
          {formData.doctor_qualification.map((qualification, index) => (
            <div key={index} className="mb-4">
              <LabelInputContainer>
                <Label htmlFor={`qualificationName${index}`} style={{ color: 'black' }}>
                  Qualification Name
                </Label>
                <Input
                  id="qualificationName"
                  placeholder="M.D."
                  type="text"
                  value={qualification.qualificationName}
                  onChange={(e) => handleQualificationChange(index, e)}
                />
                {errors[`qualificationName${index}`] && <p className="text-red-500 text-sm">{errors[`qualificationName${index}`]}</p>}
              </LabelInputContainer>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label htmlFor={`startYear${index}`} style={{ color: 'black' }}>
                    Start Year
                  </Label>
                  <Input
                    id="startYear"
                    placeholder="2020"
                    type="text"
                    value={qualification.startYear}
                    onChange={(e) => handleQualificationChange(index, e)}
                  />
                  {errors[`startYear${index}`] && <p className="text-red-500 text-sm">{errors[`startYear${index}`]}</p>}
                </LabelInputContainer>
                <LabelInputContainer >
                  <Label htmlFor={`endYear${index}`} style={{ color: 'black' }}>
                    End Year
                  </Label>
                  <Input
                    id="endYear"
                    placeholder="2025"
                    type="text"
                    value={qualification.endYear}
                    onChange={(e) => handleQualificationChange(index, e)}
                  />
                  {errors[`endYear${index}`] && <p className="text-red-500 text-sm">{errors[`endYear${index}`]}</p>}
                </LabelInputContainer>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary w-full text-white py-2 px-4 rounded-full hover:bg-primary-dark transition-colors"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}

const LabelInputContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`flex flex-col ${className}`}>
    {children}
  </div>
);
