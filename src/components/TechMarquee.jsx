import React, { useEffect, useState } from "react";
import "./css/tech-marquee.css";
import { apiUrl, imageSrc } from "../api";

const FALLBACK_LOGOS = [
  { name: "React.js", image: "/images/react.png" },
  { name: "Next.js", image: "/images/nextjs.png" },
  { name: "Node.js", image: "/images/node.png" },
  { name: "MongoDB", image: "/images/mongodb.png" },
  { name: "TypeScript", image: "/images/typescript.png" },
  { name: "Docker", image: "/images/docker.png" },
  { name: "AWS", image: "/images/aws.png" },
  { name: "Express.js", image: "/images/express.png" },
  { name: "Tailwind CSS", image: "/images/tailwind.png" },
  { name: "Git", image: "/images/git.png" },
];

const TechMarquee = () => {
  const [logos, setLogos] = useState(FALLBACK_LOGOS);

  useEffect(() => {
    fetch(apiUrl("/api/skills"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data) || !data.length) return;
        const withImages = data
          .filter((s) => s.image)
          .map((s) => ({ name: s.name, image: s.image }));
        const unique = [];
        const seen = new Set();
        withImages.forEach((item) => {
          const key = item.image;
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(item);
          }
        });
        if (unique.length >= 6) setLogos(unique);
      })
      .catch(() => {});
  }, []);

  const track = [...logos, ...logos];

  return (
    <section className="tech-marquee-section" aria-label="Technologies">
      <div className="tech-marquee-inner">
        <div className="tech-marquee-track">
          {track.map((item, i) => (
            <div className="tech-marquee-item" key={`${item.name}-${i}`}>
              <img src={imageSrc(item.image)} alt={item.name} loading="lazy" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
