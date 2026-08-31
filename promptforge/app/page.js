"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Plus, Sparkles } from "lucide-react";

import { starterTemplates } from "@/data/templates";

import TemplateCatalog from "@/components/TemplateCatalog";
import TemplateEditor from "@/components/TemplateEditor";
import TemplateForm from "@/components/TemplateForm";

import {
  getCustomTemplates,
  saveCustomTemplates,
} from "@/utils/storage";

export default function Home() {
  const [
    customTemplates,
    setCustomTemplates,
  ] = useState([]);

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState(starterTemplates[0]);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [showForm, setShowForm] =
    useState(false);

  useEffect(() => {
    const savedTemplates =
      getCustomTemplates();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustomTemplates(
      savedTemplates
    );
  }, []);

  const allTemplates = useMemo(() => {
    return [
      ...starterTemplates,
      ...customTemplates,
    ];
  }, [customTemplates]);

  const filteredTemplates =
    useMemo(() => {
      if (selectedCategory === "All") {
        return allTemplates;
      }

      if (
        selectedCategory ===
        "Custom"
      ) {
        return customTemplates;
      }

      if (
        selectedCategory ===
        "Favorites"
      ) {
        return allTemplates.filter(
          (template) =>
            template.favorite
        );
      }

      return allTemplates.filter(
        (template) =>
          template.category ===
          selectedCategory
      );
    }, [
      allTemplates,
      customTemplates,
      selectedCategory,
    ]);

  function handleCreateTemplate(
    template
  ) {
    const updatedTemplates = [
      ...customTemplates,
      template,
    ];

    setCustomTemplates(
      updatedTemplates
    );

    saveCustomTemplates(
      updatedTemplates
    );

    setSelectedTemplate(template);

    setShowForm(false);

    setSelectedCategory("All");
  }

  function handleSaveTemplate(
    updatedTemplate
  ) {
    const updatedTemplates =
      customTemplates.map(
        (template) =>
          template.id ===
          updatedTemplate.id
            ? updatedTemplate
            : template
      );

    setCustomTemplates(
      updatedTemplates
    );

    saveCustomTemplates(
      updatedTemplates
    );

    setSelectedTemplate(
      updatedTemplate
    );
  }

  function handleDeleteTemplate() {
    if (!selectedTemplate?.isCustom) {
      return;
    }

    const confirmed =
      window.confirm(
        `Delete "${selectedTemplate.title}"?`
      );

    if (!confirmed) {
      return;
    }

    const updatedTemplates =
      customTemplates.filter(
        (template) =>
          template.id !==
          selectedTemplate.id
      );

    setCustomTemplates(
      updatedTemplates
    );

    saveCustomTemplates(
      updatedTemplates
    );

    setSelectedTemplate(
      starterTemplates[0]
    );

    setSelectedCategory("All");
  }

  function handleFavoriteTemplate() {
    if (!selectedTemplate?.isCustom) {
      return;
    }

    const updatedTemplates =
      customTemplates.map(
        (template) =>
          template.id ===
          selectedTemplate.id
            ? {
                ...template,
                favorite:
                  !template.favorite,
              }
            : template
      );

    setCustomTemplates(
      updatedTemplates
    );

    saveCustomTemplates(
      updatedTemplates
    );

    const updatedTemplate =
      updatedTemplates.find(
        (template) =>
          template.id ===
          selectedTemplate.id
      );

    setSelectedTemplate(
      updatedTemplate
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="mb-6 rounded-3xl border border-zinc-200 bg-white px-5 py-5 shadow-sm md:px-7">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    PromptForge
                  </p>

                  <h1 className="text-xl font-bold tracking-tight text-zinc-950">
                    Visual Prompt Studio
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500">
                Build reusable AI prompts with
                dynamic variables, presets,
                live previews, and local
                browser storage.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 sm:block">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Templates
                </p>

                <p className="text-sm font-bold text-zinc-800">
                  {allTemplates.length}
                </p>
              </div>

              <button
                onClick={() =>
                  setShowForm(true)
                }
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
              >
                <Plus className="h-4 w-4" />
                New Template
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">
          <TemplateCatalog
            templates={
              filteredTemplates
            }
            selectedTemplate={
              selectedTemplate
            }
            selectedCategory={
              selectedCategory
            }
            onCategoryChange={
              setSelectedCategory
            }
            onSelect={
              setSelectedTemplate
            }
            onCreate={() =>
              setShowForm(true)
            }
          />

          <div className="min-w-0">
            {showForm ? (
              <TemplateForm
                onCreate={
                  handleCreateTemplate
                }
                onCancel={() =>
                  setShowForm(false)
                }
              />
            ) : (
              <TemplateEditor
                key={selectedTemplate?.id}
                template={
                  selectedTemplate
                }
                onSave={
                  handleSaveTemplate
                }
                onDelete={
                  handleDeleteTemplate
                }
                onFavorite={
                  handleFavoriteTemplate
                }
              />
            )}
          </div>
        </div>

        <footer className="mt-8 border-t border-zinc-200 px-2 py-5 text-center">
          <p className="text-xs text-zinc-400">
            PromptForge · Frontend-only AI
            prompt workspace
          </p>
        </footer>
      </div>
    </main>
  );
}