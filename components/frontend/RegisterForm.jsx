"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../formInputs/SubmitButton";
import TextInput from "../formInputs/TextInput";

export default function RegisterForm({ role = "USER" }) {
  const router = useRouter(); //Redirecting on the client side
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data) {
    data.plan = plan;
    try {
      //console.log(data);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        setLoading(false);
        toast.success("User Created Successfully");
        reset();
        // if role = user => home page
        // if role = farmer => onboarindg page
        const userRole = responseData.data.role;
        if (role === "USER") {
          router.push("/");
        } else {
          const {data} = responseData;
          router.push(`/verify-email?userId=${data.id}`);
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          // Handle other errors
          // console.error("Server Error:", responseData.error);
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        label=""
        name="role"
        register={register}
        errors={errors}
        type="hidden"
        className="sm:col-span-2 mb-3"
        defaultValue={role}
      />
      <TextInput
        label="Your Full Name"
        name="name"
        register={register}
        errors={errors}
        type="text"
        className="sm:col-span-2 mb-3"
      />
      <TextInput
        label="Email Address"
        name="email"
        register={register}
        errors={errors}
        type="email"
        className="sm:col-span-2 mb-3"
      />
      {emailErr && <p className="text-red-600 -mt-2 mb-2">{emailErr}</p>}
      <TextInput
        label="Password"
        name="password"
        register={register}
        errors={errors}
        type="password"
        className="sm:col-span-2 mb-3"
      />
      <SubmitButton
        isLoading={loading}
        buttonTitle="Register"
        loadingButtonTitle="Signing you Please Wait..."
      />
      {/* <div className="flex items-center ">
        <div className="w-full bg-slate-500 h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-slate-500 h-[1px]"></div>
      </div>
      <div className="">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full text-slate-950 bg-white hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center flex items-center dark:focus:ring-slate-100 me-2 mb-4 border border-slate-200"
        >
        
          Sign up with Google
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="w-full justify-center text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
         
          <Github Icon className="mr-2 w-4 h-4" />
          Sign up with Github
        </button>
      </div> */}
      <div className="flex gap-2 justify-between">
        <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Login
          </Link>
        </p>
        {role === "USER" ? (
          <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
            Are you a Farmer?{" "}
            <Link
              href="/farmer-pricing"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Register Here
            </Link>
          </p>
        ) : (
          <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
            Are you a Normal User?{" "}
            <Link
              href="/register"
              className="font-medium text-purple-600 hover:underline dark:text-purple-500"
            >
              Register Here
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}
