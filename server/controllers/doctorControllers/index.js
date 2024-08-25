import Doctor from "../../models/doctorSchema.js";
import User from "../../models/userSchema.js";
import bcrypt from 'bcrypt';


export const registerDoctor = async (req, res) => {
  const { firstName, lastName, email, password, role, dateOfBirth, contactNumber, postalAddress, permanentAddress, profile, specialization, doctor_qualification, availability } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ profile, firstName, lastName, email, password:hashedPassword, role, dateOfBirth, contactNumber, postalAddress, permanentAddress });
    
    // Save user
    const newUser = await user.save();

    // Create a new Doctor record
    const newDoctor = new Doctor({
      userId: newUser._id,
      specialization,
      doctor_qualification,
      availability
    });

    // Save the doctor record
    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully', doctor: newDoctor });
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const getDoctorInfo = async (req, res) => {
    const { userId } = req.params;
    console.log(userId)
  
    try {
      // Find the doctor by userId
      const doctor = await Doctor.findOne({ userId }).populate('userId'); // Populate if you need user details
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      res.status(200).json(doctor);
    } catch (error) {
      console.error('Error retrieving doctor information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



  export const updateProfile = async (req, res) => {
    const userId = req.params.id;
    const {
      _id,
      firstName,
      lastName,
      email,
      password,
      role,
      dateOfBirth,
      contactNumber,
      postalAddress,
      permanentAddress,
      profile,
      doctorId,
      specialization,
      doctor_qualification,
      availability
    } = req.body;
  
    try {
      const updateFields = {
        firstName,
        lastName,
        email,
        role,
        dateOfBirth,
        contactNumber,
        postalAddress,
        permanentAddress,
        profile
      };
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateFields,
        { new: true, runValidators: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let doctor = await Doctor.findById(_id);
  

      doctor.specialization = specialization;
      doctor.doctor_qualification = doctor_qualification;
      doctor.availability = availability;
      await doctor.save();
  
      res.status(200).json({ user: updatedUser, doctor });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  export const getAllDoctors = async (req, res) => {
  
    try {
      const doctor = await Doctor.find().populate('userId'); // Populate if you need user details
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      res.status(200).json(doctor);
    } catch (error) {
      console.error('Error retrieving doctor information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };