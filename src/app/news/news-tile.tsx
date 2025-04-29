'use client'

import { News } from "@/models/news_model";
import { ChevronRight } from "lucide-react";
import React from "react";

interface NewsTileProps {
  article: News;
  index: number;
}

const NewsTile: React.FC<NewsTileProps> = ({ article, index }) => {
  return (
    <a
      key={`${article.title}${index}`}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-article flex flex-col sm:flex-row gap-4 p-3 sm:px-4 sm:py-3 items-start min-h-[120px] hover:bg-backgroundLayer1 rounded-lg transition-colors"
    >
      {/* 
        Image 
        - Mobile: full width (w-full), height 160px 
        - Tablet/Desktop: fixed width 150px, height 120px
      */}
      <div className="w-full sm:w-[150px] h-[160px] sm:h-[120px] relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="rounded-xl object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://dribbble.com/shots/6525705-Newspaper/attachments/6525705-Newspaper";
          }}
        />
      </div>

      {/* 
        Content
        - Full width on mobile (flex-1 and w-full) 
        - Text sizes slightly change at sm breakpoint
      */}
      <div className="flex flex-col justify-between flex-1 w-full min-h-[120px]">
        <h2 className="font-semibold text-base sm:text-[16px] leading-tight line-clamp-2">
          {article.title}
        </h2>

        <p className="text-sm sm:text-[14px] text-gray1 mt-1 line-clamp-2 sm:line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center text-[#ff375f] mt-2 text-sm sm:text-[14px] font-medium">
          Read More <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </a>
  );
};

export default NewsTile;
