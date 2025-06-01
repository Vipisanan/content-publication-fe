import React from "react";
import CommentForm from "../forms/CommentForm";

/**
 * @param {Object} props
 * @param {Array} props.comments
 * @param {function} props.onAddComment
 */
const CommentSection = ({ writerId, comments, onAddComment }) => {
  return (
    <div className="bg-gray-50 py-6 px-4 rounded shadow-sm">
      <CommentForm onSubmit={onAddComment} />
      <div className="mt-8">
        <h3 className="font-bold mb-2">Comments</h3>
        <ul>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id} className="border-b py-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{comment.text}</span>
                  <span className="text-xs text-gray-400">
                    {comment.createdAt &&
                      new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                {/* Optionally show userId or contentId */}
                {writerId === comment.userId ? (
                  <div className="text-xs text-gray-500">
                    Owner:{" "}
                    {comment?.user?.profile === null
                      ? comment?.user?.email
                      : comment?.user?.profile?.displayName}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">
                    User:{" "}
                    {comment?.user?.profile === null
                      ? comment?.user?.email
                      : comment?.user?.profile?.displayName}
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No comments yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommentSection;
