import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";

const empty = {
  resumeUrl: "",
  heroGreeting: "",
  heroName: "",
  heroLocation: "",
  heroRoles: "",
  aboutBio: "",
  aboutYears: "",
  contactEmail: "",
  contactPhone: "",
  contactLocation: "",
  footerText: "",
  social: { instagram: "", facebook: "", twitter: "", linkedin: "", github: "" },
};

const AdminSiteContent = () => {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/admin/site-content")
      .then((doc) => {
        setForm({
          resumeUrl: doc.resumeUrl || "",
          heroGreeting: doc.heroGreeting || "",
          heroName: doc.heroName || "",
          heroLocation: doc.heroLocation || "",
          heroRoles: (doc.heroRoles || []).join("\n"),
          aboutBio: doc.aboutBio || "",
          aboutYears: doc.aboutYears || "",
          contactEmail: doc.contactEmail || "",
          contactPhone: doc.contactPhone || "",
          contactLocation: doc.contactLocation || "",
          footerText: doc.footerText || "",
          social: {
            instagram: doc.social?.instagram || "",
            facebook: doc.social?.facebook || "",
            twitter: doc.social?.twitter || "",
            linkedin: doc.social?.linkedin || "",
            github: doc.social?.github || "",
          },
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setSaved(false);
    if (name.startsWith("social.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, social: { ...f.social, [key]: value } }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSaved(false);
    const payload = {
      ...form,
      heroRoles: String(form.heroRoles)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      await adminFetch("/api/admin/site-content", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setSaved(true);
      toast.success("Site content saved");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Site Content</h1>
      {error && <div className="admin-error">{error}</div>}
      {saved && (
        <div className="admin-error" style={{ background: "#ecfdf5", color: "#047857" }}>
          Saved. Refresh the site to see changes.
        </div>
      )}

      <form className="admin-form" onSubmit={submit}>
        <h2 className="admin-section-title">Resume</h2>
        <input name="resumeUrl" placeholder="Resume / CV link" value={form.resumeUrl} onChange={onChange} />

        <h2 className="admin-section-title">Home hero</h2>
        <input name="heroGreeting" placeholder="Greeting line" value={form.heroGreeting} onChange={onChange} />
        <input name="heroName" placeholder="Your name" value={form.heroName} onChange={onChange} />
        <input name="heroLocation" placeholder="Location line (e.g. based in India)" value={form.heroLocation} onChange={onChange} />
        <textarea name="heroRoles" placeholder="Typing roles (one per line)" value={form.heroRoles} onChange={onChange} rows={4} />

        <h2 className="admin-section-title">About</h2>
        <textarea name="aboutBio" placeholder="Bio paragraph" value={form.aboutBio} onChange={onChange} rows={5} />
        <input name="aboutYears" placeholder="Years of experience (e.g. 2+)" value={form.aboutYears} onChange={onChange} />

        <h2 className="admin-section-title">Contact</h2>
        <input name="contactEmail" placeholder="Email" value={form.contactEmail} onChange={onChange} />
        <input name="contactPhone" placeholder="Phone" value={form.contactPhone} onChange={onChange} />
        <input name="contactLocation" placeholder="Location" value={form.contactLocation} onChange={onChange} />

        <h2 className="admin-section-title">Footer</h2>
        <textarea name="footerText" placeholder="Footer about text" value={form.footerText} onChange={onChange} rows={3} />

        <h2 className="admin-section-title">Social links</h2>
        <input name="social.instagram" placeholder="Instagram URL" value={form.social.instagram} onChange={onChange} />
        <input name="social.facebook" placeholder="Facebook URL" value={form.social.facebook} onChange={onChange} />
        <input name="social.twitter" placeholder="Twitter URL" value={form.social.twitter} onChange={onChange} />
        <input name="social.linkedin" placeholder="LinkedIn URL" value={form.social.linkedin} onChange={onChange} />
        <input name="social.github" placeholder="GitHub URL" value={form.social.github} onChange={onChange} />

        <div className="admin-form-actions">
          <button type="submit">Save site content</button>
        </div>
      </form>
    </div>
  );
};

export default AdminSiteContent;
