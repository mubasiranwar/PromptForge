"use client";

import { useState } from "react";

export default function TemplateForm({
  onCreate,
  onCancel,
}) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [content, setContent] =
    useState("");

  const [error, setError] =
    useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a template title.");
      return;
    }

    if (!content.trim()) {
      setError(
        "Please enter your prompt template."
      );
      return;
    }

    const template = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: "Custom",
      description:
        description.trim() ||
        "Custom PromptForge template.",
      content,
      isCustom: true,
      favorite: false,
    };

    onCreate(template);
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Custom
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">
            Create a template
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Build a reusable prompt with dynamic
            variables. Use {"{{variable}}"} to
            create interactive fields.
          </p>
        </div>

        <button
          onClick={onCancel}
          className="rounded-xl border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50"
        >
          Close
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-800">
            Template name
          </label>

          <input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="e.g. Meeting Summarizer"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-800">
            Description
          </label>

          <input
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="Describe what this template does..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-zinc-800">
              Prompt template
            </label>

            <span className="text-xs text-zinc-400">
              Supports {"{{variables}}"}
            </span>
          </div>

          <textarea
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            rows={14}
            placeholder={`Act as a {{role}}.

Complete this {{task}}.

Use a {{tone}} tone.`}
            className="w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-950 p-5 font-mono text-sm leading-7 text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
          >
            Create Template
          </button>
        </div>
      </form>
    </div>
  );
}