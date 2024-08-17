"use client";
import React, { useEffect, useState, useContext } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import axios from "axios";
import upload from "@/utils/upload"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/apiConfig";
import DashboardLayout from "../DashboardLayout";
import { UserContext } from "@/context/UserContext"; // Import UserContext

export default function Profile() {
  const { user, updateUser } = useContext(UserContext); // Retrieve user and updateUser
  const [formData, setFormData] = useState({
    _id:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "doctor",
    dateOfBirth: "",
    contactNumber: "",
    postalAddress: "",
    permanentAddress: "",
    doctorId:"",
    specialization: "",
    doctor_qualification: [
      { qualificationName: "", startYear: "", endYear: "" },
      { qualificationName: "", startYear: "", endYear: "" }
    ],
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`${API_BASE_URL}/doctors/${user._id}`);
          const userData = response.data;
          console.log(response.data)
          setFormData({
            _id:response.data._id,
            firstName: userData.userId.firstName,
            lastName: userData.userId.lastName,
            email: userData.userId.email,
            password: "", 
            role: userData.userId.role,
            dateOfBirth: userData.userId.dateOfBirth.substring(0, 10), // Extract date part
            contactNumber: userData.userId.contactNumber,
            postalAddress: userData.userId.postalAddress,
            permanentAddress: userData.userId.permanentAddress,
            doctorId:userData._id,
            specialization: userData.specialization,
            doctor_qualification: userData.doctor_qualification,
          });
          if (userData.userId.profile) {
            setProfilePicPreview(userData.userId.profile);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error fetching user data');
        }
      }
    };

    getUser();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQualificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQualifications = formData.doctor_qualification.map((qual, i) => 
      i === index ? { ...qual, [name]: value } : qual
    );
    setFormData({ ...formData, doctor_qualification: updatedQualifications });
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

    let profilePicUrl = profilePicPreview;
    if (profilePic) {
      try {
        profilePicUrl = await upload(profilePic);
        toast.success('Profile picture uploaded successfully');
      } catch (error) {
        toast.error('Error uploading profile picture');
      }
    }

    try {
      const updatedData = { ...formData, profile: profilePicUrl };
      await updateUser(updatedData);
      toast.success('Profile updated successfully');
      router.push('/profile'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex bg-black-100 py-[140px]">
        <motion.div 
          initial={{ x: "-100vw" }} 
          animate={{ x: 0 }} 
          transition={{ type: "spring", stiffness: 50 }} 
          className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
        >
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center mb-4 bg-black-default border rounded-full w-[100px] h-[100px] align-middle relative">
              {profilePicPreview ? (
                <img src={profilePicPreview} alt="Profile" className='w-full h-full object-cover rounded-full' />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
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
                <Input 
                  id="firstName" 
                  name="firstName" 
                  placeholder="Tyler" 
                  type="text" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  placeholder="Durden" 
                  type="text" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                placeholder="projectmayhem@fc.com" 
                type="email" 
                value={formData.email}  
                onChange={handleChange} 
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input 
                id="dateOfBirth" 
                name="dateOfBirth" 
                placeholder="YYYY-MM-DD" 
                type="date" 
                value={formData.dateOfBirth} 
                onChange={handleChange} 
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input 
                id="contactNumber" 
                name="contactNumber" 
                placeholder="123-456-7890" 
                type="tel" 
                value={formData.contactNumber}  
                onChange={handleChange} 
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="postalAddress">Postal Address</Label>
              <Input 
                id="postalAddress" 
                name="postalAddress" 
                placeholder="123 Project Mayhem St." 
                type="text" 
                value={formData.postalAddress}  
                onChange={handleChange} 
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Input 
                id="permanentAddress" 
                name="permanentAddress" 
                placeholder="123 Permanent Mayhem St." 
                type="text" 
                value={formData.permanentAddress} 
                onChange={handleChange} 
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="specialization">Specialization</Label>
              <Input 
                id="specialization" 
                name="specialization" 
                placeholder="Cardiology" 
                type="text" 
                value={formData.specialization} 
                onChange={handleChange} 
              />
            </LabelInputContainer>
            <div className="space-y-4">
              {formData.doctor_qualification.map((qual, index) => (
                <div key={index} className="mb-4">
                  <LabelInputContainer>
                    <Label htmlFor={`qualificationName${index}`}>Qualification Name {index + 1}</Label>
                    <Input
                      id={`qualificationName${index}`}
                      name="qualificationName"
                      value={qual.qualificationName}
                      placeholder="MD"
                      onChange={(e) => handleQualificationChange(index, e)}
                    />
                  </LabelInputContainer>
                  <div className="flex space-x-4">
                    <LabelInputContainer>
                      <Label htmlFor={`startYear${index}`}>Start Year</Label>
                      <Input
                        id={`startYear${index}`}
                        name="startYear"
                        type="number"
                        value={qual.startYear}
                        placeholder="2020"
                        onChange={(e) => handleQualificationChange(index, e)}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor={`endYear${index}`}>End Year</Label>
                      <Input
                        id={`endYear${index}`}
                        name="endYear"
                        type="number"
                        value={qual.endYear}
                        placeholder="2024"
                        onChange={(e) => handleQualificationChange(index, e)}
                      />
                    </LabelInputContainer>
                  </div>
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={`flex flex-col mb-4 ${className}`}>
    {children}
  </div>
);
