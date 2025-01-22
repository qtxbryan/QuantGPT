"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CardProps } from "@/types";

const HorizontalCard = ({
  image,
  title,
  description,
  date,
  source,
  index,
}: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex flex-col md:flex-row gap-6 rounded-lg overflow-hidden bg-[#1a2040]"
    >
      <div className="relative w-full md:w-72 h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cove"
        />
      </div>
      <div className="flex flex-col flex-1 p-6 pt-0 md:pt-6 border-red-500">
        <div className="flex items-center gap-2 mb-2">
          {source && (
            <Badge className="bg-[#7dd1e7]/10 text-[#7dd1e7] hover:bg-[#7dd1e7]/20 transition-colors cursor-pointer">
              {source}
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-semibold text-white mb-2 hover:text-[#7dd1e7] transition-colors cursor-pointer">
          {title}
        </h2>
        <p className="text-white mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#7dd1e7]/70">{date}</span>
          <button className="text-[#7dd1e7] hover:text-white futuristic-text transition-all">
            Read More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalCard;
