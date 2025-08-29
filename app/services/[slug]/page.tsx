import { notFound } from "next/navigation";
import UnifiedServicePage from "@/components/services/UnifiedServicePage";
import { servicesData } from "@/lib/services-data";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return <UnifiedServicePage service={service} />;
}

// Generate static params for all services
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

// Generate metadata for each service
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    return {
      title: "Service Not Found | IdEinstein Engineering",
      description: "The requested service page could not be found.",
    };
  }

  return {
    title: `${service.title} | IdEinstein Engineering`,
    description: service.description,
    keywords: `${service.title.toLowerCase()}, engineering services, German precision, Indian innovation, IdEinstein`,
  };
}
