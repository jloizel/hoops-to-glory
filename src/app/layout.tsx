import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GA } from "../../components/GA/GA";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HoopsToGlory",
  description: "Climb the ranks and secure the number one pick in the NBA draft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>HoopsToGlory</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="icon" href="https://www.hoopstoglory.com/favicon.ico" type="image/x-icon"/>
      <link rel="shortcut icon" href="https://www.hoopstoglory.com/favicon.ico" type="image/x-icon"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      <meta name="keywords" content="game, basketball, nba, draft, glory, hoops, hoopstoglory"/>
      <meta name="description" content="&#128081; Climb the ranks and secure the number one pick in the NBA draft. &#128081;"/>
      <meta name="author" content="Jack"/>

      {/* <!-- Open Graph tags --> */}
      <meta property="og:title" content="HoopsToGlory"/>
      <meta property="og:description" content="Climb the ranks and secure the number one pick in the NBA draft."/>
      <meta property="og:url" content="https://www.hoopstoglory.com/?"/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://www.hoopstoglory.com/share.jpg"/>
      <meta property="og:image:secure_url" content="https://www.hoopstoglory.com/hoopstoglory.png"/>
      <meta property="og:image:alt" content="HoopsToGlory"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>

      {/* <!-- Twitter Card tags --> */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="HoopsToGlory"/>
      <meta name="twitter:description" content="Climb the ranks and secure the number one pick in the NBA draft."/>
      <meta name="twitter:site" content="https://www.hoopstoglory.com/?"/>
      <meta name="twitter:image" content="https://www.hoopstoglory.com/hoopstoglory.png"/>
      <meta name="twitter:image:alt" content="HoopsToGlory"/>      

      <GA />

      <meta name="google-site-verification" content="S_MD1UKh220VHJtR8tT5hkJRVTQsdjv2VabvTYcXjw0" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
