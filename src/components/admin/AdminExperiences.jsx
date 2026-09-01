import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useDragReorder from "./useDragReorder";
import { adminFetch } from "../../api";
import ImageField from "./ImageField";

const empty = {
  companyName: "",
  position: "",
  duration: "",
  location: "",
  companyLogo: "",
  color: "#4f46e5",
  icon: "fas fa-briefcase",
  achievements: "",
  order: 0,
};

const AdminExperiences = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const { rowProps } = useDragReorder(items, setItems, "experiences");

  const load = () =>
    adminFetch("/api/admin/experiences")
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
      achievements: String(form.achievements)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (editId) {
        await adminFetch(`/api/admin/experiences/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Experience updated");
      } else {
        await adminFetch("/api/admin/experiences", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Experience added");
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
      companyName: item.companyName || "",
      position: item.position || "",
      duration: item.duration || "",
      location: item.location || "",
      companyLogo: item.companyLogo || "",
      color: item.color || "#4f46e5",
      icon: item.icon || "fas fa-briefcase",
      achievements: (item.achievements || []).join("\n"),
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete experience?")) return;
    try {
      await adminFetch(`/api/admin/experiences/${id}`, { method: "DELETE" });
      toast.success("Experience deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Experience</h1>
      {error && <div className="admin-error">{error}</div>}
      <form className="admin-form" onSubmit={submit}>
        <input name="companyName" placeholder="Company" value={form.companyName} onChange={onChange} required />
        <input name="position" placeholder="Position" value={form.position} onChange={onChange} required />
        <input name="duration" placeholder="Duration" value={form.duration} onChange={onChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={onChange} />
        <ImageField label="Company logo URL / path" name="companyLogo" value={form.companyLogo} onChange={onChange} />
        <input name="color" placeholder="Color" value={form.color} onChange={onChange} />
        <input name="icon" placeholder="Icon class" value={form.icon} onChange={onChange} />
        <textarea name="achievements" placeholder="Achievements (one per line)" value={form.achievements} onChange={onChange} rows={4} />
        <input name="order" type="number" placeholder="Order" value={form.order} onChange={onChange} />
        <div className="admin-form-actions">
          <button type="submit">{editId ? "Update" : "Add"} experience</button>
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
              <th>Company</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item._id} {...rowProps(i)}>
                <td>{item.companyName}</td>
                <td>{item.position}</td>
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

export default AdminExperiences;
