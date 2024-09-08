import ECGTestReport from "../models/ECGReportSchema.js";



export const createECGReport = async (req, res) => {
    console.log(req.body);
    
    try {
        const { testId, prediction, ecg } = req.body;
        

        const newReport = new ECGTestReport({
            testId,
            prediction,
            ecg,
        });

        await newReport.save();

        res.status(201).json({ message: 'ECG Report created successfully', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create ECG Report', error });
    }
};

export const getECGReportById = async (req, res) => {
    try {
        const report = await ECGTestReport.findById(req.params.id).populate('testId');

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving report' });
    }
};

