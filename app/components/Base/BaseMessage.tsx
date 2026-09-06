import React from "react";

interface Props {
  message: string;
  variant: "success" | "destructive" | "info";
}

const BaseMessage = ({ message, variant }: Props) => {
  const variantStyles = {
    success: "text-success",
    destructive: "text-destructive",
    info: "text-primary",
  };

  return (
    <div>
      <p className={`text-xs leading-5 ${variantStyles[variant]}`}>
        {message}
      </p>
    </div>
  );
};

export default BaseMessage;