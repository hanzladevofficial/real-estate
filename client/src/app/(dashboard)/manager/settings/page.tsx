"use client";
import SettingsForm from "@/components/dashboard/settings-form";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
} from "@/state/api";
import React from "react";

export default function page() {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateManager] = useUpdateManagerSettingsMutation();
  console.log(authUser);

  if (isLoading) return <>Loading...</>;
  const initialData = {
    name: authUser?.userInfo.name,
    email: authUser?.userInfo.email,
    phoneNumber: authUser?.userInfo.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateManager({
      cognitoId: authUser?.cognitoInfo?.userId,
      ...data,
    });
  };
  return (
    <SettingsForm
      initialData={initialData}
      userType="manager"
      onSubmit={handleSubmit}
    />
  );
}
