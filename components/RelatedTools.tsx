import Link from "next/link";
import { FileText, BookOpen } from "lucide-react";
import { getRelatedTools } from "@/lib/tools";
import { getRelatedArticles } from "@/lib/related-articles";

interface RelatedToolsProps {
  currentToolId: string;
  limit?: number;
}

export default function RelatedTools({ currentToolId, limit = 3 }: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentToolId, limit);
  const relatedArticles = getRelatedArticles(currentToolId);

  if (relatedTools.length === 0 && relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 pb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Tools</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <FileText className={`w-8 h-8 ${tool.iconColor} mb-3`} />
            <h3 className="font-semibold text-gray-900 mb-1">{tool.name}</h3>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
      {relatedArticles.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            Related guides:
          </span>
          {relatedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {article.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
