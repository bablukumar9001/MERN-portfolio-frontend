import React, { useEffect, useState } from "react";
import { adminFetch } from "../../api";

const CATEGORIES = [
  "Languages and Databases",
  "Libraries and Frameworks",
  "Tools & Technologies",
];

const empty = {
  name: "",
  image: "",
  category: CATEGORIES[0],
  order: 0,
};

const AdminSkills = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    adminFetch("/api/admin/skills")
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
        await adminFetch(`/api/admin/skills/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/api/admin/skills", {
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
      name: item.name || "",
      image: item.image || "",
      category: item.category || CATEGORIES[0],
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete skill?")) return;
    await adminFetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="admin-page-title">Skills</h1>
      {error && <div className="admin-error">{error}</div>}
      <form className="admin-form" onSubmit={submit}>
        <input name="name" placeholder="Skill name" value={form.name} onChange={onChange} required />
        <input name="image" placeholder="Image path" value={form.image} onChange={onChange} />
        <select name="category" value={form.category} onChange={onChange}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input name="order" type="number" placeholder="Order" value={form.order} onChange={onChange} />
        <div className="admin-form-actions">
          <button type="submit">{editId ? "Update" : "Add"} skill</button>
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
              <th>Name</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
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

export default AdminSkills;
