import React from "react";
import { useSiteContent } from "../SiteContentContext";

const JsonLd = () => {
  const site = useSiteContent();

  React.useEffect(() => {
    if (site.isLoading) return;

    const sameAs = [
      site.social.linkedin,
      site.social.github,
      site.social.twitter,
      site.social.instagram,
      site.social.facebook,
    ].filter(Boolean);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.heroName,
      jobTitle: site.heroRoles?.[0] || "Software Engineer",
      description: site.aboutBio,
      email: site.contactEmail,
      url: window.location.origin,
      image: `${window.location.origin}/images/profile-pic.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.contactLocation,
      },
      knowsAbout: site.heroRoles || [],
      ...(sameAs.length ? { sameAs } : {}),
    };

    const id = "portfolio-jsonld";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);

    return () => {
      el?.remove();
    };
  }, [
    site.isLoading,
    site.heroName,
    site.heroRoles,
    site.aboutBio,
    site.contactEmail,
    site.contactLocation,
    site.social,
  ]);

  return null;
};

export default JsonLd;
