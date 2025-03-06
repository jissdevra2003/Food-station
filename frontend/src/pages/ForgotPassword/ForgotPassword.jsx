import React, { useContext, useState } from "react";
import axios from "axios";
import './ForgotPassword.css'
import { StoreContext } from "../../context/StoreContext";

function ForgotPassword() {
  const { url } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/user/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Error sending password reset link");
    }
  };

   return (
    <div className="flex font-encode-sans items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-md text-gray-600 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition shadow-md">
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
