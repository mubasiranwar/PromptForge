export function compilePrompt(template, values) {
  return template.replace(
    /{{\s*([^}]+)\s*}}/g,
    (_, variable) => {
      const key = variable.trim();
      const value = values[key];

      return value && value.trim()
        ? value
        : `{{${key}}}`;
    }
  );
}