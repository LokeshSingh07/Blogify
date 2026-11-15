import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SignupInput } from '@nextian/blogify-common';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ParamsType {
  type: "signup" | "signin";
}

function Auth({ type }: ParamsType): React.ReactElement {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const [showPassword, setShowPassword] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );

      const token = resp.data.jwt;
      localStorage.setItem("token", token);
      localStorage.setItem("user", resp?.data?.user?.name);
      navigate("/blogs");

      toast.success(resp.data.message || (type === "signin" ? "Welcome back!" : "Account created successfully!"));
    } catch (error: unknown) {
      let errorMsg = "Something went wrong. Please try again.";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      toast.error(errorMsg);
    }
    setLoading(false);
  };

  // If user is already logged in, redirect to blogs page
  useEffect(() => {
    if (token) {
      navigate("/blogs");
    }
  }, [token, navigate]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200/90 p-6 sm:p-8 md:p-10">
      {/* Brand badge & Heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-3 border border-green-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
          {type === "signin" ? "Member Sign In" : "Join the Community"}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {type === "signup" ? "Join Blogify" : "Welcome back"}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          {type === "signin"
            ? "Sign in to access your personalized feed, follow your favorite authors, and continue reading."
            : "Create an account to personalize your feed, follow favorite authors, and share your voice."}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={sendRequest} className="space-y-4">
        {type === "signup" && (
          <LabelledInput
            label="Full Name"
            placeholder="John Doe"
            required
            onchange={(e) =>
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              })
            }
          />
        )}

        <LabelledInput
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
          onchange={(e) =>
            setPostInputs((c) => ({
              ...c,
              email: e.target.value,
            }))
          }
        />

        <div className="relative">
          <LabelledInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            onchange={(e) =>
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }))
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[32px] text-gray-400 hover:text-green-700 transition-colors p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash fontSize={18} /> : <FaEye fontSize={18} />}
          </button>

          {postInputs?.password.length > 0 && postInputs.password.length < 8 && (
            <p className="text-amber-600 text-xs mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium py-3 px-5 rounded-full text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>{type === "signup" ? "Creating account..." : "Signing in..."}</span>
            </div>
          ) : (
            <span>{type === "signup" ? "Create Account" : "Sign In"}</span>
          )}
        </button>
      </form>

      {/* Switch between signin & signup */}
      <div className="text-sm text-gray-600 text-center mt-6 pt-5 border-t border-gray-100">
        {type === "signup" ? "Already have an account?" : "No account yet?"}
        <Link
          className="pl-1.5 font-semibold text-green-700 hover:text-green-800 hover:underline transition-colors"
          to={type === "signup" ? "/signin" : "/signup"}
        >
          {type === "signup" ? "Sign In" : "Create one"}
        </Link>
      </div>
    </div>
  );
}

type LabelledInputType = {
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function LabelledInput({
  label,
  type,
  placeholder,
  required,
  onchange,
}: LabelledInputType): React.ReactElement {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        required={required}
        onChange={onchange}
        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-gray-50/60 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 focus:bg-white transition-all shadow-xs"
      />
    </div>
  );
}

export default Auth;
