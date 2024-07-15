"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full flex-col items-center justify-center max-w-md p-8 space-y-8 rounded-lg shadow-md bg-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-center text-orange-700 pt-3">
          {loading ? "Processing..." : "Create a new account"}
        </h1>
        <form className="space-y-6" onSubmit={onSignup}>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="px-3 py-2 mt-1 text-white bg-black border-2 border-orange-700 rounded focus:outline-none focus:ring focus:border-orange-700 "
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your Username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="px-3 py-2 mt-1 text-white bg-black border-2 border-orange-700 rounded focus:outline-none focus:ring focus:border-orange-700"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your Email"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="px-3 py-2 mt-1 text-white bg-black border-2 border-orange-700 rounded focus:outline-none focus:ring focus:border-orange-700"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your Password"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 font-bold bg-black hover:bg-[#151515] text-orange-700 hover:text-orange-600 rounded-lg focus:outline-none focus:ring focus:border-orange-700 border-2 border-orange-700 hover:border-orange-600"
            >
              {buttonDisabled ? "No Signup" : "Signup"}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-white">
          Already have an account? &nbsp;
          <Link
            href="/login"
            className="font-medium text-orange-700 hover:text-orange-600"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
