export function getMissingVariables(
  variables,
  values
) {
  return variables.filter((variable) => {
    const value = values[variable];

    return !value || value.trim().length === 0;
  });
}