import React from "react";

const Medicine = () => {
  return (
    <div className="flex flex-col justify-center bg-white-100 rounded-md w-full items-center p-4">
      <p className="font-bold text-lg">Medicine Schedule</p>
      <div className="flex flex-col justify-center items-center gap-[10px]">
        <p>From- 1, April - To- 10, April</p>
        <div className="flex items-center gap-16">
          <p>Medicine 1</p>
          <p>Morning, afternoon, Evening</p>
        </div>
        <div className="flex items-center gap-16">
          <p>Medicine 1</p>
          <p>Morning, afternoon, Evening</p>
        </div>
        <div className="flex items-center gap-16">
          <p>Medicine 1</p>
          <p>Morning, afternoon, Evening</p>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
