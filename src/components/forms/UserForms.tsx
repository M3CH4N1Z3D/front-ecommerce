import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { IUserFormsProps } from "@/types/interfaces";

const UserForms: React.FC<IUserFormsProps> = ({ formType }) => {
  return (
    <div className=" modal">
      {formType === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default UserForms;
