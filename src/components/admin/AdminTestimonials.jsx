import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useDragReorder from "./useDragReorder";
import { adminFetch } from "../../api";
import ImageField from "./ImageField";

const empty = {
  name: "",
  role: "",
  company: "",
  quote: "",
  avatar: "",
  linkedinUrl: "",
  order: 0,
};

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const { rowProps } = useDragReorder(items, setItems, "testimonials");

  const load = () =>
    adminFetch("/api/admin/testimonials")
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
        await adminFetch(`/api/admin/testimonials/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Testimonial updated");
      } else {
        await adminFetch("/api/admin/testimonials", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Testimonial added");
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
      name: item.name || "",
      role: item.role || "",
      company: item.company || "",
      quote: item.quote || "",
      avatar: item.avatar || "",
      linkedinUrl: item.linkedinUrl || "",
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete testimonial?")) return;
    try {
      await adminFetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      toast.success("Testimonial deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Testimonials</h1>
      {error && <div className="admin-error">{error}</div>}
      <form className="admin-form" onSubmit={submit}>
        <input name="name" placeholder="Person's name" value={form.name} onChange={onChange} required />
        <input name="role" placeholder="Role (e.g. Engineering Manager)" value={form.role} onChange={onChange} />
        <input name="company" placeholder="Company" value={form.company} onChange={onChange} />
        <textarea name="quote" placeholder="Quote / recommendation" value={form.quote} onChange={onChange} rows={4} required />
        <ImageField label="Avatar URL / upload" name="avatar" value={form.avatar} onChange={onChange} />
        <input name="linkedinUrl" placeholder="LinkedIn profile URL (optional)" value={form.linkedinUrl} onChange={onChange} />
        <input name="order" type="number" placeholder="Order" value={form.order} onChange={onChange} />
        <div className="admin-form-actions">
          <button type="submit">{editId ? "Update" : "Add"} testimonial</button>
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
              <th>Company</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item._id} {...rowProps(i)}>
                <td>{item.name}</td>
                <td>{item.company}</td>
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
            {items.length === 0 && (
              <tr>
                <td colSpan={4}>No testimonials yet — the section stays hidden until you add one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestimonials;
