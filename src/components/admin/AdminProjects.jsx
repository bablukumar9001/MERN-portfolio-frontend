import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";
import ImageField from "./ImageField";
import useDragReorder from "./useDragReorder";

const empty = {
  title: "",
  description: "",
  tools: "",
  accomplishments: "",
  tags: "",
  liveLink: "",
  sourceLink: "",
  src: "",
  problem: "",
  solution: "",
  metrics: "",
  myRole: "",
  featured: false,
  order: 0,
};

const AdminProjects = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const { rowProps } = useDragReorder(items, setItems, "projects");

  const load = () =>
    adminFetch("/api/admin/projects")
      .then(setItems)
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
      tags: String(form.tags)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (editId) {
        await adminFetch(`/api/admin/projects/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Project updated");
      } else {
        await adminFetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Project added");
      }
      reset();
      load();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title || "",
      description: item.description || "",
      tools: item.tools || "",
      accomplishments: (item.accomplishments || []).join("\n"),
      tags: (item.tags || []).join(", "),
      liveLink: item.liveLink || "",
      sourceLink: item.sourceLink || "",
      src: item.src || "",
      problem: item.problem || "",
      solution: item.solution || "",
      metrics: item.metrics || "",
      myRole: item.myRole || "",
      featured: Boolean(item.featured),
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete project?")) return;
    try {
      await adminFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      toast.success("Project deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
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
        <h3 className="admin-section-title" style={{ fontSize: "0.95rem" }}>Case study (optional)</h3>
        <input name="myRole" placeholder="My role on this project" value={form.myRole} onChange={onChange} />
        <textarea name="problem" placeholder="The problem" value={form.problem} onChange={onChange} rows={2} />
        <textarea name="solution" placeholder="The solution" value={form.solution} onChange={onChange} rows={2} />
        <input name="metrics" placeholder="Impact & results (e.g. 40% faster load time)" value={form.metrics} onChange={onChange} />
        <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
          <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
          Featured spotlight project
        </label>
        <input name="tags" placeholder="Tags (comma separated — e.g. Web3, Full-Stack)" value={form.tags} onChange={onChange} />
        <input name="liveLink" placeholder="Live link" value={form.liveLink} onChange={onChange} />
        <input name="sourceLink" placeholder="Source link" value={form.sourceLink} onChange={onChange} />
        <ImageField label="Project image URL / path" name="src" value={form.src} onChange={onChange} />
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

      <p className="admin-muted">Drag rows to reorder.</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item._id} {...rowProps(i)}>
                <td>{item.title}</td>
                <td>{(item.tags || []).join(", ")}</td>
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
