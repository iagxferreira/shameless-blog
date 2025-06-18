import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
	let allBlogs = getBlogPosts();

	return (
		<div>
			{allBlogs
				.sort((a, b) => {
					if (
						new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
					) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col space-y-1 mb-4"
						href={`/blog/${post.slug}`}
					>
						<div className="w-full flex flex-col">
							<p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1 leading-tight lowercase">
								{formatDate(post.metadata.publishedAt, false)}
							</p>
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium">
								{post.metadata.title}
							</p>
							<p className="text-neutral-500 dark:text-neutral-500 tracking-tight text-sm italic">
								{post.metadata.summary}
							</p>
						</div>
					</Link>
				))}
		</div>
	);
}
