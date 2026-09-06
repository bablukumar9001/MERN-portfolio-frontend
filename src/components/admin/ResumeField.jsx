import React, { useState } from "react";
import { uploadFile, resumeHref, adminFetch } from "../../api";
import { toast } from "react-toastify";

const uploadedId = (ref) => {
  const m = /\/api\/images\/([a-f0-9]{24})/i.exec(ref || "");
  return m ? m[1] : null;
};

const ResumeField = ({ label, name, value, onChange }) => {
  const [busy, setBusy] = useState(false);

  const setValue = (v) => onChange({ target: { name, value: v } });

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const { url } = await uploadFile(file);
      const oldId = uploadedId(value);
      if (oldId) {
        adminFetch(`/api/admin/images/${oldId}`, { method: "DELETE" }).catch(() => {});
      }
      setValue(url);
      toast.success("Resume uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const clear = async () => {
    const id = uploadedId(value);
    setValue("");
    if (id) {
      try {
        await adminFetch(`/api/admin/images/${id}`, { method: "DELETE" });
        toast.success("Resume removed");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const isUploaded = Boolean(uploadedId(value));

  return (
    <div className="admin-image-field">
      <div className="admin-image-field-row">
        <input
          name={name}
          placeholder={label || "Resume URL (optional if uploading)"}
          value={value || ""}
          onChange={onChange}
        />
        <label className="admin-upload-btn">
          {busy ? "Uploading…" : "Upload PDF"}
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={pick}
            hidden
            disabled={busy}
          />
        </label>
        {value && (
          <button type="button" className="admin-btn-sm danger" onClick={clear}>
            Remove
          </button>
        )}
      </div>
      {value && (
        <p className="admin-resume-preview">
          {isUploaded ? (
            <a href={resumeHref(value)} download="Resume.pdf" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-file-pdf"></i> View current resume
            </a>
          ) : (
            <a href={value} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt"></i> External resume link
            </a>
          )}
        </p>
      )}
    </div>
  );
};

export default ResumeField;
