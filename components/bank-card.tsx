import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BankCard({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/"
        className="relative flex h-42 w-68 flex-col justify-between overflow-hidden rounded-[20px] p-5 transition-transform duration-200 "
        style={{
          background:
            "linear-gradient(135deg, #1a2744 0%, #0f172a 60%, #162032 100%)",
        }}>
        {/* Diagonal shimmer band */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
          }}
        />

        {/* Lines texture */}
        <Image
          src="/lines.png"
          fill
          alt="Background lines"
          aria-hidden="true"
          sizes="100vw"
          className="object-cover opacity-[0.07] mix-blend-screen"
        />

        {/* ── TOP ROW ── */}
        <div className="relative flex items-start justify-between">
          <div>
            <p
              className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Account holder
            </p>
            <h2 className="text-[15px] font-semibold text-white leading-tight">
              {account.name || userName}
            </h2>
          </div>
          <Image
            src="/Paypass.svg"
            width={20}
            height={24}
            alt="Contactless"
            className="mt-0.5 opacity-70"
          />
        </div>

        {/* ── BALANCE ── */}
        {showBalance && (
          <div className="relative">
            <p
              className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Current balance
            </p>
            <p className="text-[22px] font-bold text-white leading-none tracking-tight">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
        )}

        {/* ── BOTTOM ROW ── */}
        <div className="relative flex items-end justify-between">
          <div className="space-y-1.5">
            {/* Card number */}
            <p
              className="text-[13px] font-medium tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.75)" }}>
              •••• •••• ••••{" "}
              <span className="text-white font-semibold">1234</span>
            </p>

            {/* Valid / Holder */}
            <div className="flex items-center gap-5">
              <div>
                <p
                  className="text-[8px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  Valid thru
                </p>
                <p
                  className="text-[11px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.65)" }}>
                  ••/••
                </p>
              </div>
              <div>
                <p
                  className="text-[8px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  Card holder
                </p>
                <p
                  className="text-[11px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.65)" }}>
                  {userName}
                </p>
              </div>
            </div>
          </div>

          {/* Mastercard logo */}
          <Image
            src="/mastercard.svg"
            alt="Mastercard"
            width={100}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Bottom edge accent */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
          }}
        />
      </Link>
    </div>
  );
}
