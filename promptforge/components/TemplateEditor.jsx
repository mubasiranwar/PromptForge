"use client";

import { useState } from "react";
import {
  Check,
  Star,
  Trash2,
} from "lucide-react";

import { parseVariables } from "@/utils/parseVariables";
import { compilePrompt } from "@/utils/compilePrompt";
import { getMissingVariables } from "@/utils/getMissingVariables";

import VariableInputs from "@/components/VariableInputs";
import VariablePresets from "@/components/VariablePresets";
import PromptPreview from "@/components/PromptPreview";

export default function TemplateEditor({
  template,
  onSave,
  onDelete,
  onFavorite,
}) {
  const [content, setContent] = useState(
    template.content
  );

  const [values, setValues] = useState({});

  function handleVariableChange(variable, value) {
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: value,
    }));
  }

  function handlePresetSelect(variable, value) {
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: value,
    }));
  }

  function handleReset() {
    setContent(template.content);
    setValues({});
  }

  function handleSave() {
    onSave({
      ...template,
      content,
    });
  }

  const variables = parseVariables(content);

  const missingVariables = getMissingVariables(
    variables,
    values
  );

  const compiledPrompt = compilePrompt(
    content,
    values
  );

  const completion =
    variables.length === 0
      ? 100
      : Math.round(
          ((variables.length -
            missingVariables.length) /
            variables.length) *
            100
        );

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-500">
              {template.category}
            </span>

            {template.isCustom && (
              <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-500">
                Custom
              </span>
            )}
          </div>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">
            {template.title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            {template.description}
          </p>
        </div>

        {template.isCustom && (
          <div className="flex gap-2">
            <button
              onClick={onFavorite}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm transition hover:bg-zinc-50"
            >
              <Star
                className={`h-4 w-4 ${
                  template.favorite
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-400"
                }`}
              />
              {template.favorite
                ? "Favorited"
                : "Favorite"}
            </button>

            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm transition hover:bg-zinc-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Step 01
                </p>

                <h3 className="mt-1 text-lg font-bold text-zinc-900">
                  Template
                </h3>
              </div>

              <span className="text-xs text-zinc-400">
                {content.length} characters
              </span>
            </div>

            <textarea
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              rows={14}
              className="w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-7 text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleReset}
                disabled={
                  content === template.content
                }
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Step 02
              </p>

              <div className="mt-1 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <h3 className="text-lg font-bold text-zinc-900">
                  Variables
                </h3>

                <span className="text-xs font-medium text-zinc-400">
                  {variables.length} detected
                </span>
              </div>
            </div>

            <VariableInputs
              variables={variables}
              values={values}
              onChange={handleVariableChange}
            />

            {missingVariables.length > 0 && (
              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">
                      Variables need attention
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      Fill these fields to complete
                      your prompt.
                    </p>
                  </div>

                  <span className="text-sm font-bold text-zinc-600">
                    {completion}%
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-200">
                  <div
                    className="h-full rounded-full bg-zinc-700 transition-all"
                    style={{
                      width: `${completion}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {missingVariables.map(
                    (variable) => (
                      <span
                        key={variable}
                        className="rounded-lg bg-white px-2.5 py-1.5 font-mono text-xs text-zinc-500"
                      >
                        {`{{${variable}}}`}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Step 03
              </p>

              <h3 className="mt-1 text-lg font-bold text-zinc-900">
                Quick Presets
              </h3>
            </div>

            <VariablePresets
              variables={variables}
              values={values}
              onSelect={handlePresetSelect}
            />
          </div>

          {template.isCustom && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
              >
                <Check className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <PromptPreview prompt={compiledPrompt} />
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Detected Variables
          </p>

          <h3 className="mt-1 text-lg font-bold text-zinc-900">
            Template variables
          </h3>
        </div>

        {variables.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No variables detected.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {variables.map((variable) => (
              <span
                key={variable}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-xs text-zinc-600"
              >
                {`{{${variable}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 