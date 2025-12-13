"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

/**
 * Product FAQ Component
 * Uses Material UI Accordion for FAQ display
 */
export default function ProductFAQ({ faqs, productName }) {
  // Default FAQs if none provided
  const defaultFAQs = [
    {
      id: 1,
      question: "How do I use this product?",
      answer: `${
        productName || "This product"
      } should be used as directed on the packaging. For best results, follow the recommended dosage and timing. Consult with a healthcare professional if you have any concerns.`,
    },
    {
      id: 2,
      question: "What are the main ingredients?",
      answer:
        "This product contains natural herbal ingredients. Please refer to the product packaging for a complete list of ingredients and their benefits.",
    },
    {
      id: 3,
      question: "Are there any side effects?",
      answer:
        "Our products are made from natural ingredients and are generally safe for consumption. However, if you experience any adverse reactions, discontinue use and consult a healthcare professional.",
    },
    {
      id: 4,
      question: "How long does delivery take?",
      answer:
        "We typically deliver within 3-5 business days in Dhaka and 5-7 business days outside Dhaka. Express delivery options are also available.",
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer:
        "We offer a 7-day return policy for unopened products. If you're not satisfied with your purchase, contact our customer service team for assistance.",
    },
    {
      id: 6,
      question: "Can I take this with other medications?",
      answer:
        "If you are currently taking any medications or have existing health conditions, we recommend consulting with your doctor before using this product.",
    },
  ];

  const faqList = faqs && faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

      <div className="space-y-2">
        {faqList.map((faq, index) => (
          <Accordion
            key={faq.id || index}
            sx={{
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                margin: "0",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
              sx={{
                "&.Mui-expanded": {
                  minHeight: "48px",
                },
                "& .MuiAccordionSummary-content": {
                  margin: "12px 0",
                  "&.Mui-expanded": {
                    margin: "12px 0",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  color: "#111827",
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                paddingTop: 0,
                paddingBottom: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.813rem", md: "0.875rem" },
                  color: "#6b7280",
                  lineHeight: 1.7,
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.813rem", md: "0.875rem" },
            color: "#065f46",
            fontWeight: 500,
          }}
        >
          Still have questions?{" "}
          <a href="tel:09610402800" className="underline hover:text-green-700">
            Call us at 09610402800
          </a>{" "}
          or{" "}
          <a
            href="https://wa.me/8801821098840"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-700"
          >
            WhatsApp +8801821098840
          </a>
        </Typography>
      </div>
    </div>
  );
}
