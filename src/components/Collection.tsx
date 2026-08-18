"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Collection() {
  const [selectedBear, setSelectedBear] = useState<number | null>(null);

  const collectionItems = [
    {
      id: 1,
      name: "Stone Classic",
      trait: "Classic • Stone Fur",
      src: "/assets/bears/bear_1.png",
    },
    {
      id: 2,
      name: "Ignis Sharky",
      trait: "Shark Onesie • Ash Fur",
      src: "/assets/bears/bear_2.png",
    },
    {
      id: 3,
      name: "Devil Royalty",
      trait: "Red Puffer Jacket • Ice Fur",
      src: "/assets/bears/bear_3.png",
    },
    {
      id: 4,
      name: "Panda Captain",
      trait: "Sailor Suit • Walnut Fur",
      src: "/assets/bears/bear_4.png",
    },
    {
      id: 5,
      name: "The Goodfather",
      trait: "Tuxedo • Dusty Green Fur",
      src: "/assets/bears/bear_5.png",
    },
    {
      id: 6,
      name: "Don Astro",
      trait: "Summer Suit • Burgundy Fur",
      src: "/assets/bears/bear_6.png",
    },
    {
      id: 7,
      name: "Flame Eye Grizzly ",
      trait: "Luxury Streatwear • Dusty Teal Fur",
      src: "/assets/bears/bear_7.png",
    },
    {
      id: 8,
      name: "Lover Ninja",
      trait: "Love Halo • Dusty Rose Fur",
      src: "/assets/bears/bear_8.png",
    },
    {
      id: 9,
      name: "Master Chef",
      trait: "Chef Uniform • Ivory Fur",
      src: "/assets/bears/bear_9.png",
    },
    {
      id: 10,
      name: "Fire Chief",
      trait: "Fire Fighter Suit • Ivory Fur",
      src: "/assets/bears/bear_10.png",
    },
    {
      id: 11,
      name: "Arcane Scholar",
      trait: "Grad Hat • Espresso Fur",
      src: "/assets/bears/bear_11.png",
    },
    {
      id: 12,
      name: "Inferno Bear",
      trait: "Samurai Set • Gold Fur",
      src: "/assets/bears/bear_12.png",
    },
  ];

  return (
    <section
      id="collection"
      className="py-20 sm:py-28 bg-hood-light border-b-2 border-hood-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-hood bg-hood-bg border border-hood-secondary/60">
            <span className="font-pixel text-xs text-hood-accent uppercase tracking-wider font-bold">
              CURATED GALLERY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-hood-primary tracking-tight">
            THE HOODBEAR
          </h2>
          <p className="text-lg text-hood-primary/80 font-medium">
            5,555 hand-drawn pixel bears. Each with distinct expressions,
            traits, and personalities.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {collectionItems.map((bear, index) => (
            <motion.div
              key={bear.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onHoverStart={() => setSelectedBear(bear.id)}
              onHoverEnd={() => setSelectedBear(null)}
              className={`relative bg-hood-bg border-2 border-hood-primary p-4 rounded-hood shadow-hood hover:shadow-hood-lg transition-all cursor-pointer group overflow-hidden ${
                selectedBear === bear.id ? "bg-hood-card" : ""
              }`}
            >
              {/* Token ID Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-pixel text-[10px] text-hood-accent font-bold tracking-wider">
                  #{String(bear.id).padStart(4, "0")}
                </span>
                <span className="w-2 h-2 rounded-full bg-hood-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Artwork Container */}
              <div className="relative aspect-square w-full rounded-hood bg-hood-card border border-hood-secondary/60 p-2 flex items-center justify-center overflow-hidden mb-3 group-hover:border-hood-primary transition-colors">
                <Image
                  src={bear.src}
                  alt={bear.name}
                  width={200}
                  height={200}
                  className="pixelated w-full h-full object-contain filter group-hover:drop-shadow-md transition-all transform group-hover:scale-105"
                />
              </div>

              {/* Name & Trait */}
              <div className="space-y-1">
                <h3 className="font-display text-sm font-bold text-hood-primary truncate">
                  {bear.name}
                </h3>
                <p className="text-xs text-hood-primary/70 font-medium truncate">
                  {bear.trait}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
