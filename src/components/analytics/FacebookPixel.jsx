"use client";

import { normalizePhoneToE164 } from "@/utils/phoneNormalizer";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

let FACEBOOK_TEST_EVENT_CODE;

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

    const pixelId = data?.data?.pixelId || null;
    const testEventCode = data?.data?.testEventCode || null;

    return { pixelId, testEventCode };
  } catch (error) {
    console.error("❌ Error fetching pixel ID:", error);
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

    if (storedEmail) {
      userData.em = await hashSHA256(storedEmail);
    } else {
      userData.em = "";
    }

    if (storedPhone) {
      const e164Phone = normalizePhoneToE164(storedPhone);
      userData.ph = await hashSHA256(e164Phone);
    } else {
      userData.ph = "";
    }

    if (storedName) {
      const nameParts = storedName.split(" ");
      if (nameParts[0]) {
        userData.fn = await hashSHA256(nameParts[0]);
      }
      if (nameParts.length > 1) {
        userData.ln = await hashSHA256(nameParts.slice(1).join(" "));
      }
    }

    const fbp = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_fbp="))
      ?.split("=")[1];
    const fbc = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_fbc="))
      ?.split("=")[1];

    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const userId = localStorage.getItem("user_id");
    const anonymousId = getOrCreateAnonymousUserId();
    userData.external_id = userId || anonymousId || "";

    return userData;
  } catch (error) {
    console.error("Error getting user data:", error);
    return {};
  }
};

export const fbq = (action, event, parameters = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(action, event, parameters);
  } else {
    console.warn(`⚠️ Pixel not initialized. Skipping event: ${event}`);
  }
};

export const trackViewContent = (contentData, eventID = null) => {
  const eventData = {
    content_ids: [contentData.id],
    content_name: contentData.name,
    content_category: contentData.category,
    content_type: contentData.type || "product",
    value: contentData.value || 0,
    currency: "BDT",
    test_event_code: FACEBOOK_TEST_EVENT_CODE,
  };

  if (eventID) {
    eventData.eventID = eventID;
  }

  fbq("track", "ViewContent", eventData);
};

export const trackAddToCart = (cartData, eventID = null) => {
  const eventData = {
    content_ids: [cartData.id],
    content_name: cartData.name,
    content_category: cartData.category,
    content_type: "product",
    value: cartData.value || 0,
    currency: "BDT",
    test_event_code: FACEBOOK_TEST_EVENT_CODE,
  };

  if (eventID) {
    eventData.eventID = eventID;
  }

  fbq("track", "AddToCart", eventData);
};

export const trackInitiateCheckout = (checkoutData, eventID = null) => {
  const eventData = {
    content_ids: checkoutData.content_ids || [],
    content_type: "product",
    value: checkoutData.value || 0,
    currency: checkoutData.currency || "BDT",
    num_items: checkoutData.num_items || 1,
    test_event_code: FACEBOOK_TEST_EVENT_CODE,
  };

  if (eventID) {
    eventData.eventID = eventID;
  }

  fbq("track", "InitiateCheckout", eventData);
};

export const trackAddPaymentInfo = (paymentData, eventID = null) => {
  const eventData = {
    content_type: "product",
    value: paymentData.value || 0,
    currency: paymentData.currency || "BDT",
    test_event_code: FACEBOOK_TEST_EVENT_CODE,
  };

  if (eventID) {
    eventData.eventID = eventID;
  }

  fbq("track", "AddPaymentInfo", eventData);
};

export const trackPurchase = (purchaseData, eventID = null) => {
  const eventData = {
    content_ids: purchaseData.content_ids || [],
    content_name: purchaseData.content_name,
    content_category: purchaseData.content_category,
    content_type: "product",
    value: purchaseData.value || 0,

    num_items: purchaseData.num_items || 1,
    test_event_code: FACEBOOK_TEST_EVENT_CODE,
  };

  if (eventID) {
    eventData.eventID = eventID;
  }

  fbq("track", "Purchase", eventData);
};

export const updatePixelUserData = async (customerData) => {
  if (typeof window === "undefined" || !window.fbq) {
    console.warn("⚠️ Pixel not loaded, cannot update user data");
    return;
  }

  try {
    const { getOrCreateAnonymousUserId } = await import(
      "@/utils/anonymousUserId"
    );

    const userData = {};

    if (customerData.email) {
      userData.em = await hashSHA256(customerData.email);
    } else {
      userData.em = "";
    }

    if (customerData.phone) {
      const e164Phone = normalizePhoneToE164(customerData.phone);
      userData.ph = await hashSHA256(e164Phone);
    } else {
      userData.ph = "";
    }

    if (customerData.name) {
      const nameParts = customerData.name.split(" ");
      if (nameParts[0]) {
        userData.fn = await hashSHA256(nameParts[0]);
      }
      if (nameParts.length > 1) {
        userData.ln = await hashSHA256(nameParts.slice(1).join(" "));
      }
    }
    if (customerData.city) {
      userData.ct = await hashSHA256(customerData.city);
    }
    if (customerData.state) {
      userData.st = await hashSHA256(customerData.state);
    }
    if (customerData.country) {
      userData.country = await hashSHA256(customerData.country);
    }

    if (customerData.external_id) {
      userData.external_id = customerData.external_id;
    } else {
      const userId = localStorage.getItem("user_id");
      const anonymousId = getOrCreateAnonymousUserId();
      userData.external_id = userId || anonymousId || "";
    }

    window.fbq("set", "userData", userData);
  } catch (error) {
    console.error("❌ Error updating pixel user data:", error);
  }
};

export default function FacebookPixel() {
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
          FACEBOOK_TEST_EVENT_CODE = testEventCode;
          if (typeof window !== "undefined") {
            window._fbq_test_event_code = testEventCode;
          }
        }

        if (id) {
          setPixelId(id);
          hasInitialized.current = true;

          if (typeof window !== "undefined") {
            window._fbq_user_data = userData;
          }
        } else {
          console.warn(
            "❌ Facebook Pixel ID not found for this domain. Pixel tracking disabled."
          );
        }
      })
      .catch((error) => {
        console.error("❌ Error loading pixel ID:", error);
      });
  }, []);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            
            if (!window._fbq_initialized) {
              
              const userData = window._fbq_user_data || {};
              fbq('init', '${pixelId}', userData);
              fbq('track', 'PageView');
              window._fbq_initialized = true;
            }
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
