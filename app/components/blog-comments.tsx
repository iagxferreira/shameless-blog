"use client";
import { useEffect, useId } from "react";

export const BlogComments = ({ issueTerm }) => {
  const commentsId = useId();

  useEffect(() => {
    const script = document.createElement("script");
    const anchor = document.getElementById(commentsId);
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");
    script.setAttribute("repo", "iagxferreira/blog-comments");
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("theme", "github-dark");
    if (anchor) {
      anchor.appendChild(script);
    }
    return () => {
      if (anchor) {
        anchor.innerHTML = "";
      }
    };
  });
  return (
    <>
      <div id={commentsId} className={"md:-ml-16"}>
        <div className="utterances-frame"></div>
      </div>
    </>
  );
};
