"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * Component to execute JavaScript from HTML content
 * Handles both full HTML documents and partial HTML fragments
 */
const ScriptExecutor = ({ html }) => {
  const containerRef = useRef(null);
  const hasExecutedRef = useRef(false);

  // Clean and process HTML
  const processedHtml = useMemo(() => {
    if (!html) return "";

    // Check if it's a full HTML document
    const isFullDocument = /<!DOCTYPE|<html[^>]*>/i.test(html);

    if (isFullDocument) {
      // Extract body content (without body tags)
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      return bodyMatch ? bodyMatch[1] : html;
    }

    return html;
  }, [html]);

  useEffect(() => {
    // Skip if already executed or no container
    if (hasExecutedRef.current || !containerRef.current) return;

    const executeScripts = () => {
      const container = containerRef.current;
      if (!container) return;

      // Find all script tags in the container
      const scripts = container.querySelectorAll("script");

      if (scripts.length === 0) {
        return;
      }

      // Execute each script
      scripts.forEach((oldScript, index) => {
        try {
          // Create new script element
          const newScript = document.createElement("script");

          // Copy attributes
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });

          // Copy content
          newScript.textContent = oldScript.textContent;

          // Append to body to execute
          document.body.appendChild(newScript);

          // Remove old script
          oldScript.remove();
        } catch (error) {
          console.error("Error executing script:", error);
        }
      });
    };

    // Mark as executed
    hasExecutedRef.current = true;

    // Small delay to ensure DOM is ready
    setTimeout(executeScripts, 150);
  }, [processedHtml]);

  // Reset execution flag when HTML changes
  useEffect(() => {
    hasExecutedRef.current = false;
  }, [html]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      suppressHydrationWarning
    />
  );
};

export default ScriptExecutor;
