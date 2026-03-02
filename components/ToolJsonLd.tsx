export default function ToolJsonLd({
  name,
  description,
  slug,
  faqs,
  rating,
  ratingCount,
}: {
  name: string;
  description: string;
  slug: string;
  faqs: { question: string; answer: string }[];
  rating: number;
  ratingCount: number;
}) {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to ${name} Online for Free`,
    description: description,
    totalTime: "PT1M",
    tool: {
      "@type": "HowToTool",
      name: "Web browser",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload your file",
        text: `Go to the ${name} tool on FileToolWorks and drag and drop your file into the upload area, or click to browse and select files from your device.`,
        url: `https://www.filetoolworks.com/${slug}`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adjust settings",
        text: `Choose your preferred output settings. The default options work well for most files. Click the options panel to fine-tune quality, format, or size.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Process and download",
        text: `Click the process button to start. The conversion happens in your browser for complete privacy. Once finished, download your file instantly.`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: name,
    description: description,
    url: `https://www.filetoolworks.com/${slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    inLanguage: "en",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    datePublished: "2026-01-15",
    dateModified: "2026-03-02",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      ratingCount: ratingCount,
    },
    potentialAction: {
      "@type": "UseAction",
      target: `https://www.filetoolworks.com/${slug}`,
      name: `Use ${name}`,
    },
    creator: {
      "@type": "Organization",
      name: "FileToolWorks",
      url: "https://www.filetoolworks.com",
      sameAs: ["https://github.com/Bruscan/FileToolWorks"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.filetoolworks.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: name,
        item: `https://www.filetoolworks.com/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
