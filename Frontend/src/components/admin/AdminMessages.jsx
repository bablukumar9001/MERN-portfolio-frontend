import React, { useEffect, useState } from "react";
import { adminFetch } from "../../api";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    adminFetch("/api/admin/messages")
      .then(setMessages)
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const openMessage = async (msg) => {
    setSelected(msg);
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
    const updated = await adminFetch(`/api/admin/messages/${msg._id}/read`, {
      method: "PATCH",
      body: JSON.stringify({ read: !msg.read }),
    });
    setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
    if (selected?._id === updated._id) setSelected(updated);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await adminFetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m._id !== id));
    if (selected?._id === id) setSelected(null);
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
