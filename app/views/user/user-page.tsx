import React from "react";
import { useForm } from "react-hook-form";
import UsersService from "@/services/users-service";
import MainLayout from "@/components/complex/main-layout";
import TextInput from "@/components/atomic/text-input";

const usersService = new UsersService({});

export default function UserPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (userData) => {
    usersService.loginUser(userData);
  };

  return (
    <MainLayout title="User page">
      <div className="grid-12 user-page--container">
        <div className="grid-12 user__login__form--container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="user__login__form"
          >
            <TextInput
              name="name"
              label="User name"
              id="name"
              fieldRef={register}
            />
            <TextInput
              name="password"
              label="User password"
              id="password"
              fieldRef={register}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
