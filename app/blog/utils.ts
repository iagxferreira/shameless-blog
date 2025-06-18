import fs from "node:fs";
import path from "node:path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  issueTerm?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    throw new Error("Frontmatter não encontrado no arquivo MDX.");
  }
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "");
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    const value = valueArr.join(": ").trim();
    const valueWithoutQuotes = value.replace(/^['"](.*)['"]$/, "$1");
    metadata[key.trim() as keyof Metadata] = valueWithoutQuotes;
  });

  return { metadata: metadata as Metadata, content: content.trim() };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatDate(date: string, includeRelative = false) {
  const normalizeDate = (date: string) =>
    date.includes("T") ? date : `${date}T00:00:00`;

  const getTimeDifference = (current: Date, target: Date) => ({
    years: current.getFullYear() - target.getFullYear(),
    months: current.getMonth() - target.getMonth(),
    days: current.getDate() - target.getDate(),
  });

  const getRelativeDate = ({
    years,
    months,
    days,
  }: ReturnType<typeof getTimeDifference>) => {
    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    return "Today";
  };

  const getFullDate = (date: Date) =>
    date.toLocaleString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const targetDate = new Date(normalizeDate(date));
  const currentDate = new Date();
  const timeDiff = getTimeDifference(currentDate, targetDate);
  const fullDate = getFullDate(targetDate);
  const relativeDate = getRelativeDate(timeDiff);

  return includeRelative ? `${fullDate} (${relativeDate})` : fullDate;
}
