import HeroNavbar from "@/components/global/HeroNavbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <HeroNavbar />

      {children}
    </>
  );
};

export default layout;
