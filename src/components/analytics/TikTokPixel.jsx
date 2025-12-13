"use client";

import { normalizePhoneToE164 } from "@/utils/phoneNormalizer";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

let TIKTOK_TEST_EVENT_CODE;

const getPixelConfig = async () => {
  try {
    const domain =
      typeof window !== "undefined" ? window.location.hostname : null;

    if (!domain) {
      console.warn("❌ No domain found");
      return null;
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";
    const apiUrl = `${backendUrl}/tenant/pixel-config?domain=${domain}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.warn("❌ Failed to fetch pixel config, status:", response.status);
      return null;
    }

    const data = await response.json();

    const pixelId = data?.data?.tiktokPixelId || null;
    const testEventCode = data?.data?.tiktokTestEventCode || null;

    return { pixelId, testEventCode };
  } catch (error) {
    console.error("❌ Error fetching TikTok pixel ID:", error);
    return null;
  }
};

const hashSHA256 = async (str) => {
  if (!str) return null;

  const normalized = str.toLowerCase().trim();
  if (!normalized) return null;

  try {
    if (
      typeof window === "undefined" ||
      !window.crypto ||
      !window.crypto.subtle
    ) {
      return normalized;
    }

    const msgBuffer = new TextEncoder().encode(normalized);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  } catch (error) {
    console.error("❌ Hashing error:", error);
    return null;
  }
};

const getUserData = async () => {
  if (typeof window === "undefined") return {};

  try {
    const { getOrCreateAnonymousUserId } = await import(
      "@/utils/anonymousUserId"
    );

    const userData = {};

    const storedName =
      localStorage.getItem("customer_name") ||
      sessionStorage.getItem("customer_name");
    const storedEmail =
      localStorage.getItem("customer_email") ||
      sessionStorage.getItem("customer_email");
    const storedPhone =
      localStorage.getItem("customer_phone") ||
      sessionStorage.getItem("customer_phone");

    if (storedEmail && storedEmail.includes("@") && storedEmail.length > 3) {
      userData.email = await hashSHA256(storedEmail.toLowerCase().trim());
    }

    if (storedPhone) {
      const e164Phone = normalizePhoneToE164(storedPhone);
      userData.phone = await hashSHA256(e164Phone);
    } else {
      userData.phone = "";
    }

    const userId = localStorage.getItem("user_id");
    const anonymousId = getOrCreateAnonymousUserId();
    userData.external_id = userId || anonymousId || "";

    return userData;
  } catch (error) {
    console.error("Error getting user data:", error);
    return {};
  }
};

export const ttq = (action, event, parameters = {}) => {
  if (typeof window === "undefined") {
    console.warn(
      `⚠️ TikTok Pixel: window not available. Skipping event: ${event}`
    );
    return;
  }

  if (!window.ttq) {
    window.ttq = [];
  }

  if (Array.isArray(window.ttq) || typeof window.ttq.push === "function") {
    window.ttq.push([action, event, parameters]);
  } else if (typeof window.ttq[action] === "function") {
    window.ttq[action](event, parameters);
  } else {
    console.warn(
      `⚠️ TikTok Pixel method "${action}" not available. Skipping event: ${event}`
    );
  }
};

export const trackTikTokViewContent = (contentData, eventID = null) => {
  const validContentType =
    contentData.type === "product_group" ? "product_group" : "product";

  const eventData = {
    content_type: validContentType,
    content_name: contentData.name,
    content_category: contentData.category,
    content_id: contentData.id,
    value: contentData.value || 0,
    currency: "BDT",
  };

  if (
    contentData.contents &&
    Array.isArray(contentData.contents) &&
    contentData.contents.length > 0
  ) {
    eventData.contents = contentData.contents;
  }

  if (eventID) {
    eventData.event_id = eventID;
  }

  ttq("track", "ViewContent", eventData);
};

export const trackTikTokAddToCart = (cartData, eventID = null) => {
  const eventData = {
    content_type: "product",
    content_name: cartData.name,
    content_category: cartData.category,
    content_id: cartData.id,
    value: cartData.value || 0,
    currency: "BDT",
    quantity: cartData.quantity || 1,
  };

  if (eventID) {
    eventData.event_id = eventID;
  }

  ttq("track", "AddToCart", eventData);
};

export const trackTikTokInitiateCheckout = (checkoutData, eventID = null) => {
  const validContentType =
    checkoutData.content_type === "product_group" ? "product_group" : "product";

  const eventData = {
    value: checkoutData.value || 0,
    currency: checkoutData.currency || "BDT",
    content_type: validContentType,
    contents: checkoutData.contents || [],
  };

  if (eventID) {
    eventData.event_id = eventID;
  }

  ttq("track", "InitiateCheckout", eventData);
};

export const trackTikTokPurchase = (purchaseData, eventID = null) => {
  if (typeof window === "undefined") {
    console.error("❌ Window is undefined, cannot track TikTok Purchase");
    return;
  }

  if (!window.ttq) {
    console.error(
      "❌ TikTok Pixel (ttq) not loaded! Cannot track Purchase event"
    );
    return;
  }

  const validContentType =
    purchaseData.content_type === "product_group" ? "product_group" : "product";

  const eventData = {
    content_type: validContentType,
    value: purchaseData.value || 0,
    currency: purchaseData.currency || "BDT",
    contents: purchaseData.contents || [],
  };

  if (eventID) {
    eventData.event_id = eventID;
  }

  try {
    ttq("track", "Purchase", eventData);
  } catch (error) {
    console.error("❌ Error tracking TikTok Purchase:", error);
  }
};

export const updateTikTokPixelUserData = async (customerData) => {
  if (typeof window === "undefined" || !window.ttq) {
    console.warn("⚠️ TikTok Pixel not loaded, cannot update user data");
    return;
  }

  try {
    const { getOrCreateAnonymousUserId } = await import(
      "@/utils/anonymousUserId"
    );

    const userData = {};

    if (
      customerData.email &&
      customerData.email.includes("@") &&
      customerData.email.length > 3
    ) {
      userData.email = await hashSHA256(
        customerData.email.toLowerCase().trim()
      );
    }

    if (customerData.phone) {
      const e164Phone = normalizePhoneToE164(customerData.phone);
      userData.phone = await hashSHA256(e164Phone);
    } else {
      userData.phone = "";
    }

    if (customerData.external_id) {
      userData.external_id = customerData.external_id;
    } else {
      const userId = localStorage.getItem("user_id");
      const anonymousId = getOrCreateAnonymousUserId();
      userData.external_id = userId || anonymousId || "";
    }

    if (Array.isArray(window.ttq) || typeof window.ttq.push === "function") {
      window.ttq.push(["identify", userData]);
    } else if (typeof window.ttq.identify === "function") {
      window.ttq.identify(userData);
    } else {
      console.warn("⚠️ TikTok Pixel identify method not available");
      return;
    }
  } catch (error) {
    console.error("❌ Error updating TikTok pixel user data:", error);
  }
};

export default function TikTokPixel() {
  const [pixelId, setPixelId] = useState(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    Promise.all([getPixelConfig(), getUserData()])
      .then(([config, userData]) => {
        const pixelConfig = config || {};
        const { pixelId: id, testEventCode } = pixelConfig;

        if (testEventCode) {
          TIKTOK_TEST_EVENT_CODE = testEventCode;
          if (typeof window !== "undefined") {
            window._ttq_test_event_code = testEventCode;
          }
        }

        if (id) {
          setPixelId(id);
          hasInitialized.current = true;

          if (typeof window !== "undefined") {
            window._ttq_user_data = userData;
          }
        } else {
          console.warn(
            "❌ TikTok Pixel ID not found for this domain. Pixel tracking disabled."
          );
        }
      })
      .catch((error) => {
        console.error("❌ Error loading TikTok pixel ID:", error);
      });
  }, []);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              
              if (!window._ttq_initialized) {
                ttq.load('${pixelId}');
                
                const userData = window._ttq_user_data || {};
                if (Object.keys(userData).length > 0) {
                  ttq.identify(userData);
                }
                
                ttq.page();
                window._ttq_initialized = true;
              }
            }(window, document, 'ttq');
          `,
        }}
      />
    </>
  );
}
