"use client"

import { LoginForm } from "./loginForm";

export default function LoginPage() {

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl">Login</h1>
      <LoginForm />
    </div>
  );
}
