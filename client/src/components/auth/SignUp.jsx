import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";

export default function SignUp() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title >Sign Up</Title>
          <FormInput label="Name" name="name"  placeholder="Your Name" />
          <FormInput label="Email" name="email"  placeholder="your@email.com" />
          <FormInput label="Password" name="password"  placeholder="********" />
          <Submit value="Sign Up"></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/SignIn">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}