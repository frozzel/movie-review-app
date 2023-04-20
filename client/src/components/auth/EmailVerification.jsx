import React, { useEffect, useRef } from 'react'
import Container from "../Container";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from 'react';
import FormContainer from '../form/FormContainer';
import { commonModalClasses } from '../../utils/theme';

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  }
  const focusPrevInputField = (index) => {
    let nextIndex ;
        const diff = index - 1;
        nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  }

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);
    

    if(!value) focusPrevInputField(index);
    else focusNextInputField(index);
    setOtp([...newOtp]);
  };

//  const handleKeyDown = (key, index) => {
//     if(key === 'Backspace'){focusPrevInputField(index);}
//     else focusNextInputField(index);
//   } 

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);


  return (

    <FormContainer>
    <Container>
      <form className={commonModalClasses}>
        <div>
          <Title >Please Enter The Verification Code</Title>
          <p className="text-center dark:text-dark-subtle text-light-subtle">The Code was sent to your Email</p>
        </div>
        <div className='flex justify-center items-center space-x-4'>
          {otp.map((_, index) => {
              return <input ref={activeOtpIndex === index ? inputRef : null} 
              key={index} 
              type="number" value={otp[index] || '' } 
              onChange={(e)=> handleOtpChange(e, index)} 
              // onKeyDown={(e)=> handleKeyDown(e, index)}
              className='w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none'/>
          })}

        </div>
        

        <Submit value="Send Link"></Submit>
        
      </form>
    </Container>
  </FormContainer>
  )
}
