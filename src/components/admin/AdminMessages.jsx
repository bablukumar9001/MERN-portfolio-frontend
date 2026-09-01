import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sending, setSending] = useState(false);

  const load = () =>
    adminFetch("/api/admin/messages")
      .then(setMessages)
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const select = (msg) => {
    setSelected(msg);
    setReplyBody("");
  };

  const openMessage = async (msg) => {
    select(msg);
    if (!msg.read) {
      try {
        const updated = await adminFetch(`/api/admin/messages/${msg._id}/read`, {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
        });
        setMessages((prev) =>
          prev.map((m) => (m._id === updated._id ? updated : m))
        );
        setSelected(updated);
      } catch (_) {
        /* ignore */
      }
    }
  };

  const toggleRead = async (msg) => {
    try {
      const updated = await adminFetch(`/api/admin/messages/${msg._id}/read`, {
        method: "PATCH",
        body: JSON.stringify({ read: !msg.read }),
      });
      setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
      if (selected?._id === updated._id) setSelected(updated);
      toast.success(updated.read ? "Marked read" : "Marked unread");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await adminFetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success("Message deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    setSending(true);
    try {
      const updated = await adminFetch(
        `/api/admin/messages/${selected._id}/reply`,
        { method: "POST", body: JSON.stringify({ body: replyBody }) }
      );
      setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
      setSelected(updated);
      setReplyBody("");
      toast.success(`Reply emailed to ${updated.email}`);
    } catch (err) {
      toast.error(err.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div>
      <h1 className="admin-page-title">Messages</h1>
      <div className="admin-split">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr
                  key={m._id}
                  className={`${!m.read ? "unread" : ""} ${
                    selected?._id === m._id ? "selected" : ""
                  }`}
                  onClick={() => openMessage(m)}
                >
                  <td>{m.name}</td>
                  <td>{m.subject}</td>
                  <td>{new Date(m.date).toLocaleString()}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn-sm danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(m._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={4}>No messages</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="admin-detail">
            <div className="admin-detail-actions">
              <button type="button" onClick={() => toggleRead(selected)}>
                Mark {selected.read ? "unread" : "read"}
              </button>
              <button
                type="button"
                className="danger"
                onClick={() => remove(selected._id)}
              >
                Delete
              </button>
            </div>
            <h2>{selected.subject}</h2>
            <p>
              <strong>{selected.name}</strong> ·{" "}
              <a href={`mailto:${selected.email}`}>{selected.email}</a> ·{" "}
              {selected.mobile}
            </p>
            <p className="admin-muted">
              {new Date(selected.date).toLocaleString()}
            </p>
            <div className="admin-message-body">{selected.message}</div>

            {selected.replies?.length > 0 && (
              <div className="admin-reply-history">
                <strong>Your replies</strong>
                {selected.replies.map((r, i) => (
                  <div key={i} className="admin-reply-item">
                    {r.body}
                    <span className="admin-muted">
                      {new Date(r.sentAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <form className="admin-reply-box" onSubmit={sendReply}>
              <strong>Reply by email</strong>
              <textarea
                rows={4}
                placeholder={`Write a reply to ${selected.name}…`}
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
              />
              <div className="admin-form-actions">
                <button type="submit" disabled={sending || !replyBody.trim()}>
                  {sending ? "Sending…" : "Send reply"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
