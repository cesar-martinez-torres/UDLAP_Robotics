# UDLAP Robotics Website -- Technical Requirements Specification (Revised)

## 1. Objective

Define the technical requirements for enhancing the UDLAP Robotics
documentation website.\
The system must support advanced Markdown rendering, improved UI
components, and a hierarchical navigation structure for Tutorials,
Projects, and Research content.

This specification incorporates clarifications from the final
requirements document to ensure full alignment with the expected
behavior of the site.

------------------------------------------------------------------------

# 2. Functional Requirements

## 2.1 Advanced Table Rendering

The website must support structured tables used to display **lists of
project components**.

Requirements:

-   Minimum **4 columns**
-   Customizable number of rows
-   Styled rendering instead of default Markdown table appearance
-   Responsive layout behavior

Implementation notes:

-   Native Markdown tables are insufficient.
-   Tables should be rendered using enhanced HTML components.
-   Horizontal scrolling must be supported for overflow.
-   Column alignment should be configurable.

------------------------------------------------------------------------

## 2.2 Image Centering and Text Justification

The website must support:

-   Center-aligned images
-   Fully justified text blocks

Implementation notes:

-   Images should be wrapped inside a container class.
-   CSS utilities such as `.center-image` and `.text-justify` should be
    supported.
-   Layout must remain consistent across different screen sizes.

------------------------------------------------------------------------

## 2.3 Favicon Customization

The website must allow replacing the site favicon using a provided PNG
image.

Technical requirements:

-   Update the `<link rel="icon">` reference.
-   Convert PNG to `.ico` automatically if required.
-   Ensure browser caching refreshes the favicon after replacement.

------------------------------------------------------------------------

## 2.4 Copy-to-Clipboard for Code Blocks

All code blocks must include a **copy button**, similar to GitHub
Markdown.

Technical requirements:

-   Each `<pre><code>` block must include a copy button.
-   Use the Clipboard API to copy code content.
-   Provide visual feedback such as **"Copied!"**.
-   Must not interfere with syntax highlighting.

------------------------------------------------------------------------

## 2.5 Badge Rendering

Badges must appear **in a single horizontal row** while remaining
interactive.

Badges may be generated using:

-   https://github.com/Ileriayo/markdown-badges
-   https://shields.io

Technical requirements:

-   Consecutive badge images must be grouped inside a flex container.
-   Prevent line breaks between badges.
-   Enable horizontal scrolling if needed.
-   Badge links must remain clickable.

Example CSS:

    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 6px;

------------------------------------------------------------------------

## 2.6 Alert / Admonition Blocks

The system must support alert blocks similar to GitHub documentation.

Supported types:

-   NOTE
-   TIP
-   IMPORTANT
-   WARNING
-   CAUTION

Example Markdown syntax:

    > [!NOTE]
    > Informational message

Technical requirements:

-   Convert extended Markdown syntax into styled components.
-   Each alert must include:
    -   An icon
    -   Color-coded border
    -   Distinct background color

------------------------------------------------------------------------

## 2.7 Sidebar Visibility Control

The left navigation column must be optionally hidden.

Technical requirements:

-   Implement a toggle button to show/hide the sidebar.
-   Layout must adapt dynamically when the sidebar is hidden.
-   Sidebar must collapse automatically on smaller screens.
-   Optional: store the user preference locally.

------------------------------------------------------------------------

## 2.8 Content Structure and Folder Hierarchy

Content must be organized using the following repository structure:

    /tutorials
    /projects
    /research

These folders correspond to the site sections.

However, **the UI must display section names in Spanish**, while
**internal identifiers remain in English**.

Example mapping:

  Internal Key   UI Label
  -------------- ---------------
  tutorials      Tutoriales
  projects       Proyectos
  research       Investigación

Example configuration:

``` javascript
{
  tutorials: {
    displayName: "Tutoriales"
  },
  projects: {
    displayName: "Proyectos"
  },
  research: {
    displayName: "Investigación"
  }
}
```

Technical requirements:

-   Navigation should be automatically generated from the folder
    structure.
-   Internal links must remain stable.
-   UI labels must appear in Spanish.

------------------------------------------------------------------------

## 2.9 Expandable Navigation Tree

The sidebar must display a **collapsible hierarchical navigation menu**.

Example structure:

    Tutoriales
     ├── URSIM
     │    ├── tutorial1
     │    ├── tutorial2
     │    └── tutorial3
     ├── ROS
     └── Electrónica básica

    Proyectos
     ├── robot_dibujante
     ├── ping_pong_led
     └── yolo

    Investigación
     ├── eladrosy
     ├── robot_control
     └── navigation

Technical requirements:

-   Navigation nodes must be expandable and collapsible.
-   The currently selected page must appear expanded.
-   Multiple nesting levels must be supported.

------------------------------------------------------------------------

## 2.10 Internal Article Index

Each tutorial or project page must include an internal **Table of
Contents (TOC)**.

Technical requirements:

-   Automatically parse headings (`h1`--`h4`).
-   Generate anchor links.
-   Display a floating or sidebar TOC.
-   Highlight the active section while scrolling.

------------------------------------------------------------------------

## 2.11 Article Sections Must Be Expanded by Default

Within each article, the internal navigation sections must appear
**expanded (not collapsed) by default**.

Example sections inside a tutorial:

    Prerequisites
    Introduction
    Environment Setup
    Instructions
    Conclusion
    References and Additional Resources
    Contact

Technical requirements:

-   Article subsections must be visible by default.
-   Users may collapse sections manually if supported.
-   The default state must always be **expanded**.

------------------------------------------------------------------------

# 3. Non-Functional Requirements

## 3.1 Responsiveness

-   Mobile-first layout
-   Sidebar collapses automatically on smaller screens

## 3.2 Accessibility

-   WCAG-compliant contrast
-   Keyboard navigation support
-   ARIA attributes for interactive components

## 3.3 Performance

-   Lazy-load images
-   Minimal JavaScript injection
-   Avoid blocking page rendering

## 3.4 Maintainability

-   Modular UI components
-   Configurable Markdown extensions
-   Clear separation between content and layout
