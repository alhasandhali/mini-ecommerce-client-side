import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ fullPage = false, size = 50 }) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <ClipLoader color="#0ea5e9" loading={true} size={size} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <ClipLoader color="#0ea5e9" loading={true} size={size} />
    </div>
  );
};

export default Loader;
