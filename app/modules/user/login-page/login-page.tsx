import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import MainLayout from "@/lib/components/complex/main-layout";
import TextInput from "@/lib/components/atomic/text-input";

import { loginCurrentUserAC } from "../ducks";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (userData) => {
    dispatch(loginCurrentUserAC(userData));
  };

  return (
    <MainLayout title="Login page">
      <div className="grid-12 user-page--container">
        <div className="grid-12 user__login__form--container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid-4 grid-sm-6 grid-xs-8 user__login__form"
          >
            <h2>Login</h2>
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
