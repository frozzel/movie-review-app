import React from 'react'
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from '../form/FormContainer';
import { commonModalClasses } from '../../utils/theme';

export default function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title >Please Enter Your Email</Title>
          <FormInput label="Email" name="email"  placeholder="your@email.com" />
          <Submit value="Send Link"></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/SignIn">Sign In</CustomLink>
            <CustomLink to="/auth/SignUp">Sign Up</CustomLink>
            
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
