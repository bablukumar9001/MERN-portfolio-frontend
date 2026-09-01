import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useDragReorder from "./useDragReorder";
import { adminFetch } from "../../api";

const empty = {
  degree: "",
  institution: "",
  year: "",
  description: "",
  icon: "fas fa-graduation-cap",
  color: "#4f46e5",
  order: 0,
};

const AdminEducation = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const { rowProps } = useDragReorder(items, setItems, "education");

  const load = () =>
    adminFetch("/api/admin/education")
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
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editId) {
        await adminFetch(`/api/admin/education/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Education updated");
      } else {
        await adminFetch("/api/admin/education", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Education added");
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
      degree: item.degree || "",
      institution: item.institution || "",
      year: item.year || "",
      description: item.description || "",
      icon: item.icon || "fas fa-graduation-cap",
      color: item.color || "#4f46e5",
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete education entry?")) return;
    try {
      await adminFetch(`/api/admin/education/${id}`, { method: "DELETE" });
      toast.success("Education deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Education</h1>
      {error && <div className="admin-error">{error}</div>}
      <form className="admin-form" onSubmit={submit}>
        <input name="degree" placeholder="Degree" value={form.degree} onChange={onChange} required />
        <input name="institution" placeholder="Institution" value={form.institution} onChange={onChange} required />
        <input name="year" placeholder="Year (e.g. 2021 - 2023)" value={form.year} onChange={onChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} rows={3} />
        <input name="icon" placeholder="Icon class (e.g. fas fa-university)" value={form.icon} onChange={onChange} />
        <input name="color" placeholder="Color (e.g. #4f46e5)" value={form.color} onChange={onChange} />
        <input name="order" type="number" placeholder="Order" value={form.order} onChange={onChange} />
        <div className="admin-form-actions">
          <button type="submit">{editId ? "Update" : "Add"} education</button>
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
              <th>Degree</th>
              <th>Institution</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item._id} {...rowProps(i)}>
                <td>{item.degree}</td>
                <td>{item.institution}</td>
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

export default AdminEducation;
