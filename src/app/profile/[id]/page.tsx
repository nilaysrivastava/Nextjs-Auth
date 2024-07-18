import Image from "next/image";
import React from "react";

export default function UserProfile({ params }: any) {
  const decodedEmail = decodeURIComponent(params.id);
  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-black">
      <div className="flex-col items-center justify-center align-center max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center text-blue-300">
            User Profile
          </h1>
          <h2 className="text-1xl font-bold text-center text-white p-10">
            <button className="mx-4 px-8 py-2 font-bold bg-black text-blue-100 hover:text-blue-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 border-2 border-blue-500 hover:border-blue-600">
              {decodedEmail}
            </button>
          </h2>
        </div>
      </div>
      <div className="w-full flex-col items-center justify-center max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <Image
          src="/images/next11.png"
          alt="My Image"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
