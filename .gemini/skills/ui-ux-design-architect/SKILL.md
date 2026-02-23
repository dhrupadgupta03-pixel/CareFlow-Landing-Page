---
name: ui-ux-design-architect
description: Guides users through a multi-phase technical UI/UX discovery process to build a comprehensive Design Strategy Document and Competitive Benchmark. Use this when starting a new project or redesigning an existing system to establish architectural and design foundations.
---

# UI/UX Design Architect

## Overview
This skill implements a 5-phase structured workflow to architect a UI/UX system. It ensures technical constraints, user needs, and competitive landscape are all addressed before finalized designs are produced.

## Workflow
You must follow these phases in order. Do not skip ahead unless the user provides all information upfront.

### Phase 1: Foundation (Problem & People)
**Objective:** Establish the "Why" and "Who".
- Ask for: Project Name, Core Friction (2-3 sentences), User Personas (Receptionist, Doctor, Patient - or relevant roles), and Device Context.

### Phase 2: Strategy & Principles
**Objective:** Define the "Vibe" and "Success".
- Ask for: Experience Goals (e.g., "Calming"), Design Principles (e.g., "Efficiency first"), and Success Metrics (e.g., "Task completion time").

### Phase 3: Information Architecture & Systems
**Objective:** Build the "Skeleton".
- Ask for: Sitemap/Hierarchy, Mental Models (how users think about the task), and Design System Foundation (Semantic Color strategy, Typography scale, Grid system).

### Phase 4: Interaction & Accessibility
**Objective:** Address "Edge Cases" and "Inclusivity".
- Ask for: The Happy Path flow, State Management (Loading, Empty, Error), and Accessibility (A11y) requirements.

### Phase 5: Competitive Benchmarking
**Objective:** Understand the "Market Standards".
- Ask for: 4 Competitor names and specific questions regarding their design elements, principles, and basic design system appearance.

## Output Generation
After all phases are complete, generate two documents using the templates in `references/templates.md`:
1. **[Project Name] UI/UX Design Strategy Document**
2. **Competitive Landscape & Design Benchmarking**

## Guidelines
- **Be Technical:** Focus on UI architecture (semantic variables, grid systems, state machines) rather than just aesthetics.
- **Iterative:** Summarize the answers from the previous phase before starting the next.
- **Concise:** Keep Q&A focused on architectural decisions.
