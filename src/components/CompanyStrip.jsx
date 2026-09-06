import React, { useEffect, useState } from "react";
import "./css/company-strip.css";
import { apiUrl, imageSrc } from "../api";

const FALLBACK_COMPANIES = [
  { name: "Flexsin Technologies", logo: "" },
  { name: "Brancosoft Pvt. Ltd.", logo: "/images/brancosoft.png" },
  { name: "DRPU Software Pvt. Ltd.", logo: "/images/drpu.jpg" },
  { name: "Veavix", logo: "" },
];

const uniqueCompanies = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const CompanyStrip = () => {
  const [companies, setCompanies] = useState(FALLBACK_COMPANIES);

  useEffect(() => {
    fetch(apiUrl("/api/experiences"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data) || !data.length) return;
        const mapped = uniqueCompanies(
          data.map((e) => ({
            name: e.companyName,
            logo: e.companyLogo || "",
          }))
        );
        if (mapped.length) setCompanies(mapped);
      })
      .catch(() => {});
  }, []);

  const track = [...companies, ...companies];

  return (
    <section className="company-strip-section" aria-label="Companies I've worked with">
      <div className="container">
        <p className="company-strip-label">Trusted by teams at</p>
      </div>
      <div className="company-strip-inner">
        <div className="company-strip-track">
          {track.map((item, i) => (
            <div className="company-strip-item" key={`${item.name}-${i}`}>
              {item.logo ? (
                <img src={imageSrc(item.logo)} alt={item.name} loading="lazy" />
              ) : (
                <span className="company-strip-initials" aria-hidden="true">
                  {item.name
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </span>
              )}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStrip;
