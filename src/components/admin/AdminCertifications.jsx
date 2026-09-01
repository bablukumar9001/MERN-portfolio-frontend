import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useDragReorder from "./useDragReorder";
import { adminFetch } from "../../api";
import ImageField from "./ImageField";

const empty = {
  name: "",
  issuer: "",
  issueDate: "",
  credentialId: "",
  credentialUrl: "",
  image: "",
  order: 0,
};

const AdminCertifications = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const { rowProps } = useDragReorder(items, setItems, "certifications");

  const load = () =>
    adminFetch("/api/admin/certifications")
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
        await adminFetch(`/api/admin/certifications/${editId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Certification updated");
      } else {
        await adminFetch("/api/admin/certifications", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Certification added");
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
      issuer: item.issuer || "",
      issueDate: item.issueDate || "",
      credentialId: item.credentialId || "",
      credentialUrl: item.credentialUrl || "",
      image: item.image || "",
      order: item.order || 0,
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete certification?")) return;
    try {
      await adminFetch(`/api/admin/certifications/${id}`, { method: "DELETE" });
      toast.success("Certification deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Certifications</h1>
      {error && <div className="admin-error">{error}</div>}
      <form className="admin-form" onSubmit={submit}>
        <input name="name" placeholder="Certification name" value={form.name} onChange={onChange} required />
        <input name="issuer" placeholder="Issuer (e.g. Amazon Web Services)" value={form.issuer} onChange={onChange} />
        <input name="issueDate" placeholder="Issue date (e.g. Jun 2024)" value={form.issueDate} onChange={onChange} />
        <input name="credentialId" placeholder="Credential ID" value={form.credentialId} onChange={onChange} />
        <input name="credentialUrl" placeholder="Credential URL" value={form.credentialUrl} onChange={onChange} />
        <ImageField label="Badge / logo URL / path" name="image" value={form.image} onChange={onChange} />
        <input name="order" type="number" placeholder="Order" value={form.order} onChange={onChange} />
        <div className="admin-form-actions">
          <button type="submit">{editId ? "Update" : "Add"} certification</button>
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
              <th>Issuer</th>
              <th>Order</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item._id} {...rowProps(i)}>
                <td>{item.name}</td>
                <td>{item.issuer}</td>
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
                <td colSpan={4}>No certifications yet — the section stays hidden until you add one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCertifications;
