import { variablePresets } from "@/data/presets";
import { formatVariableName } from "@/utils/formatVariableName";

export default function VariablePresets({
  variables,
  values,
  onSelect,
}) {
  const availablePresets =
    variables.filter(
      (variable) =>
        variablePresets[variable]
    );

  if (availablePresets.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {availablePresets.map((variable) => (
        <div key={variable}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-800">
              {formatVariableName(variable)}
            </p>

            <span className="text-xs text-zinc-400">
              Quick presets
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {variablePresets[variable].map(
              (preset) => {
                const isSelected =
                  values[variable] ===
                  preset;

                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() =>
                      onSelect(
                        variable,
                        preset
                      )
                    }
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    {preset}
                  </button>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
}