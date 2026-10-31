import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "KTProd Technology — R&D for Every Bright Idea",
  description:
    "KTProd Technology is an independent R&D team transforming bright ideas into technological solutions — software, hardware, and creative applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
