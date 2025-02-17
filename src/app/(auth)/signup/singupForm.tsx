"use client";

import { Button } from "@/components/ui/button";
import { register } from "@/lib/actions/actions";
import { useActionState } from "react";

export const SignUpForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined,
  );

  return (
    <form action={formAction} className="w-[400px]">
      <div className="my-2">
        <label htmlFor="name">Name</label>
      </div>
      <div className="block">
        <input
          id="name"
          type="name"
          name="name"
          placeholder="Your name"
          required
          className="w-full rounded-md p-2"
        />
      </div>

      <div className="my-2">
        <label htmlFor="username">Username</label>
      </div>
      <div>
        <input
          id="username"
          type="username"
          name="username"
          placeholder="Enter your username"
          required
          className="w-full rounded-md p-2"
        />
      </div>

      <div className="my-2">
        <label htmlFor="email">Email</label>
      </div>
      <div>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email address"
          required
          className="w-full rounded-md p-2"
        />
      </div>

      <div className="my-2">
        <label htmlFor="password">Password</label>
      </div>
      <div>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full rounded-md p-2"
        />
      </div>
      <Button className="mt-4 w-full" aria-disabled={isPending}>
        Sing Up
      </Button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
};
