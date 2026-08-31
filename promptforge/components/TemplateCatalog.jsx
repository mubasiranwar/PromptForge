"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import TemplateCard from "@/components/TemplateCard";
import { templateCategories } from "@/data/templates";

export default function TemplateCatalog({
  templates,
  selectedTemplate,
  selectedCategory,
  onCategoryChange,
  onSelect,
  onCreate,
}) {
  const [search, setSearch] =
    useState("");

  const filteredTemplates = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    if (!query) {
      return templates;
    }

    return templates.filter((template) => {
      return (
        template.title
          .toLowerCase()
          .includes(query) ||
        template.description
          .toLowerCase()
          .includes(query)
      );
    });
  }, [templates, search]);

  return (
    <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] lg:overflow-hidden">
      <div className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="mb-5 px-2 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Library
              </p>

              <h2 className="mt-1 text-xl font-bold text-zinc-950">
                Templates
              </h2>
            </div>

            <button
              onClick={onCreate}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white transition hover:bg-zinc-800"
              title="Create template"
              aria-label="Create template"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mb-4">
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search templates..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 pl-10 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
          />

          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>

        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 lg:flex-wrap">
          {templateCategories.map((category) => (
            <button
              key={category}
              onClick={() =>
                onCategoryChange(category)
              }
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                selectedCategory === category
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-xs font-medium text-zinc-400">
            {filteredTemplates.length} templates
          </span>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {filteredTemplates.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-200 p-6 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                <Search className="h-4 w-4" />
              </div>

              <p className="text-sm font-semibold text-zinc-700">
                No templates found
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Try another search or category.
              </p>
            </div>
          ) : (
            filteredTemplates.map(
              (template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  selected={
                    selectedTemplate?.id ===
                    template.id
                  }
                  onClick={() =>
                    onSelect(template)
                  }
                />
              )
            )
          )}
        </div>
      </div>
    </aside>
  );
}