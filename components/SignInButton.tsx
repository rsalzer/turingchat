"use client";

import { signIn } from "next-auth/react";
import Button from "@/components/Button";

const SignInButton = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export default SignInButton;
