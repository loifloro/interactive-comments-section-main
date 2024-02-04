import React, { useEffect } from "react";
import "../css/DeleteModal.css";
import { useLockBodyScroll } from "@uidotdev/usehooks";

export default function DeleteModal({
  commentId,
  isReply,
  parentId,
  setShowModal,
  showModal,
}) {
  useLockBodyScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  })
  
  function deleteComment() {
    const comments = JSON.parse(localStorage.getItem("comments"));

    if (isReply) {
      const replies = comments.find((parent) => parent.id === parentId).replies;
      const index = replies.indexOf(
        replies.find((reply) => reply.id === commentId)
      );
      comments
        .find((parent) => parent.id === parentId)
        .replies.splice(index, 1);

      localStorage.setItem("comments", JSON.stringify(comments));
    } else {
      const index = comments.indexOf(
        comments.find((comment) => comment.id === commentId)
      );
      comments.splice(index, 1);

      localStorage.setItem("comments", JSON.stringify(comments));
    }
    window.location.reload(true);
  }

  return (
    showModal && (
      <div className="modal">
        <div className="modal__card">
          <h2 className="modal__title">Delete comment</h2>
          <p className="modal__content">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className="modal__actions">
            <button onClick={setShowModal} className="modal__cancel-btn">No, Cancel</button>
            <button onClick={deleteComment} className="modal__submit-btn">Yes, Delete</button>
          </div>
        </div>
      </div>
    )
  );
}
