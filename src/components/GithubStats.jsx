import React, { useEffect, useState } from "react";
import "./css/github.css";
import { useSiteContent } from "../SiteContentContext";
import { GithubStatsSkeleton } from "./SectionSkeletons";

const CACHE_KEY = "gh-stats-cache-v1";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const usernameFromUrl = (url) => {
  const m = /github\.com\/([^/?#]+)/i.exec(url || "");
  return m ? m[1] : "";
};

const GithubStats = () => {
  const site = useSiteContent();
  const username = usernameFromUrl(site.social.github) || "bablukumar9001";
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const cached = (() => {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed.username === username && Date.now() - parsed.at < CACHE_TTL)
          return parsed.data;
      } catch (_) {}
      return null;
    })();

    if (cached) {
      setData(cached);
      return;
    }

    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error("gh api");
        const user = await uRes.json();
        const repos = await rRes.json();

        const stars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
        const langCount = {};
        repos.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
        const topLangs = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name]) => name);

        const result = {
          publicRepos: user.public_repos,
          followers: user.followers,
          stars,
          topLangs,
          profileUrl: user.html_url,
        };
        if (cancelled) return;
        setData(result);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ username, at: Date.now(), data: result })
          );
        } catch (_) {}
      } catch (_) {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (failed) return null;

  return (
    <section className="gh-section" id="github">
      <div className="gh-inner">
        <div className="section-title text-center fade-in">
          <span className="subtitle">Open Source</span>
          <h2>GitHub Activity</h2>
          <div className="title-bar"></div>
        </div>

        {data ? (
        <div className="gh-card loaded">
          <div className="gh-stats">
            <div className="gh-stat">
              <strong>{data.publicRepos}</strong>
              <span>Public repos</span>
            </div>
            <div className="gh-stat">
              <strong>{data.stars}</strong>
              <span>Total stars</span>
            </div>
            <div className="gh-stat">
              <strong>{data.followers}</strong>
              <span>Followers</span>
            </div>
          </div>

          {data.topLangs.length > 0 && (
            <div className="gh-langs">
              <span className="gh-langs-label">Most used</span>
              <div className="gh-lang-chips">
                {data.topLangs.map((l) => (
                  <span key={l} className="gh-lang-chip">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            className="gh-link"
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i> @{username}
          </a>
        </div>
        ) : (
          <GithubStatsSkeleton />
        )}

        <img
          className="gh-graph"
          src={`https://ghchart.rshah.org/4f46e5/${username}`}
          alt={`${username} GitHub contribution graph`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    </section>
  );
};

export default GithubStats;
