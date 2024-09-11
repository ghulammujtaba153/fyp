import ECGTestReport from "../models/ECGReportSchema.js";
import CBCReport from "../models/cbcReportSchema.js";



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
        const report = await ECGTestReport.find({testId: req.params.id});

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving report' });
    }
};


export const createCBCReport= async (req, res) => {
    console.log(req.body);
    
    try {
        const { testId, gender, hemoglobin, MCH, MCHC, MCV, result } = req.body;
        
        const newReport = new CBCReport({
            testId,
            gender,
            hemoglobin,
            MCH,
            MCHC,
            MCV,
            result,
        });
        
        await newReport.save();
        
        res.status(201).json({ message: 'CBC Report created successfully', report: newReport });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create CBC Report', error });
    }
};

export const getCBCReportById = async (req, res) => {
    try {
        const report = await CBCReport.find({testId: req.params.id});
        
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving report' });
    }
};

