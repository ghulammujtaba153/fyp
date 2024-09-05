
import TestAppointment from "../models/TestAppointmentSchema.js";

export async function createTestAppointment(req, res) {
    try {
        const { patientId, testId, appointmentDate, appointmentTime } = req.body;

        const newTestAppointment = new TestAppointment({
            patientId,
            testId,
            appointmentDate,
            appointmentTime
        });

        await newTestAppointment.save();

        res.status(201).json({ message: 'Test appointment created successfully.', testAppointment: newTestAppointment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Controller to get all test appointments
export async function getAllTestAppointments(req, res) {
    try {
        const testAppointments = await TestAppointment.find().populate('testId','testName').populate('patientId', 'firstName lastName profile email contactNumber');

        res.status(200).json({ message: 'Test appointments retrieved successfully.', testAppointments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//Controller to get a specific test appointment by id
export async function getTestAppointmentById(req, res) {
    try {
        const { id } = req.params;
        const testAppointment = await TestAppointment.find({patientId: id}).populate(
            'testId'
        );

        if (!testAppointment) {
            return res.status(404).json({ message: 'Test appointment not found.' });
        }

        res.status(200).json({ message: 'Test appointment retrieved successfully.', testAppointment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Controller to update a specific test appointment by id
export async function updateTestAppointmentById(req, res) {
    try {
        const { id } = req.params;
        const { patientId, testId, appointmentDate, appointmentTime } = req.body;

        const testAppointment = await TestAppointment.findByIdAndUpdate(id, { patientId, testId, appointmentDate, appointmentTime });

        if (!testAppointment) {
            return res.status(404).json({ message: 'Test appointment not found.' });
        }

        res.status(200).json({ message: 'Test appointment updated successfully.', testAppointment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function getTestAppointmentByTestId(req, res) {
    try {
        const { id } = req.params;
        const testAppointment = await TestAppointment.findById((id)).populate(
            'testId'
        ).populate('patientId', 'firstName lastName profile email contactNumber');

        if (!testAppointment) {
            return res.status(404).json({ message: 'Test appointment not found.' });
        }

        res.status(200).json({ message: 'Test appointment retrieved successfully.', testAppointment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}