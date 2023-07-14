import { Metadata } from "next";

export function generateMetadata(
  title: string,
  description?: string
): Metadata {
  return {
    applicationName: "Kujira",
    title,
    description: description || "Your spending habits made clear.",
    keywords: [
      "money",
      "savings",
      "self-improvement",
      "dashboard",
      "nextjs",
      "react",
    ],
    creator: "",
    authors: { name: "", url: "" },
    publisher: "",
    appLinks: {
      web: { url: "" },
      ios: { url: "", app_store_id: "", app_name: "" },
      android: { package: "", url: "", class: "", app_name: "" },
    },
  };
}
