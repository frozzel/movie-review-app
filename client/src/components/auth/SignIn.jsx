import React from "react";
import Container from "../Container";
import Title from "../user/form/Title";
import FormInput from "../user/form/FormInput";
import Submit from "../user/form/Submit";

export default function SignIn() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title >Sign In</Title>
          <FormInput label="Email" name="email"  placeholder="your@email.com" />
          <FormInput label="Password" name="password"  placeholder="********" />
          <Submit value="Sign In"></Submit>
          <div className="flex justify-between">
            <a className="text-dark-subtle hover:text-white" href="#">Forget Password</a>
            <a className="text-dark-subtle hover:text-white" href="#">Sign Up</a>
          </div>
        </form>
      </Container>
    </div>
  );
}