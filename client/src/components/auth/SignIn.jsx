import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";




export default function SignIn() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title >Sign In</Title>
          <FormInput label="Email" name="email"  placeholder="your@email.com" />
          <FormInput label="Password" name="password"  placeholder="********" />
          <Submit value="Sign In"></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/SignUp">Sign Up</CustomLink>
            
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}