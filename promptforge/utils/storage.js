const STORAGE_KEY =
  "promptforge-custom-templates";

export function getCustomTemplates() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Failed to load custom templates:",
      error
    );

    return [];
  }
}

export function saveCustomTemplates(
  templates
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(templates)
    );
  } catch (error) {
    console.error(
      "Failed to save custom templates:",
      error
    );
  }
}