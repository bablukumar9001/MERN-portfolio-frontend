import React, { useState } from "react";
import { uploadImage, imageSrc, adminFetch } from "../../api";
import { toast } from "react-toastify";

const uploadedId = (ref) => {
  const m = /\/api\/images\/([a-f0-9]{24})/i.exec(ref || "");
  return m ? m[1] : null;
};

// Text input for an image path/URL + an "Upload" button that stores a file
// in the backend and fills the field with the resulting /api/images/... URL.
// The "Remove" button clears the field and deletes the uploaded image from the DB.
const ImageField = ({ label, name, value, onChange }) => {
  const [busy, setBusy] = useState(false);

  const setValue = (v) => onChange({ target: { name, value: v } });

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const { url } = await uploadImage(file);
      // if we're replacing a previously uploaded image, drop the old one
      const oldId = uploadedId(value);
      if (oldId) {
        adminFetch(`/api/admin/images/${oldId}`, { method: "DELETE" }).catch(() => {});
      }
      setValue(url);
      toast.success("Image uploaded");
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
        toast.success("Image removed");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="admin-image-field">
      <div className="admin-image-field-row">
        <input
          name={name}
          placeholder={label || "Image URL / path"}
          value={value || ""}
          onChange={onChange}
        />
        <label className="admin-upload-btn">
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" onChange={pick} hidden disabled={busy} />
        </label>
        {value && (
          <button type="button" className="admin-btn-sm danger" onClick={clear}>
            Remove
          </button>
        )}
      </div>
      {value && (
        <img className="admin-image-preview" src={imageSrc(value)} alt="preview" />
      )}
    </div>
  );
};

export default ImageField;
