import React, { useEffect, useState } from "react";
import "../css/CommentCard.css";
import DeleteModal from "./DeleteModal";
import AddButton from "./Icons/AddButton";
import DeleteIcon from "./Icons/DeleteIcon";
import EditButton from "./Icons/EditButton";
import MinusButton from "./Icons/MinusButton";
import ReplyButton from "./Icons/ReplyButton";
import InputCard from "./InputCard";

export default function CommentCard({
  commentItem,
  parentId,
  isReply,
  isComment,
}) {
  const currentUser = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [comment] = useState(commentItem);
  const [commentScore, setCommentScore] = useState(comment.score);
  const [showInputCard, setShowInputCard] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const inputVariant = currentUser[0].username === comment.user.username ? "Update" : "Reply";
  useEffect(() => {
    const comments = JSON.parse(localStorage.getItem("comments"));

    if (isReply) {
      comments
        .find((parent) => parent.id === parentId)
        .replies.find((reply) => reply.id === comment.id).score = commentScore;

      localStorage.setItem("comments", JSON.stringify(comments));
    } else {
      comments.find((item) => item.id === comment.id).score = commentScore;
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comment.id, commentScore, isReply, parentId, currentUser, comment.user.username]);

  function addScore() {
    setCommentScore((c) => c + 1);
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  function minusScore() {
    setCommentScore((c) => c - 1);
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  return (
    <>
      <div className="card">
        <div className="card__info">
          <img
            src={comment.user.image.png}
            alt={comment.user.username}
            className="card__img"
          />
          <p className="card__username">
            {comment.user.username}
            {inputVariant === "Update" && (
              <span className="card__username--badge">you</span>
            )}
          </p>

          <p className="card__date">{comment.createdAt}</p>
        </div>
        <p className="card__content">
          {comment.replyingTo && (
            <span className="card__reply-name"> @{comment.replyingTo} </span>
          )}
          {comment.content}
        </p>
        <div className="card__score-btn">
          <AddButton onClick={addScore} />
          <div className="card__score">{commentScore}</div>
          <MinusButton onClick={minusScore} />
        </div>
        <div className="card__actions">
          {inputVariant === "Update" ? (
            <>
              <EditButton
                onClick={() => {
                  setShowInputCard(!showInputCard);
                }}
              />
              <DeleteIcon
                onClick={() => {
                  setShowModal(true);
                }}
                commentId={comment.id}
              />
            </>
          ) : (
            <ReplyButton
              onClick={() => {
                setShowInputCard(!showInputCard);
              }}
            />
          )}
        </div>
      </div>

      {showModal && (
        <DeleteModal
          showModal={showModal}
          setShowModal={() => {
            setShowModal(!showModal);
          }}
          commentId={comment.id}
          parentId={parentId}
          isReply={isReply}
        />
      )}

      {showInputCard && (
        <InputCard
          variant={inputVariant}
          isReply={isReply}
          isComment={isComment}
          isUpdate={inputVariant === "Update"}
          replyingTo={comment.user.username}
          parentId={parentId}
          commentId={comment.id}
          commentContent={comment.content}
        />
      )}
    </>
  );
}
