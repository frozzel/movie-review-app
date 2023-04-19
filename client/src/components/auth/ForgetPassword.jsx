import React from 'react'
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";

export default function ForgetPassword() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title >Please Enter Your Email</Title>
          <FormInput label="Email" name="email"  placeholder="your@email.com" />
          <Submit value="Send Link"></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/SignIn">Sign In</CustomLink>
            <CustomLink to="/auth/SignUp">Sign Up</CustomLink>
            
          </div>
        </form>
      </Container>
    </div>
  )
}
