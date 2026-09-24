import { CheckCheck } from "lucide-react";
import React from "react";

function Badges({ badge }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/15 bg-background/60 backdrop-blur-sm text-xs font-medium text-foreground/70">
      <CheckCheck className="h-3 w-3 text-status-online shrink-0" />
      {badge}
    </div>
  );
}

export default Badges;
