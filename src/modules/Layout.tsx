import * as React from "react";
import Navbar from "./Partials/Navbar";

export default function Layout({ children }: any) {
  return (
    <div className="container">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
