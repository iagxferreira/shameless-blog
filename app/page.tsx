import { BlogPosts } from "app/components/posts";
import { AuthorAvatar } from "./components/author-avatar";

export const metadata = {
	title: "home",
	description: "welcome to my personal website.",
};

export default function Page() {
	return (
		<section>
			<div className="gap-2 flex justify-between">
				<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
					it's me, Iago
				</h1>
				<AuthorAvatar />
			</div>
			<p className="mb-4">
				{`turning coffee into code since 2017, i build software`}
			</p>
			<div className="my-8">
				<BlogPosts />
			</div>
		</section>
	);
}
