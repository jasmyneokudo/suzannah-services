import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://suzannah-services.vercel.app/',
      lastModified: new Date(),
    },
    // {
    //   url: 'https://suzannah-services.vercel.app/services',
    //   lastModified: new Date(),
    // },
    // {
    //   url: 'https://suzannah-services.vercel.app/contact',
    //   lastModified: new Date(),
    // },
    // Add more URLs if you have more pages
  ];
}
