import Navbar from "@/components/global/Navbar";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <Separator />
      <main className="container mx-auto mt-10">{children}</main>
    </div>
  );
};

export default Layout;
