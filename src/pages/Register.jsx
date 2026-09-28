// src/pages/Register.jsx
// ─────────────────────────────────────────────────────────────
// The PAGE owns navigation/high-level state. The FORM
// (components/auth/RegisterForm.jsx) owns only the form itself.
// This separation matters: RegisterForm has no idea what happens
// after success — it just calls onSuccess() and lets the page decide.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  // Once registration succeeds, we don't redirect to a dashboard
  // (the account is "pending" — it can't log in yet). Instead we
  // swap the form out for a confirmation message.
  const [successMessage, setSuccessMessage] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Join The Robo-Tech Forum
        </h1>

        {successMessage ? (
          <div className="text-center space-y-3">
            <p className="text-green-400">{successMessage}</p>
            <p className="text-sm text-gray-400">
              You'll be able to log in once your domain admin approves your request.
            </p>
          </div>
        ) : (
          <RegisterForm onSuccess={setSuccessMessage} />
        )}
      </div>
    </div>
  );
}