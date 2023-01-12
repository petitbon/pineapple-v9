"use client";

import "../styles/globals.css";
import Auth from "@components/Auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="sidenavbar">
          <div className="pt-4 pb-2 ">
            <div className="flex items-center">
              <div className="shrink-0"></div>
              <div className="grow ml-3">PINEAPPLE PIZZA VOTING </div>
            </div>
          </div>
          <hr className="my-2" />
          <div>
            <Auth />
          </div>
          <hr className="my-2" />
          <div className="text-center bottom-0 absolute w-full">
            <hr className="m-0" />
            <p className="py-2 text-sm text-gray-500">
              There can only be one answer.
            </p>
          </div>
        </div>
        <div className="content">{children}</div>
      </body>
    </html>
  );
}
