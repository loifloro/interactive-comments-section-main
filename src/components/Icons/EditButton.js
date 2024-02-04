import React from "react";
import "../../css/CommentCard.css";

export default function EditButton({ onClick }) {
  return (
    <button className="card__btn" onClick={onClick}>
      <img
        width={12}
        height={12}
        src="./images/icon-edit.svg"
        alt="Edit Icon"
      />
      Edit
    </button>
  );
}
