import React, { useState } from "react";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";

const AdminAccount = () => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [busy, setBusy] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm) {
      toast.error("New passwords don't match");
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    setBusy(true);
    try {
      await adminFetch("/api/admin/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      toast.success("Password changed");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Account</h1>
      <form className="admin-form" onSubmit={submit} style={{ maxWidth: 420 }}>
        <h2 className="admin-section-title" style={{ marginTop: 0 }}>
          Change password
        </h2>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current password"
          value={form.currentPassword}
          onChange={onChange}
          required
          autoComplete="current-password"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New password (min 8 chars)"
          value={form.newPassword}
          onChange={onChange}
          required
          autoComplete="new-password"
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm new password"
          value={form.confirm}
          onChange={onChange}
          required
          autoComplete="new-password"
        />
        <div className="admin-form-actions">
          <button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Update password"}
          </button>
        </div>
      </form>
      <p className="admin-muted">
        The account is stored in the database. The <code>ADMIN_EMAIL</code> /{" "}
        <code>ADMIN_PASSWORD</code> env vars only bootstrap it on first login.
      </p>
    </div>
  );
};

export default AdminAccount;
