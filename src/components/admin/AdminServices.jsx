import React, { useEffect, useState } from "react";
import { adminFetch } from "../../api";

// Icons available from react-icons/fa (see Services.jsx mapping).
const ICON_OPTIONS = [
  "FaCode",
  "FaReact",
  "FaDatabase",
  "FaMobileAlt",
  "FaLaptopCode",
  "FaNetworkWired",
  "FaServer",
  "FaTools",
];

const empty = {
  title: "",
  description: "",
  icon: "FaCode",
  order: 0,
};

const AdminServices = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const load = () =>
    adminFetch("/api/admin/services")
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
        await adminFetch(`/api/admin/services/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch("/api/admin/services", {
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
      icon: item.icon || "FaCode",
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete service?")) return;
    await adminFetch(`/api/admin/services/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="admin-page-title">Services</h1>
      {error && <div className="admin-error">{error}</div>}
      <form className="admin-form" onSubmit={submit}>
        <input name="title" placeholder="Service title" value={form.title} onChange={onChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} rows={3} />
        <select name="icon" value={form.icon} onChange={onChange}>
          {ICON_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input name="order" type="number" placeholder="Order" value={form.order} onChange={onChange} />
        <div className="admin-form-actions">
          <button type="submit">{editId ? "Update" : "Add"} service</button>
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
              <th>Icon</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.icon}</td>
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

export default AdminServices;
