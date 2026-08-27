export function parseVariables(template) {
  const matches = template.match(/{{\s*([^}]+)\s*}}/g);

  if (!matches) {
    return [];
  }

  const variables = matches.map((match) =>
    match.replace(/{{|}}/g, "").trim()
  );

  return [...new Set(variables)];
}