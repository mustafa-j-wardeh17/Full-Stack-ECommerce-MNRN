"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { brands } from "@/util/constant";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="rounded-md flex flex-col antialiased my-20 items-center justify-center relative overflow-hidden">

      <h2 className="text-4xl font-bold text-primary/80 w-full text-center mb-10">
        Our Trusted Brands
      </h2>
      <InfiniteMovingCards
        items={brands}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
