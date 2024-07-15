import React from "react";

export default function UserProfile({ params }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full flex-col items-center justify-center max-w-md p-8 space-y-8 rounded-lg shadow-md bg-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-center text-orange-700">
          User Profile: &nbsp; <span className="text-white">{params.id}</span>
        </h1>
      </div>
    </div>
  );
}
