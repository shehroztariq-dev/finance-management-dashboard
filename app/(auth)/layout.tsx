import Image from "next/image";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-1 rounded-2xl bg-white lg:grid-cols-2">
      {/* Left / form side - fixed height, only this scrolls internally */}
      <div className="h-full w-full overflow-y-auto flex min-h-full items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right / mock screen side - hidden on mobile, fixed height */}
      <div
        className="relative hidden h-full overflow-hidden lg:block"
        style={{
          backgroundColor: "#EEF2FA",
          backgroundImage:
            "radial-gradient(circle, #C9D2E8 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}>
        {/* Mockup frame - positioned to overflow past the bottom/right edge */}
        <div className="absolute right-0 top-16 h-[85%] w-[92%] overflow-hidden rounded-tl-2xl rounded-bl-2xl border-2 border-r-0 border-neutral-900 bg-white shadow-2xl">
          <Image
            src="/app-screenshot.png"
            alt="App preview"
            fill
            sizes="(min-width: 1024px) 46vw, 0px"
            className="object-cover object-top-left"
          />
        </div>
      </div>
    </div>
  );
}
