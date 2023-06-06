import React from "react";
import { FaRadiation } from "react-icons/fa";


export default function RatingStar({ rating }) {
  let RateProp = "";
  if (rating > 1 && rating <= 6) {
      RateProp = "text-yellow-500 ";
  } else if (rating > 6 && rating < 11) {
      RateProp = "text-red-500 ";
  }
  console.log(RateProp);
  if (!rating)
    return (
      <p className="text-highlight dark:text-highlight-dark">No reviews</p>
    );

  return (
    <p className={RateProp + "flex items-center space-x-1"}>
      <span>{rating}</span>
      <FaRadiation />
     
    </p>
  );
}
