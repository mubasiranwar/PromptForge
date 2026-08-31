"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Sparkles,
} from "lucide-react";

export default function PromptPreview({
  prompt,
}) {
  const [copied, setCopied] =
    useState(false);

  async function handleCopy() {
    if (!prompt.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        prompt
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy prompt:",
        error
      );
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400" />

            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Live
            </span>
          </div>

          <h3 className="mt-1 font-semibold text-white">
            Compiled Prompt
          </h3>
        </div>

        <button
          onClick={handleCopy}
          disabled={!prompt.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Prompt
            </>
          )}
        </button>
      </div>

      <div className="min-h-90 p-5">
        {prompt ? (
          <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-300">
            {prompt}
          </pre>
        ) : (
          <div className="flex min-h-80 items-center justify-center text-center">
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-zinc-300">
                <Sparkles className="h-5 w-5" />
              </div>

              <p className="font-medium text-zinc-400">
                Your prompt will appear here
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Fill in the variables to
                generate your prompt.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-5 py-3">
        <p className="text-xs text-zinc-600">
          Changes update automatically
        </p>
      </div>
    </div>
  );
}