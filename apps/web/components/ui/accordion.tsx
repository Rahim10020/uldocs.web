"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

/** Accordéon accessible : un seul panneau ouvert à la fois. */
export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("border-t border-black-10", className)}>
      {items.map((item) => {
        const isOpen = item.id === openId;
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="border-b border-black-10">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full cursor-pointer items-center gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-40"
              >
                <Plus
                  aria-hidden
                  className={cn(
                    "size-6 shrink-0 text-black transition-transform",
                    isOpen && "rotate-45",
                  )}
                />
                <span className="text-xl font-semibold text-black">
                  {item.question}
                </span>
              </button>
            </h3>
            <section
              id={panelId}
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-5 pl-9 pr-4 text-lg leading-relaxed text-black-60"
            >
              {item.answer}
            </section>
          </div>
        );
      })}
    </div>
  );
}
