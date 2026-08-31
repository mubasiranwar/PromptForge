export const starterTemplates = [
  {
    id: "code-reviewer",
    title: "Code Reviewer",
    category: "Coding",
    description:
      "Review code and provide clear, actionable technical feedback.",
    content: `Act as a {{role}}.

Review the following {{language}} code.

Identify:
- Bugs
- Performance issues
- Code quality problems
- Possible improvements

Code:
{{code}}

Provide your feedback in a {{tone}} tone.`,
  },

  {
    id: "seo-post-generator",
    title: "SEO Post Generator",
    category: "Writing",
    description:
      "Create structured, search-friendly content for any topic.",
    content: `Write an SEO-friendly article about {{topic}}.

Target audience:
{{targetAudience}}

Use a {{tone}} tone.

The article should be {{length}} and include:
- A strong title
- Clear headings
- Useful information
- A conclusion.`,
  },

  {
    id: "language-translator",
    title: "Language Translator",
    category: "Productivity",
    description:
      "Translate content while preserving its original meaning and context.",
    content: `Translate the following text into {{language}}.

Maintain the original meaning, context, and intent.

Text:
{{text}}

Use a {{tone}} tone.`,
  },

  {
    id: "email-polisher",
    title: "Email Polisher",
    category: "Writing",
    description:
      "Turn rough emails into clear, polished communication.",
    content: `Rewrite the following email.

Make it {{tone}} and {{style}}.

Keep the original meaning while improving:
- Grammar
- Clarity
- Professionalism

Email:
{{email}}`,
  },
];

export const templateCategories = [
  "All",
  ...new Set(
    starterTemplates.map(
      (template) => template.category
    )
  ),
  "Custom",
  "Favorites",
];