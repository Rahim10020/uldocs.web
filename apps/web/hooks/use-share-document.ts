"use client";

import { useEffect, useRef, useState } from "react";

function copyWithTextarea(url: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.className = "fixed left-0 top-0 opacity-0";
  textarea.setAttribute("readonly", "");
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  return copied;
}

/** Partage natif si disponible, sinon copie du lien dans le presse-papiers. */
export function useShareDocument(title: string) {
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  async function share(): Promise<void> {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    let copied = false;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        copied = true;
      } catch {
        copied = copyWithTextarea(url);
      }
    } else {
      copied = copyWithTextarea(url);
    }

    if (copied) {
      setIsCopied(true);

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => setIsCopied(false), 2200);
    }
  }

  return { share, isCopied };
}
