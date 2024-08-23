import React, { useState } from 'react';
import '../../app/scroll.css'; // Import the custom scrollbar styles

const Prescription = ({ users, setPrescription }) => {
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '' }]);
  const [diseaseDiagnosed, setDiseaseDiagnosed] = useState('');
  const [diet, setDiet] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [note, setNote] = useState('');

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const newMedicines = [...medicines];
    newMedicines[index][name] = value;
    setMedicines(newMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  };

  const handleSubmit = () => {
    const prescriptionData = {
      medicines,
      diseaseDiagnosed,
      diet,
      precautions,
      note,
    };
    console.log(prescriptionData);
    setPrescription(false); // Close the form after submitting
  };

  return (
    <div className="prescription-container w-[300px] h-[70%] bg-white shadow-lg rounded-lg overflow-y-scroll p-4">
      <h3 className="text-lg font-semibold mb-4">Prescription</h3>

      {medicines.map((medicine, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            name="name"
            value={medicine.name}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Medicine Name"
            className="w-full p-2 mb-1 border rounded"
          />
          <input
            type="text"
            name="dosage"
            value={medicine.dosage}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Dosage"
            className="w-full p-2 mb-1 border rounded"
          />
          <input
            type="text"
            name="duration"
            value={medicine.duration}
            onChange={(e) => handleMedicineChange(index, e)}
            placeholder="Duration"
            className="w-full p-2 mb-1 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleAddMedicine}
        className="w-full bg-blue-500 text-white py-2 rounded mb-4"
      >
        Add Medicine
      </button>

      <input
        type="text"
        value={diseaseDiagnosed}
        onChange={(e) => setDiseaseDiagnosed(e.target.value)}
        placeholder="Disease Diagnosed"
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        type="text"
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        placeholder="Diet"
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        type="text"
        value={precautions}
        onChange={(e) => setPrecautions(e.target.value)}
        placeholder="Precautions"
        className="w-full p-2 mb-2 border rounded"
      />

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
        className="w-full p-2 mb-2 border rounded"
        rows="3"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Submit Prescription
      </button>
    </div>
  );
};

export default Prescription;
