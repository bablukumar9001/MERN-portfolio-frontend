import React, { useEffect, useMemo, useRef, useState } from "react";
import { scroller } from "react-scroll";
import "./css/command-palette.css";
import { useTheme } from "../ThemeContext";
import { useSiteContent } from "../SiteContentContext";
import { resumeHref, isUploadedResume, track } from "../api";

const SECTIONS = [
  { id: "home11", label: "Home", offset: -100 },
  { id: "about11", label: "About", offset: -100 },
  { id: "Experience", label: "Experience", offset: -100 },
  { id: "skills11", label: "Skills", offset: -100 },
  { id: "Education", label: "Education", offset: -100 },
  { id: "service11", label: "Services", offset: -60 },
  { id: "project11", label: "Projects", offset: -85 },
  { id: "contact11", label: "Contact", offset: -85 },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const site = useSiteContent();

  const commands = useMemo(() => {
    const nav = SECTIONS.map((s) => ({
      label: `Go to ${s.label}`,
      hint: "Section",
      run: () => scroller.scrollTo(s.id, { smooth: true, duration: 400, offset: s.offset }),
    }));
    const links = [
      { label: "Open GitHub", hint: "Link", url: site.social.github },
      { label: "Open LinkedIn", hint: "Link", url: site.social.linkedin },
      { label: `Email ${site.contactEmail}`, hint: "Link", url: `mailto:${site.contactEmail}` },
    ]
      .filter((l) => l.url)
      .map((l) => ({ ...l, run: () => window.open(l.url, "_blank", "noopener") }));

    if (site.resumeUrl) {
      links.push({
        label: "Download CV / Resume",
        hint: "Download",
        run: () => {
          track("cv_download");
          if (isUploadedResume(site.resumeUrl)) {
            const a = document.createElement("a");
            a.href = resumeHref(site.resumeUrl);
            a.download = "Resume.pdf";
            a.click();
          } else {
            window.open(resumeHref(site.resumeUrl), "_blank", "noopener");
          }
        },
      });
    }

    const actions = [
      {
        label: `Switch to ${theme === "light" ? "dark" : "light"} mode`,
        hint: "Action",
        run: toggleTheme,
      },
    ];
    return [...nav, ...links, ...actions];
  }, [theme, toggleTheme, site]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query, commands]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const runAt = (i) => {
    const cmd = filtered[i];
    if (!cmd) return;
    setOpen(false);
    cmd.run();
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    }
  };

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Jump to a section, link or action…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKey}
        />
        <ul className="cmdk-list">
          {filtered.map((c, i) => (
            <li
              key={c.label}
              className={`cmdk-item ${i === active ? "active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => runAt(i)}
            >
              <span>{c.label}</span>
              <span className="cmdk-hint">{c.hint}</span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="cmdk-empty">No matches</li>
          )}
        </ul>
        <div className="cmdk-foot">
          <kbd>↑</kbd>
          <kbd>↓</kbd> navigate <kbd>↵</kbd> select <kbd>esc</kbd> close
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
