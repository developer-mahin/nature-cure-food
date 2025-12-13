"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../reusable/Container";
// import { Button } from "./button";
import Unani from "../main/Homepage/ProductCategorise/Unani";
import Herbal from "../main/Homepage/ProductCategorise/Herbal";
import Ayurvedic from "../main/Homepage/ProductCategorise/Ayurvedic";
import { Button } from "@mui/material";

const tabs = [
  { id: "Ayurvedic", label: "Ayurvedic", content: <Ayurvedic /> },
  { id: "Herbal", label: "Herbal", content: <Herbal /> },
  { id: "Unani", label: "Unani", content: <Unani /> },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Ayurvedic");

  return (
    <Container className="py-0 lg:py-0 ">
      {/* Tab List */}
      <div className="flex justify-center items-center gap-x-6 ">
        {tabs.map((tab) => (
          <Button
            variant="contained"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-2 px-4 text-sm font-medium transition-colors !capitalize !py-2 duration-200 ${
              activeTab === tab.id ? "text-white" : "text-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Button>
        ))}
      </div>

      {/* Tab Panel */}
      <div className="lg:p-4 mt-4">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </Container>
  );
}
