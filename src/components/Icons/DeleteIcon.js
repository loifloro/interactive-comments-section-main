import React from "react";
import "../../css/CommentCard.css";

export default function DeleteButtom({ onClick }) {
  return (
    <button className="card__btn card-btn--delete" onClick={onClick}>
      <img
        width={12}
        height={12}
        src="/images/icon-delete.svg"
        alt="Delete Icon"
      />
      Delete
    </button>
  );
}
