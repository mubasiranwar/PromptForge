# PromptForge — Visual Prompt Template Studio

PromptForge is a **Next.js learning project** built to practice real-world React and Next.js concepts through a practical prompt-template application.

The project allows users to create and manage reusable AI prompt templates with dynamic variables such as `{{role}}`, `{{tone}}`, and `{{task}}`.

## 🎯 Learning Goals

This project is focused on learning:

* Next.js App Router
* React components & props
* `useState` and `useEffect`
* Controlled inputs
* Dynamic rendering
* Search & filtering
* Dynamic form generation
* Regular expressions
* Derived state
* Component communication
* Clipboard API
* `localStorage`
* CRUD operations
* Client-side persistence
* Clean component architecture

## 🛠️ Main Features

* Create and edit prompt templates
* Detect `{{variables}}` automatically
* Generate input fields dynamically
* Compile prompts in real time
* Live prompt preview
* Template search and category filtering
* Variable presets
* Copy compiled prompts
* Create custom templates
* Favorite and delete templates
* Save custom templates using `localStorage`

## 🧠 Core Learning Flow

```text
Template
   ↓
Parse Variables
   ↓
Generate Inputs
   ↓
Store Values in State
   ↓
Compile Prompt
   ↓
Live Preview
```

For persistence:

```text
React State
    ↓
localStorage
    ↓
Browser Persistence
```

## 📚 Key Mental Models

**State drives UI**

```text
State → React → UI
```

**Data drives components**

```text
Array → map() → Components
```

**Store source data, derive the rest**

```text
content + values
      ↓
compiledPrompt
```

## 🚀 Project Status

**Project:** PromptForge
**Type:** Learning Project
**Framework:** Next.js
**Language:** JavaScript
**Styling:** Tailwind CSS
**Backend:** None
**Persistence:** `localStorage`
**Status:** In Progress

> The goal is not just to finish PromptForge, but to understand **why each React/Next.js concept is needed and how the concepts work together in a real application.**
