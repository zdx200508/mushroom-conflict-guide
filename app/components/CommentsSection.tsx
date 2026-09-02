"use client";

import { FormEvent, useEffect, useState } from "react";
import { addComment, CommentRecord, getComments } from "../../lib/supabase-comments";

type CommentsSectionProps = { level: number };

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function CommentsSection({ level }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;
    getComments(level)
      .then((rows) => active && setComments(rows))
      .catch(() => {
        if (active) {
          setIsError(true);
          setMessage("评论暂时无法加载，请稍后重试。");
        }
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [level]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanNickname = nickname.trim();
    const cleanContent = content.trim();
    if (!cleanNickname || !cleanContent) {
      setIsError(true);
      setMessage("请填写昵称和评论内容后再发表。");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const saved = await addComment(level, cleanNickname, cleanContent);
      setComments((current) => [saved, ...current]);
      setNickname("");
      setContent("");
      setIsError(false);
      setMessage("评论发表成功。");
    } catch {
      setIsError(true);
      setMessage("评论发表失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="discussion-section" aria-labelledby="discussion-title">
      <div className="discussion-heading">
        <div><span className="section-kicker">03</span><h2 id="discussion-title">玩家讨论</h2></div>
        <span className="comment-count">{loading ? "读取中" : `${comments.length} 条评论`}</span>
      </div>
      <p className="discussion-copy">分享你在第{level}关的通关思路和临场处理方式。</p>

      <form className="discussion-form" onSubmit={handleSubmit} noValidate>
        <label><span>昵称</span><input value={nickname} onChange={(event) => setNickname(event.target.value)} maxLength={30} placeholder="输入昵称" /></label>
        <label className="comment-field"><span>评论内容</span><textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={500} placeholder="说说你的通关思路" rows={3} /></label>
        <button type="submit" disabled={submitting}>{submitting ? "发表中…" : "发表评论"}</button>
      </form>
      {message && <p className={isError ? "form-message error" : "form-message success"} role="status">{message}</p>}

      <div className="comment-list" aria-live="polite">
        {loading && <p className="comment-state">正在读取评论…</p>}
        {!loading && !isError && comments.length === 0 && <p className="comment-state">还没有评论，欢迎分享你的通关思路。</p>}
        {comments.map((comment) => (
          <article className="comment-item" key={comment.id}>
            <div className="comment-meta"><strong>{comment.nickname}</strong><time dateTime={comment.created_at}>{formatTime(comment.created_at)}</time></div>
            <p>{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
