"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed");
    }
  };

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data.email);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to get user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-black">
      <div className="flex-col items-center justify-center align-center max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center text-blue-300">
            Profile
          </h1>
          <h2 className="text-1xl font-bold text-center text-white p-10">
            {data === "nothing" ? (
              "Click on get user id button"
            ) : (
              <button className="mx-4 px-8 py-2 font-bold bg-black text-blue-100 hover:text-blue-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 border-2 border-blue-500 hover:border-blue-600">
                <Link href={`/profile/${data}`}>{data}</Link>
              </button>
            )}
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={logout}
            className="mx-4 px-8 py-2 font-bold bg-black text-blue-100 hover:text-blue-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 border-2 border-blue-500 hover:border-blue-600"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="mx-4 px-8 py-2 font-bold bg-black text-blue-100 hover:text-blue-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 border-2 border-blue-500 hover:border-blue-600"
          >
            Get User ID
          </button>
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
