import React from "react";

export default function HeaderBox({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">
        {title}

        {type === "greeting" && (
          <span className="text-emerald-700">&nbsp;{user}</span>
        )}
      </h1>
      <p className=" font-medium text-gray-600">{subtext}</p>
    </div>
  );
}
