export default function TemplateCard({
  template,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-zinc-900 bg-zinc-900 shadow-lg"
          : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={`truncate font-semibold ${
                selected
                  ? "text-white"
                  : "text-zinc-900"
              }`}
            >
              {template.title}
            </h3>

            {template.isCustom && (
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  selected
                    ? "bg-white/10 text-white"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                Custom
              </span>
            )}
          </div>

          <p
            className={`mt-2 line-clamp-2 text-sm leading-5 ${
              selected
                ? "text-zinc-300"
                : "text-zinc-500"
            }`}
          >
            {template.description}
          </p>
        </div>

        {template.favorite && (
          <span
            className={`text-lg ${
              selected
                ? "text-white"
                : "text-zinc-400"
            }`}
          >
            ★
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
            selected
              ? "bg-white/10 text-zinc-200"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {template.category}
        </span>

        <span
          className={`text-xs ${
            selected
              ? "text-zinc-400"
              : "text-zinc-400"
          }`}
        >
          Open →
        </span>
      </div>
    </button>
  );
}