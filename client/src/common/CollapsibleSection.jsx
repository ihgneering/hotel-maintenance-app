import { ChevronDown, ChevronUp,  } from "lucide-react";
import { useState } from "react";

function CollapsibleSection({
  children,
  defaultOpen = false,
}) {

  const [isOpen, setIsOpen] =
    useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-center items-center"
      >
        <span className="flex w-full p-2 rounded-md justify-end">
          {isOpen ? 
          <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>
          }
        </span>
      </button>

      {isOpen && (
        <div className="">
          {children}
        </div>
      )}
    </div>
  );
}

export default CollapsibleSection;