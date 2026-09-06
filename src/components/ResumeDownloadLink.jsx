import React from "react";
import { resumeHref, isUploadedResume, track } from "../api";

const ResumeDownloadLink = ({ url, className, children, ...rest }) => {
  if (!url) return null;

  const uploaded = isUploadedResume(url);
  const externalProps = uploaded
    ? { download: "Resume.pdf" }
    : { target: "_blank", rel: "noopener noreferrer" };

  return (
    <a
      href={resumeHref(url)}
      className={className}
      onClick={() => track("cv_download")}
      {...externalProps}
      {...rest}
    >
      {children}
    </a>
  );
};

export default ResumeDownloadLink;
