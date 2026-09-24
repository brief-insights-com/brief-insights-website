import React from "react";

function CompanyDetail({ value, label }) {
  return (
    <div
      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground text-right">
        {value}
      </span>
    </div>
  );
}

export default CompanyDetail;
