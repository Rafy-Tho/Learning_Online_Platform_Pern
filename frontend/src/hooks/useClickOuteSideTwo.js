import { useEffect, useRef, useState } from "react";

function useClickOutside(config = {}) {
  const {
    closeOnEscape = true,
    closeOnClickOutside = true,
    enabled = true,
  } = config;

  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !enabled) return;

    const handleClickOutside = (event) => {
      if (!closeOnClickOutside) return;

      const isClickInsideElement = elementRef.current?.contains(event.target);
      const isClickInsideTrigger = triggerRef.current?.contains(event.target);

      if (!isClickInsideElement && !isClickInsideTrigger) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (closeOnEscape && event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, closeOnClickOutside, enabled]);

  return { isOpen, setIsOpen, elementRef, triggerRef };
}

// Usage
function DropdownMenu() {
  const { isOpen, setIsOpen, elementRef, triggerRef } = useClickOutside();

  return (
    <div>
      <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        Menu
      </button>

      {isOpen && <div ref={elementRef}>Dropdown content</div>}
    </div>
  );
}
