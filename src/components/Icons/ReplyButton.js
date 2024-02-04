import React from "react";
import "../../css/CommentCard.css";

export default function ReplyButton({ onClick }) {
  return (
    <button className="card__btn" onClick={onClick}>
      <img
        width={16}
        height={16}
        src="/images/icon-reply.svg"
        alt="Reply Icon"
      />
      Reply
    </button>
  );
}
