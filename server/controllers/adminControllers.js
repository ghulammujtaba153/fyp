import Appointment from "../models/appointmentSchema.js";
import User from "../models/userSchema.js";
import Doctor from './../models/doctorSchema.js';


export const getPatients=async (req,res)=>{
    try{
        const patients=await User.find({role: "patient"});
        res.status(200).json(patients);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export const homeStats=async (req,res)=>{
    try{
        const totalNurses = await User.countDocuments({ role: 'nurse' });

        const totalDoctors = await User.countDocuments({ role: 'doctor' });

        const totalPatients = await User.countDocuments({ role: 'patient' });

        const totalAppointments = await Appointment.countDocuments({ });


        // Send the counts as response
        res.status(200).json({
        totalNurses,
        totalDoctors,
        totalPatients,
        totalAppointments
        });
        
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}