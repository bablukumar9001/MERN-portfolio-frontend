import React, { useState } from "react";
import { uploadImage, imageSrc } from "../../api";
import { toast } from "react-toastify";

// Text input for an image path/URL + an "Upload" button that stores a file
// in the backend and fills the field with the resulting /api/images/... URL.
const ImageField = ({ label, name, value, onChange }) => {
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const { url } = await uploadImage(file);
      onChange({ target: { name, value: url } });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setBusy(false);
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
      </div>
      {value && (
        <img className="admin-image-preview" src={imageSrc(value)} alt="preview" />
      )}
    </div>
  );
};

export default ImageField;
