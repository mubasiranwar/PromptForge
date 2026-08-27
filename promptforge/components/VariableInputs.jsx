import { formatVariableName } from "@/utils/formatVariableName";

const textareaVariables = [
  "task",
  "context",
  "content",
  "requirements",
  "description",
  "feedback",
  "code",
  "email",
  "text",
];

export default function VariableInputs({
  variables,
  values,
  onChange,
}) {
  if (variables.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm font-medium text-zinc-700">
          No variables detected
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-400">
          Add variables such as {"{{role}}"} or{" "}
          {"{{tone}}"} to your template.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {variables.map((variable) => {
        const value =
          values[variable] || "";

        const label =
          formatVariableName(variable);

        const isFilled =
          value.trim().length > 0;

        const isTextarea =
          textareaVariables.includes(
            variable.toLowerCase()
          );

        return (
          <div key={variable}>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor={variable}
                className="text-sm font-semibold text-zinc-800"
              >
                {label}
              </label>

              <span
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  isFilled
                    ? "text-zinc-700"
                    : "text-zinc-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isFilled
                      ? "bg-zinc-700"
                      : "bg-zinc-300"
                  }`}
                />

                {isFilled
                  ? "Filled"
                  : "Required"}
              </span>
            </div>

            {isTextarea ? (
              <textarea
                id={variable}
                value={value}
                onChange={(event) =>
                  onChange(
                    variable,
                    event.target.value
                  )
                }
                placeholder={`Enter ${label.toLowerCase()}...`}
                rows={4}
                className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
              />
            ) : (
              <input
                id={variable}
                type="text"
                value={value}
                onChange={(event) =>
                  onChange(
                    variable,
                    event.target.value
                  )
                }
                placeholder={`Enter ${label.toLowerCase()}...`}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}