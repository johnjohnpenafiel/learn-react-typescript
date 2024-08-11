import React, { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
}

function ExpandableText({ children, maxChars = 100 }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const shortText = children.slice(0, maxChars) + "...";

  return (
    <div>
      {expanded ? children : shortText}
      {children.length > maxChars && (
        <button onClick={toggleExpand}>
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default ExpandableText;
