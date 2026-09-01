const API_BASE = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

export const apiUrl = (path) => {
  const p = path.startsWith("/") ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${p}` : p;
};

// Resolve an image reference for an <img src>.
// - http(s):// or data: URLs        -> used as-is
// - /api/images/... (uploaded)      -> prefixed with the API base
// - anything else (/images/foo.png) -> left as a static frontend asset
export const imageSrc = (ref) => {
  if (!ref) return ref;
  if (/^(https?:)?\/\//i.test(ref) || ref.startsWith("data:")) return ref;
  if (ref.startsWith("/api/")) return apiUrl(ref);
  return ref;
};

// Upload a File (from an <input type=file>) and get back { url }.
export const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = async () => {
      try {
        const data = await adminFetch("/api/admin/upload", {
          method: "POST",
          body: JSON.stringify({ dataUrl: reader.result, filename: file.name }),
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsDataURL(file);
  });

export const getToken = () => localStorage.getItem("adminToken");

export const adminFetch = async (path, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(apiUrl(path), { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
};
