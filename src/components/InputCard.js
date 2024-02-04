import data from "../data.json";
import React, { useEffect, useState } from "react";
import "../css/InputCard.css";

export default function InputCard({
  variant,
  isReply,
  isComment,
  isUpdate,
  replyingTo,
  parentId,
  commentId,
  commentContent,
}) {
  const currentUser = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [inputComment, setInputComment] = useState("");
  const [lastIndex, setLastIndex] = useState(
    JSON.parse(localStorage.getItem("lastIndex"))
  );
  const comments = JSON.parse(localStorage.getItem("comments"));

  useEffect(() => {
    if (!lastIndex) {
      setLastIndex(
        data.comments.length +
          data.comments.reduce((acc, obj) => acc + obj.replies.length, 0)
      );
    }
    localStorage.setItem("lastIndex", JSON.stringify(lastIndex));
  }, [lastIndex, comments]);

  const newComment = {
    id: lastIndex + 1,
    content: inputComment,
    createdAt: "2 days ago",
    score: 1,
    user: currentUser[0],
    replies: [],
  };

  const newReply = {
    id: lastIndex + 1,
    content: inputComment,
    createdAt: "2 days ago",
    score: 1,
    user: currentUser[0],
    replyingTo: replyingTo,
  };

  function addComment() {
    if (isReply) {
      if (isUpdate) {
        comments
          .find((parent) => parent.id === parentId)
          .replies.find((reply) => reply.id === commentId).content =
          inputComment;
      } else {
        comments
          .find((parent) => parent.id === parentId)
          .replies.push(newReply);
        setLastIndex((lastIndex) => lastIndex + 1);
      }
    } else if (isComment) {
      if (isUpdate) {
        comments.find((parent) => parent.id === commentId).content =
          inputComment;
      } else {
        comments
          .find((parent) => parent.id === commentId)
          .replies.push(newReply);
        setLastIndex((lastIndex) => lastIndex + 1);
      }
    } else {
      setLastIndex((lastIndex) => lastIndex + 1);
      comments.push(newComment);
    }

    localStorage.setItem("comments", JSON.stringify(comments));
    window.location.reload(true);
  }

  return (
    <div className="inputCard">
      <img
        className="inputCard__img"
        src={currentUser[0].image.png}
        alt={currentUser[0].username}
      />
      <textarea
        defaultValue={variant === "Update" ? commentContent : inputComment}
        onChange={(event) => setInputComment(event.target.value)}
        className="inputCard__input"
        placeholder="Add a comment.."
      ></textarea>
      <button className="inputCard__btn" onClick={addComment}>
        {variant === "Reply"
          ? "Reply"
          : variant === "Update"
          ? "Update"
          : "Send"}
      </button>
    </div>
  );
}
