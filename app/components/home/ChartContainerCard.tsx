import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const ChartContainerCard = ({ children, title, subtitle }: Props) => {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm">
      <h2 className="text-base font-semibold text-text">{title}</h2>

      <p className="mt-1 text-sm text-text-secondary mb-4">{subtitle}</p>

      {children}
    </div>
  );
};

export default ChartContainerCard;
