"use client";

import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface Props {
  transactionId: string;
  description: string;
}

const TransactionCardDescription = ({ transactionId, description }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isExpanded = expandedId === transactionId;

  return (
    <div>
      <button
        onClick={() => setExpandedId(isExpanded ? null : transactionId)}
        className="w-full flex justify-center pb-2"
      >
        <FaAngleDown size={12}/>
      </button>

      {isExpanded && (
        <div className="border-t border-border p-3">
          <span className="text-left text-text text-xs">{description}</span>
        </div>
      )}
    </div>
  );
};

export default TransactionCardDescription;
