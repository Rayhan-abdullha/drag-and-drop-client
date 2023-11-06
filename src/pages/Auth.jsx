import React from "react";
import MainLayout from "./../layout/MainLayout";
import AuthForm from "../components/authForm/AuthForm";

const AuthPage = () => {
  return (
    <MainLayout>
      <div className="authPage">
        <AuthForm />
      </div>
    </MainLayout>
  );
};

export default AuthPage;
