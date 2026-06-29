import Image from "next/image";

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-2 md:hidden">
      <Image src="/logo.svg" width={36} height={36} alt="Logo" priority />

      <p className="font-sans text-2xl font-bold">Numera</p>
    </div>
  );
}
