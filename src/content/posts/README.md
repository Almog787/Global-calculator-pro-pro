# Managing Articles

This folder contains all the articles (insights) displayed on the website.
To add a new article, simply create a new `.md` (Markdown) file in this directory.

## Format Requirements

Each markdown file must start with a "frontmatter" block surrounded by `---` lines. This block tells the website the title, description, tags, etc.

Below is a template you can copy and paste for a new article:

```markdown
---
title: "Your Article Title Here"
description: "A short 1-2 sentence description that appears on the cards."
date: "Month DD, YYYY"
tags: ["Category1", "Category2"]
icon: "article"
image: "https://optional-image-url.com/image.jpg"
---

# Your Main Heading Here

Write the content of your article here using standard Markdown formatting.

## Subheadings

You can use subheadings, **bold text**, lists, and more.
```

### Supported Icons
The `icon` field uses Google Material Symbols. You can find icons at:
https://fonts.google.com/icons
(Example: "public", "calculate", "trending_up")

### Images
The `image` field is optional. If provided, it will be used as the cover photo for the article. If omitted, the `icon` will be displayed instead.

### Tags
Tags are used for filtering on the Insights page. Use an array format: `["Finance", "Economy"]`.

Once you commit a new markdown file to the `main` branch, the GitHub Action will automatically rebuild and deploy the site!
