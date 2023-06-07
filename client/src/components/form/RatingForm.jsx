import React, { useState } from "react";
import { FaSquare, FaRegSquare } from "react-icons/fa";
import Submit from "./Submit";

const ratings = new Array(10).fill("");
export default function RatingForm({ busy, onSubmit }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = new Array(index + 1).fill("");
    setSelectedRatings([...ratings]);
  };

  const handleOnChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
      content,
      CRT: document.getElementById("CRT").checked,
      LGBTQ_content: document.getElementById("LGBTQ_content").checked,
      trans_content: document.getElementById("trans_content").checked,
      anti_religion: document.getElementById("anti_religion").checked,
      globalWarming: document.getElementById("globalWarming").checked,
      leftWing: document.getElementById("leftWing").checked
    };

    onSubmit(data);
  };

  return (
    <div>
      <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
        Woke Alerts:</h1>
            <div className="text-highlight dark:text-highlight-dark flex "> 
              <input type="checkbox" id="CRT" name="CRT" value="true" className="mr-2" />
              <label htmlFor="CRT">CRT Related Material</label>
            </div>
            <div className="text-highlight dark:text-highlight-dark flex "> 
              <input type="checkbox" id="LGBTQ_content" name="LGBTQ_content" value="true" className="mr-2"/>
              <label htmlFor="LGBTQ_content">LGBTQ Content</label>
            </div>
            <div className="text-highlight dark:text-highlight-dark flex "> 
              <input type="checkbox" id="trans_content" name="trans_content" value="true" className="mr-2"/>
              <label htmlFor="trans_content">Trans/Queer Theory</label>
            </div>
            <div className="text-highlight dark:text-highlight-dark flex "> 
              <input type="checkbox" id="anti_religion" name="anti_religion" value="true" className="mr-2"/>
              <label htmlFor="anti_religion">Anti Religious Sentiment</label>
            </div>
            <div className="text-highlight dark:text-highlight-dark flex "> 
              <input type="checkbox" id="globalWarming" name="globalWarming" value="true" className="mr-2"/>
              <label htmlFor="globalWarming">Climate Change Activism</label>
            </div>
            <div className="text-highlight dark:text-highlight-dark flex "> 
              <input type="checkbox" id="leftWing" name="leftWing" value="true" className="mr-2"/>
              <label htmlFor="leftWing">Left Wing Propaganda</label>
            </div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg ">
        Woke Meter:</h1>
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>

        <textarea
          value={content}
          onChange={handleOnChange}
          className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"
        ></textarea>

        <Submit busy={busy} onClick={handleSubmit} value="Rate This Movie" />
      </div>
    </div>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <FaRegSquare
        onMouseEnter={() => onMouseEnter(index)}
        className="cursor-pointer"
        key={index}
        size={24}
      />
    );
  });
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <FaSquare
        onMouseEnter={() => onMouseEnter(index)}
        className="cursor-pointer"
        key={index}
        size={24}
      />
    );
  });
};
