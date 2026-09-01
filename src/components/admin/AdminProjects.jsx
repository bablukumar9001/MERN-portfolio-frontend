import React, { useEffect, useState } from "react";
import { adminFetch } from "../../api";

const empty = {
  title: "",
  description: "",
  tools: "",
  accomplishments: "",
  liveLink: "",
  sourceLink: "",
  src: "",
  order: 0,
};

const AdminProjects = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    adminFetch("/api/admin/projects")
      .then(setItems)
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const reset = () => {
    setForm(empty);
    setEditId(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      order: Number(form.order) || 0,
      accomplishments: String(form.accomplishments)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (editId) {
        await adminFetch(`/api/admin/projects/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      reset();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title || "",
      description: item.description || "",
      tools: item.tools || "",
      accomplishments: (item.accomplishments || []).join("\n"),
      liveLink: item.liveLink || "",
      sourceLink: item.sourceLink || "",
      src: item.src || "",
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await adminFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="admin-page-title">Projects</h1>
      {error && <div className="admin-error">{error}</div>}
      <form className="admin-form" onSubmit={submit}>
        <input name="title" placeholder="Title" value={form.title} onChange={onChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} required rows={3} />
        <input name="tools" placeholder="Tools (comma separated)" value={form.tools} onChange={onChange} />
        <textarea name="accomplishments" placeholder="Features (one per line)" value={form.accomplishments} onChange={onChange} rows={4} />
        <input name="liveLink" placeholder="Live link" value={form.liveLink} onChange={onChange} />
        <input name="sourceLink" placeholder="Source link" value={form.sourceLink} onChange={onChange} />
        <input name="src" placeholder="Image URL / path" value={form.src} onChange={onChange} />
        <input name="order" type="number" placeholder="Order" value={form.order} onChange={onChange} />
        <div className="admin-form-actions">
          <button type="submit">{editId ? "Update" : "Add"} project</button>
          {editId && (
            <button type="button" onClick={reset}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.order}</td>
                <td className="admin-row-actions">
                  <button type="button" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                  <button type="button" className="danger" onClick={() => remove(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProjects;
