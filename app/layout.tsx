// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "./globals.css";

// const dmSans = DM_Sans({
//   variable: "--font-dm-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
// });

// export const metadata: Metadata = {
//   title: "CoreInventory",
//   description: "Streamline Your Stock. Simplify Your Business.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${dmSans.variable} antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CoreInventory",
  description: "Streamline Your Stock. Simplify Your Business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}