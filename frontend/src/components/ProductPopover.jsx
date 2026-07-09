// components/CustomPopover.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

function CustomPopover({
  children,
  content,
  placement = "right",
  offset = 10,
  className = "",
  trigger = "hover",
  onOpenChange = null,
  openDelay = 200,
  closeDelay = 150,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);
  const rafIdRef = useRef(null);
  const isOpenRef = useRef(false); // ✅ Track open state without re-renders

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top;
    let left;

    switch (placement) {
      case "right":
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          popoverRect.height / 2;
        left = triggerRect.right + scrollX + offset;
        break;
      case "left":
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          popoverRect.height / 2;
        left = triggerRect.left + scrollX - popoverRect.width - offset;
        break;
      case "top":
        top = triggerRect.top + scrollY - popoverRect.height - offset;
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          popoverRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + scrollY + offset;
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          popoverRect.width / 2;
        break;
      default:
        top =
          triggerRect.top +
          scrollY +
          triggerRect.height / 2 -
          popoverRect.height / 2;
        left = triggerRect.right + scrollX + offset;
    }

    const padding = 10;
    if (top < padding) top = padding;
    if (left < padding) left = padding;
    if (top + popoverRect.height > window.innerHeight - padding) {
      top = window.innerHeight - popoverRect.height - padding;
    }
    if (left + popoverRect.width > window.innerWidth - padding) {
      left = window.innerWidth - popoverRect.width - padding;
    }

    setPosition({ top, left });
    setIsPositioned(true);
  }, [placement, offset]);

  // ✅ Single effect - handles positioning without state updates in the body
  useEffect(() => {
    if (!isOpen) return;

    isOpenRef.current = true;

    const positionPopover = () => {
      if (isOpenRef.current) {
        updatePosition();
      }
    };

    rafIdRef.current = requestAnimationFrame(positionPopover);

    const handleUpdate = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(positionPopover);
    };

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      isOpenRef.current = false;
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isOpen, updatePosition]);

  // ✅ Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // ✅ Reset isPositioned when closing
  const handleClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsPositioned(false);
      if (onOpenChange) onOpenChange(false);
    }, closeDelay);
  }, [onOpenChange, closeDelay]);

  const handleOpen = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      if (onOpenChange) onOpenChange(true);
    }, openDelay);
  }, [onOpenChange, openDelay]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleOpen, handleClose]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === "hover") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      handleOpen();
    }
  }, [trigger, handleOpen]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === "hover") {
      handleClose();
    }
  }, [trigger, handleClose]);

  const popoverContent = isOpen ? (
    <div
      ref={popoverRef}
      className={`fixed z-9999 bg-white rounded-lg shadow-2xl border border-gray-200 min-w-50 max-w-100 ${className}`}
      style={{
        top: position.top,
        left: position.left,
        opacity: isPositioned ? 1 : 0,
        pointerEvents: isPositioned ? "auto" : "none",
        transition: "opacity 0.15s ease-out",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{
          opacity: isPositioned ? 1 : 0,
          scale: isPositioned ? 1 : 0.95,
          y: isPositioned ? 0 : -10,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-white border-t border-l border-gray-200" />
        <div className="p-5 max-h-[80vh] overflow-y-auto">{content}</div>
      </motion.div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={trigger === "click" ? handleToggle : undefined}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>
      {createPortal(popoverContent, document.body)}
    </>
  );
}

export default CustomPopover;
