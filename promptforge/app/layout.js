import "./globals.css";

export const metadata = {
  title: "PromptForge — Visual Prompt Studio",
  description:
    "Build, test and organize reusable AI prompt templates.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}