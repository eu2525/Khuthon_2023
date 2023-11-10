"use client";

import React, { ChangeEvent } from "react";

interface FileHandlerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (text: string, names: string[]) => void;
}
export const FileHandler = ({ disabled, onFileChange }: FileHandlerProps) => {
  const handleFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function () {
        const matches = reader.result?.toString().match(/\[(.+)\] \[(.+)\]/gm);
        // matches.
        const names = [
          ...new Set(
            matches?.map((text) => {
              const nameMatches = text.match(/\[(.*?)\]/);
              return nameMatches ? nameMatches[1].trim() : "";
            })
          ),
        ];
        onFileChange(reader.result?.toString() ?? "", names);
      };
      reader.readAsText(file, /* optional */ "utf-8");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileDrop}
        accept="text/plain"
        disabled={disabled}
      />
    </div>
  );
};
