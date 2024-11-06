import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/header";
import Arrows from "./ui/arrows";
import Footer from "./ui/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blogs By Zoha ",
  description: "Next.js App routing",
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        <Header/>  
        {/* Contents */}
        <div className="w-[90%] h-auto m-auto">
          {children}
        </div>
        {/* Footer */}
        <Footer/>
        {/* Arrows to scroll Up or Down */}
        <Arrows/>

      </body>
    </html>
  );
}
