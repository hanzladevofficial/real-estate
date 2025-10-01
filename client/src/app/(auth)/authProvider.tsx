"use client";
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  View,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { usePathname, useRouter } from "next/navigation";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});
export const components = {
  SignIn: {
    Header() {
      return (
        <View className="mt-4 mb-7">
          <Heading level={3} className="!text-2xl !font-bold">
            RENT
            <span className="text-secondary-500 font-light hover:!text-primary-300">
              IFUL
            </span>
          </Heading>
          <p className="text-gray-800 mt-2">
            <span className="font-bold">Welcome!</span> Please sign in to
            continue
          </p>
        </View>
      );
    },
    Footer() {
      const { toSignUp, toForgotPassword } = useAuthenticator();
      return (
        <View className="mt-4 space-y-3">
          <p className="text-gray-800">
            <button
              onClick={toForgotPassword}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Forgot password?
            </button>
          </p>

          <p className="text-gray-800">
            Don&apos;t have an account?{" "}
            <button
              onClick={toSignUp}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign up here
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      return (
        <View className="mt-4 mb-7">
          <Heading level={3} className="!text-2xl !font-bold">
            RENT
            <span className="text-secondary-500 font-light hover:!text-primary-300">
              IFUL
            </span>
          </Heading>
          <p className="text-gray-800 mt-2">
            <span className="font-bold">Welcome!</span> Create an account to
            continue
          </p>
        </View>
      );
    },
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="mt-4 mb-7">
          <p className="text-gray-800">
            Already have an account? {"  "}
            <button
              onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Sign in here
            </button>
          </p>
        </View>
      );
    },
  },
};
export const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
  forgotPassword: {
    username: {
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
  },
};
const Auth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuthenticator((context) => [context.user]);
  const pathname = usePathname();
  const isAuthPage = pathname.match(/^\/(signin|signup)$/);

  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);
  
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={pathname.includes("signup") ? "signUp" : "signIn"}
        components={components}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};
export default Auth;
