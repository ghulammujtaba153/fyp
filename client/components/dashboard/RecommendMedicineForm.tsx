"use client";
import React, { useState } from "react";

interface PatientData {
  blood_pressure: string;
  heart_rate: string;
  respiratory_rate: string;
  temperature: string;
  saturation: string;
  problem: string;
  symptoms: string[];
  body_weight: string;
  drug_history: string;
  notes: string;
}

interface MedicineRecommendation {
  medicine_name: string;
  medicine_details: string;
  medicine_dosage: string;
  instructions: string;
}

const RecommendMedicineForm = () => {
  const [formData, setFormData] = useState<PatientData>({
    blood_pressure: "",
    heart_rate: "",
    respiratory_rate: "",
    temperature: "",
    saturation: "",
    problem: "",
    symptoms: [],
    body_weight: "",
    drug_history: "",
    notes: "",
  });

  const [medicine, setMedicine] = useState<MedicineRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle symptoms change (comma-separated input)
  const handleSymptomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const symptomsArray = e.target.value.split(",").map(symptom => symptom.trim());
    setFormData({
      ...formData,
      symptoms: symptomsArray,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMedicine(null);

    try {
      const response = await fetch("http://localhost:8000/recommend_medicine/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medicine recommendation.");
      }

      const data: MedicineRecommendation = await response.json();
      setMedicine(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Recommend Medicine</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="mb-4">
          <label htmlFor="blood_pressure" className="block font-semibold">Blood Pressure</label>
          <input
            type="text"
            id="blood_pressure"
            name="blood_pressure"
            value={formData.blood_pressure}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="heart_rate" className="block font-semibold">Heart Rate</label>
          <input
            type="text"
            id="heart_rate"
            name="heart_rate"
            value={formData.heart_rate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="respiratory_rate" className="block font-semibold">Respiratory Rate</label>
          <input
            type="text"
            id="respiratory_rate"
            name="respiratory_rate"
            value={formData.respiratory_rate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="temperature" className="block font-semibold">Temperature</label>
          <input
            type="text"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="saturation" className="block font-semibold">Saturation</label>
          <input
            type="text"
            id="saturation"
            name="saturation"
            value={formData.saturation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="problem" className="block font-semibold">Problem</label>
          <input
            type="text"
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="symptoms" className="block font-semibold">Symptoms (comma separated)</label>
          <input
            type="text"
            id="symptoms"
            name="symptoms"
            value={formData.symptoms.join(", ")}
            onChange={handleSymptomsChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body_weight" className="block font-semibold">Body Weight</label>
          <input
            type="text"
            id="body_weight"
            name="body_weight"
            value={formData.body_weight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="drug_history" className="block font-semibold">Drug History</label>
          <input
            type="text"
            id="drug_history"
            name="drug_history"
            value={formData.drug_history}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notes" className="block font-semibold">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendation"}
        </button>
      </form>

      {/* Error message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display medicine recommendation */}
      {medicine && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-xl font-bold mb-2">{medicine.medicine_name}</h3>
          <p><strong>Details:</strong> {medicine.medicine_details}</p>
          <p><strong>Dosage:</strong> {medicine.medicine_dosage}</p>
          <p><strong>Instructions:</strong> {medicine.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendMedicineForm;
