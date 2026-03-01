export default function BlogJsonLd({
  title,
  description,
  slug,
  datePublished,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: "FileToolWorks",
    },
    publisher: {
      "@type": "Organization",
      name: "FileToolWorks",
      url: "https://www.filetoolworks.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.filetoolworks.com/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
