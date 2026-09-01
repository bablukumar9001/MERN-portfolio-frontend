import React, { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "./api";

// Defaults mirror the values that used to be hard-coded in the components,
// so the site looks identical until the DB is seeded / edited via admin.
export const DEFAULT_SITE_CONTENT = {
  resumeUrl:
    "https://drive.google.com/file/d/15aOdmnAreAGIj3IoGbr2knPda-UNOxM-/view?usp=sharing",
  heroGreeting: "WELCOME TO MY WORLD",
  heroName: "Bablu kumar",
  heroLocation: "based in Ghaziabad, India",
  heroRoles: [
    "Software Engineer",
    "Full Stack Developer",
    "MERN Developer",
    "Next.js Developer",
  ],
  aboutBio:
    "I'm Bablu Kumar, a Full Stack Developer with 3+ years of experience building scalable web applications with Next.js, React.js, TypeScript, Node.js, Express.js and MongoDB. I design RESTful APIs and microservices-based architectures, and work across authentication, payment integration, real-time communication, cloud deployments and performance optimization. I'm skilled with Docker, AWS EC2, PM2, Nginx, Swagger and CI/CD, with hands-on experience delivering enterprise production applications.",
  aboutYears: "3+",
  contactEmail: "bablukumar09001@gmail.com",
  contactPhone: "+91 8920549001",
  contactLocation: "Lal Kuan, Ghaziabad, Uttar Pradesh, India",
  footerText:
    "Full stack developer building scalable, production-grade web applications with Next.js, the MERN stack and microservices architecture.",
  social: {
    instagram: "https://www.instagram.com/abhay__9001/",
    facebook: "https://www.facebook.com/abhay559722/",
    twitter: "https://twitter.com/babluku9001",
    linkedin: "https://www.linkedin.com/in/bablu-kumar-a0aa16231/",
    github: "https://github.com/bablukumar9001",
  },
};

const SiteContentContext = createContext(DEFAULT_SITE_CONTENT);

export const useSiteContent = () => useContext(SiteContentContext);

const merge = (data) => {
  if (!data || typeof data !== "object") return DEFAULT_SITE_CONTENT;
  const pick = (v, fallback) =>
    v === undefined || v === null || v === "" ? fallback : v;
  return {
    resumeUrl: pick(data.resumeUrl, DEFAULT_SITE_CONTENT.resumeUrl),
    heroGreeting: pick(data.heroGreeting, DEFAULT_SITE_CONTENT.heroGreeting),
    heroName: pick(data.heroName, DEFAULT_SITE_CONTENT.heroName),
    heroLocation: pick(data.heroLocation, DEFAULT_SITE_CONTENT.heroLocation),
    heroRoles:
      Array.isArray(data.heroRoles) && data.heroRoles.length
        ? data.heroRoles
        : DEFAULT_SITE_CONTENT.heroRoles,
    aboutBio: pick(data.aboutBio, DEFAULT_SITE_CONTENT.aboutBio),
    aboutYears: pick(data.aboutYears, DEFAULT_SITE_CONTENT.aboutYears),
    contactEmail: pick(data.contactEmail, DEFAULT_SITE_CONTENT.contactEmail),
    contactPhone: pick(data.contactPhone, DEFAULT_SITE_CONTENT.contactPhone),
    contactLocation: pick(
      data.contactLocation,
      DEFAULT_SITE_CONTENT.contactLocation
    ),
    footerText: pick(data.footerText, DEFAULT_SITE_CONTENT.footerText),
    social: {
      instagram: pick(
        data.social?.instagram,
        DEFAULT_SITE_CONTENT.social.instagram
      ),
      facebook: pick(data.social?.facebook, DEFAULT_SITE_CONTENT.social.facebook),
      twitter: pick(data.social?.twitter, DEFAULT_SITE_CONTENT.social.twitter),
      linkedin: pick(data.social?.linkedin, DEFAULT_SITE_CONTENT.social.linkedin),
      github: pick(data.social?.github, DEFAULT_SITE_CONTENT.social.github),
    },
  };
};

export const SiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    fetch(apiUrl("/api/site-content"))
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Object.keys(data).length) setContent(merge(data));
      })
      .catch(() => {
        /* keep defaults */
      });
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
};
