"use client";
import CountUp from "react-countup";

export default function AnimatedCounter({ amount }: { amount: number }) {
  return (
    <p className="font-bold text-[16px]">
      <CountUp
        duration={0.27}
        end={amount}
        decimals={2}
        decimal="."
        decimalPlaces={2}
        prefix="$"
      />
    </p>
  );
}
