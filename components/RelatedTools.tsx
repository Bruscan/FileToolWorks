import Link from "next/link";
import { FileText } from "lucide-react";
import { getRelatedTools } from "@/lib/tools";

interface RelatedToolsProps {
  currentToolId: string;
  limit?: number;
}

export default function RelatedTools({ currentToolId, limit = 3 }: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentToolId, limit);

  if (relatedTools.length === 0) {
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
    </section>
  );
}
