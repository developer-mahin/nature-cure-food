"use client";

import ScriptExecutor from "@/components/landing/ScriptExecutor";
import { useEffect, useRef } from "react";

/**
 * Component to render dynamic pages with HTML, CSS, and JavaScript
 * Supports complete HTML documents and partial fragments
 */
const DynamicPageRenderer = ({ html, css, js }) => {
  const hasExecutedJS = useRef(false);

  // Execute JavaScript code if provided separately
  useEffect(() => {
    if (!js || !js.trim() || hasExecutedJS.current) return;

    hasExecutedJS.current = true;

    // Execute after DOM is ready
    const timer = setTimeout(() => {
      try {
        // Create a function wrapper to execute the JS
        const executeJS = new Function(js);
        executeJS();
        console.log(
          "[DynamicPageRenderer] Separate JavaScript executed successfully"
        );
      } catch (error) {
        console.error(
          "[DynamicPageRenderer] Error executing JavaScript:",
          error
        );
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      hasExecutedJS.current = false;
    };
  }, [js]);

  return (
    <>
      {/* Inject CSS if provided */}
      {css && css.trim() && <style dangerouslySetInnerHTML={{ __html: css }} />}

      {/* Render HTML with ScriptExecutor to handle inline scripts */}
      {html && html.trim() && <ScriptExecutor html={html} />}
    </>
  );
};

export default DynamicPageRenderer;
