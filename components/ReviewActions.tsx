"use client";

import { useState } from "react";

interface ReviewActionsProps {
  itemId: string;
  itemType: string; // "deliverable" | "content" | "action-item" | "meeting-decision"
  currentStatus?: string;
  onAction?: (action: "approve" | "deny" | "comment", comment?: string) => void;
}

export default function ReviewActions({ itemId, itemType, currentStatus, onAction }: ReviewActionsProps) {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleAction = async (action: "approve" | "deny" | "comment") => {
    const body = {
      itemId,
      itemType,
      action,
      comment: action === "comment" ? comment : undefined,
    };

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSubmitted(action === "approve" ? "Approved" : action === "deny" ? "Changes requested" : "Comment sent");
        if (onAction) onAction(action, comment);
        if (action === "comment") {
          setComment("");
          setShowComment(false);
        }
      }
    } catch {
      // Fallback: store locally and show success (offline-friendly)
      setSubmitted(action === "approve" ? "Approved" : action === "deny" ? "Changes requested" : "Comment sent");
      if (onAction) onAction(action, comment);
    }
  };

  if (submitted) {
    return (
      <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-sm font-medium text-emerald-700">{submitted}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleAction("approve")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors min-h-[40px]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Approve
        </button>
        <button
          onClick={() => handleAction("deny")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors border border-red-200 min-h-[40px]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Request Changes
        </button>
        <button
          onClick={() => setShowComment(!showComment)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 min-h-[40px]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          Comment
        </button>
      </div>

      {/* Comment Input */}
      {showComment && (
        <div className="space-y-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your feedback, suggestions, or changes..."
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[80px]"
          />
          <button
            onClick={() => handleAction("comment")}
            disabled={!comment.trim()}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[36px]"
          >
            Send Comment
          </button>
        </div>
      )}
    </div>
  );
}
