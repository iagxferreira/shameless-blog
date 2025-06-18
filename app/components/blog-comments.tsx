"use client";
import { useEffect } from "react";

export const BlogComments = ({ issueTerm }) => {
	useEffect(() => {
		const script = document.createElement("script");
		const anchor = document.getElementById("comments");
		script.setAttribute("src", "https://utteranc.es/client.js");
		script.setAttribute("crossorigin", "anonymous");
		script.setAttribute("async", "true");
		script.setAttribute("repo", "iagxferreira/blog-comments");
		script.setAttribute("issue-term", issueTerm);
		script.setAttribute("theme", "github-dark");
		anchor!.appendChild(script);
		return () => {
			anchor!.innerHTML = "";
		};
	});
	return (
		<>
			<div id="comments" className={"md:-ml-16"}>
				<div className="utterances-frame"></div>
			</div>
		</>
	);
};
