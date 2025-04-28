import { Info } from "lucide-react";
import React from "react";

export default function VerifyMail() {
  return (
    <div className="max-w-2xl mx-auto min-h-screen mt-8">
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <div className="flex items-center gap-2">
          <Info className="" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Email Sent- Verify your account
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Thank you for creating an account with Us, we have sent you an email
          to verify your account. Please check your email and click on the link
          to verify your account.
        </div>
      </div>
    </div>
  );
}
