import React from "react";
import { useParams } from "react-router-dom";
import { addReviewTv } from "../../api/review";
import { useNotification } from "../../hooks";
import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";

export default function AddRatingModal({ visible, onSuccess, onClose, title, IMDB }) {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReviewTv(movieId, data, title, IMDB);
    if (error) return updateNotification("error", error);
    
    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}  ignoreContainer>
      <RatingForm onSubmit={handleSubmit} title={title} IMDB={IMDB}/>
    </ModalContainer>
  );
}
