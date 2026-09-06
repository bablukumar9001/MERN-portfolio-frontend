import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";
import ResumeField from "./ResumeField";
import { DEFAULT_SITE_CONTENT } from "../../SiteContentContext";

const empty = {
  resumeUrl: "",
  bookingUrl: "",
  nowTitle: "",
  nowDescription: "",
  heroGreeting: "",
  heroName: "",
  heroLocation: "",
  heroRoles: "",
  aboutBio: "",
  aboutYears: "",
  availabilityText: "",
  availabilityOpen: true,
  servicesIntro: "",
  servicesEngagementNote: "",
  impactMetrics: [],
  workProcess: [],
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
          bookingUrl: doc.bookingUrl || "",
          nowTitle: doc.nowTitle || "",
          nowDescription: doc.nowDescription || "",
          heroGreeting: doc.heroGreeting || "",
          heroName: doc.heroName || "",
          heroLocation: doc.heroLocation || "",
          heroRoles: (doc.heroRoles || []).join("\n"),
          aboutBio: doc.aboutBio || "",
          aboutYears: doc.aboutYears || "",
          availabilityText:
            doc.availabilityText || DEFAULT_SITE_CONTENT.availabilityText,
          availabilityOpen:
            doc.availabilityOpen !== undefined
              ? Boolean(doc.availabilityOpen)
              : DEFAULT_SITE_CONTENT.availabilityOpen,
          servicesIntro: doc.servicesIntro || DEFAULT_SITE_CONTENT.servicesIntro,
          servicesEngagementNote:
            doc.servicesEngagementNote || DEFAULT_SITE_CONTENT.servicesEngagementNote,
          impactMetrics:
            doc.impactMetrics?.length
              ? doc.impactMetrics
              : DEFAULT_SITE_CONTENT.impactMetrics,
          workProcess:
            doc.workProcess?.length
              ? doc.workProcess
              : DEFAULT_SITE_CONTENT.workProcess,
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
    const { name, value, type, checked } = e.target;
    setSaved(false);
    if (name.startsWith("social.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, social: { ...f.social, [key]: value } }));
    } else if (name === "availabilityOpen") {
      setForm((f) => ({ ...f, availabilityOpen: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "number" ? Number(value) : value }));
    }
  };

  const updateMetric = (index, field, value) => {
    setSaved(false);
    setForm((f) => ({
      ...f,
      impactMetrics: f.impactMetrics.map((m, i) =>
        i === index ? { ...m, [field]: field === "value" ? Number(value) : value } : m
      ),
    }));
  };

  const updateProcess = (index, field, value) => {
    setSaved(false);
    setForm((f) => ({
      ...f,
      workProcess: f.workProcess.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
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
      workProcess: form.workProcess.map((s, i) => ({
        ...s,
        order: i + 1,
      })),
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
        <ResumeField label="Resume / CV" name="resumeUrl" value={form.resumeUrl} onChange={onChange} />

        <h2 className="admin-section-title">Now strip</h2>
        <input name="nowTitle" placeholder="Currently working on (title)" value={form.nowTitle} onChange={onChange} />
        <textarea name="nowDescription" placeholder="Short description (optional)" value={form.nowDescription} onChange={onChange} rows={2} />

        <h2 className="admin-section-title">Availability</h2>
        <input name="availabilityText" placeholder="e.g. Open to full-time & freelance" value={form.availabilityText} onChange={onChange} />
        <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
          <input type="checkbox" name="availabilityOpen" checked={form.availabilityOpen} onChange={onChange} />
          Show availability badge (green dot)
        </label>

        <h2 className="admin-section-title">Services copy</h2>
        <textarea name="servicesIntro" placeholder="Services section intro" value={form.servicesIntro} onChange={onChange} rows={2} />
        <input name="servicesEngagementNote" placeholder="Engagement note (e.g. Typical: 2–8 weeks MVP)" value={form.servicesEngagementNote} onChange={onChange} />

        <h2 className="admin-section-title">Impact metrics</h2>
        {form.impactMetrics.map((m, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 60px 1fr", gap: "8px", marginBottom: "8px" }}>
            <input type="number" placeholder="Value" value={m.value} onChange={(e) => updateMetric(i, "value", e.target.value)} />
            <input placeholder="+" value={m.suffix} onChange={(e) => updateMetric(i, "suffix", e.target.value)} />
            <input placeholder="Label" value={m.label} onChange={(e) => updateMetric(i, "label", e.target.value)} />
          </div>
        ))}

        <h2 className="admin-section-title">How I work (process steps)</h2>
        {form.workProcess.map((s, i) => (
          <div key={i} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0" }}>
            <input placeholder={`Step ${i + 1} title`} value={s.title} onChange={(e) => updateProcess(i, "title", e.target.value)} />
            <textarea placeholder="Description" value={s.description} onChange={(e) => updateProcess(i, "description", e.target.value)} rows={2} style={{ marginTop: "6px" }} />
          </div>
        ))}

        <h2 className="admin-section-title">Home hero</h2>
        <input name="heroGreeting" placeholder="Greeting line" value={form.heroGreeting} onChange={onChange} />
        <input name="heroName" placeholder="Your name" value={form.heroName} onChange={onChange} />
        <input name="heroLocation" placeholder="Location line" value={form.heroLocation} onChange={onChange} />
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
