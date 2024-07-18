"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Email verified successfully");
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
      toast.error("Email verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-black">
      <div className="flex-col items-center justify-center align-center max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-center text-blue-300">
            Verify Email
          </h1>
          <h2 className="text-1xl font-bold text-center text-white p-10">
            {token ? `${token}` : "No token"}
          </h2>
        </div>
        <div className="flex items-center justify-center">
          {loading && <p className="text-blue-300">Verifying...</p>}
          {verified && (
            <div>
              <h2 className="text-2xl text-blue-300">Email Verified</h2>
              <button className="mx-4 px-8 py-2 font-bold bg-black text-blue-100 hover:text-blue-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 border-2 border-blue-500 hover:border-blue-600">
                <Link href="/login">Login</Link>
              </button>
            </div>
          )}
          {error && (
            <div>
              <h2 className="text-2xl bg-red-500 text-black p-2 rounded-lg">
                Verification Error
              </h2>
            </div>
          )}
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
