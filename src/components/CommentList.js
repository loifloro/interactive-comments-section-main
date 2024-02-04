import { useEffect, useState } from "react";
import "../css/CommentList.css";
import data from "../data.json";
import CommentCard from "./CommentCard";
import InputCard from "./InputCard";

export default function CommentList() {
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments"))
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    if (!comments) {
      localStorage.setItem(
        "comments",
        JSON.stringify(data.comments.sort((a, b) => b.score - a.score))
      );
      setComments(JSON.parse(localStorage.getItem("comments")));
      console.log("no comments yet");
    }

    if (!currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(data.currentUser));
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      console.log("no user yet");
    }
  }, [comments, currentUser]);

  return (
    <div className="commentList">
      {comments &&
        comments
          .sort((a, b) => b.score - a.score)
          .map((comment) => (
            <div key={comment.id}>
              <CommentCard  commentItem={comment} isComment />
              {comment.replies.length !== 0 && (
                <div className="commentList__reply-thread">
                  <div className="commentList__reply-line"></div>
                  <div className="commentList">
                    {comment.replies
                      .sort((a, b) => b.score - a.score)
                      .map((reply) => (
                        <CommentCard
                          key={reply.id}
                          parentId={comment.id}
                          commentItem={reply}
                          isReply
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}

      {currentUser && <InputCard />}
    </div>
  );
}
