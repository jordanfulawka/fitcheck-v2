---
name: FitCheck design
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#efecff'
  surface-container-high: '#e8e5ff'
  surface-container-highest: '#e2e0fc'
  on-surface: '#1a1a2e'
  on-surface-variant: '#444655'
  inverse-surface: '#2f2e43'
  inverse-on-surface: '#f2efff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2e4edc'
  primary: '#2346d5'
  on-primary: '#ffffff'
  primary-container: '#4361ee'
  on-primary-container: '#f4f2ff'
  inverse-primary: '#bac3ff'
  secondary: '#8429c8'
  on-secondary: '#ffffff'
  secondary-container: '#9e49e3'
  on-secondary-container: '#fffbff'
  tertiary: '#ac0058'
  on-tertiary: '#ffffff'
  tertiary-container: '#d90071'
  on-tertiary-container: '#fff0f2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee1ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#001159'
  on-primary-fixed-variant: '#0031c4'
  secondary-fixed: '#f2daff'
  secondary-fixed-dim: '#e0b6ff'
  on-secondary-fixed: '#2e004e'
  on-secondary-fixed-variant: '#6b00af'
  tertiary-fixed: '#ffd9e1'
  tertiary-fixed-dim: '#ffb1c6'
  on-tertiary-fixed: '#3f001c'
  on-tertiary-fixed-variant: '#8e0048'
  background: '#fcf8ff'
  on-background: '#1a1a2e'
  surface-variant: '#e2e0fc'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is engineered for efficiency, clarity, and momentum. It targets career-driven professionals who require a high-performance tool to manage complex application pipelines. The emotional response is one of "organized energy"—the interface should feel as precise as a developer tool but as approachable as a modern consumer app.

The aesthetic follows a **Modern Corporate** direction with **Minimalist** foundations. It utilizes heavy whitespace to reduce cognitive load during stressful job searches, while injecting "high-polish" through vibrant gradients and subtle depth. The visual language emphasizes "Forward Motion," using clean lines and energetic accents to motivate the user.

## Colors

The palette is anchored by a neutral, high-contrast foundation of White and Dark Charcoal to ensure peak legibility. Sophistication is introduced through a tiered grayscale for backgrounds and borders, creating a clear "layered" hierarchy without the need for heavy shadows.

Interactive energy is provided by a trio of "Electric" accents:

- **Electric Blue**: The primary driver for actions and progress.
- **Violet**: Used for secondary depth, transitions, and "Premium" features.
- **Coral**: A high-visibility accent for urgency and critical status indicators.

Status badges use a specific "Pastel-Vivid" pairing: a 10-15% opacity background of the accent color paired with a 1px solid border of the full-saturation accent color.

## Typography

Inter is the sole typeface, chosen for its exceptional legibility in data-heavy environments. The system uses tight tracking on larger headings to create a "dense," high-end feel, while maintaining standard tracking for body copy to ensure readability.

Hierarchy is established through weight rather than just size. Primary headings utilize Semi-Bold (600) and Bold (700) weights, while labels use a slightly increased letter-spacing to distinguish them from body text.

## Layout & Spacing

The layout employs a **Fixed Grid** model for centralized content (max-width 1280px) to maintain focus, switching to a fluid dashboard layout for the main application tracking board.

A strict 8px linear scale governs all padding and margins. Refined whitespace is achieved by "grouping" related information with tight `sm` spacing and "separating" major sections with `lg` or `xl` spacing. This creates a rhythmic flow that guides the eye through the application stages.

## Elevation & Depth

This design system uses a combination of **Tonal Layers** and **Ambient Shadows** to create a sense of organized stacking.

1.  **Base Layer**: `#f8f9fa` (Off-white) acts as the canvas.
2.  **Surface Layer**: `#ffffff` (White) is used for cards and main containers.
3.  **Elevation 1**: For standard cards, use a 1px border of `#dee2e6` and a very soft shadow: `0 4px 12px rgba(26, 26, 46, 0.05)`.
4.  **Elevation 2**: For hovered elements or modals, use a more pronounced but still diffused shadow: `0 12px 24px rgba(26, 26, 46, 0.08)`.

Avoid heavy blacks in shadows; use the Dark Charcoal (`#1a1a2e`) at very low opacities to keep the "Airy" feel.

## Shapes

The shape language is consistently **Rounded**, providing a modern, friendly, and accessible feel.

- **Standard Components**: 0.5rem (8px) radius for buttons and input fields.
- **Large Components**: 1rem (16px) radius for cards and modals to emphasize the "SaaS container" look.
- **Badges**: Fully rounded (pill-shaped) to distinguish them from interactive buttons.

## Components

### Buttons

- **Primary**: Solid Electric Blue fill or a linear gradient (Electric Blue to Violet at 135°). White text, 600 weight.
- **Secondary/Ghost**: 1px Electric Blue border with Electric Blue text. Transparent background.
- **Tertiary**: Plain text with Electric Blue color, no border, used for less prominent actions.

### Cards

- Cards must have a white background, 1px border of `#dee2e6`, and the "Elevation 1" shadow.
- Inside cards, use `#f8f9fa` for header or footer sections to create internal grouping.

### Status Badges

- **Active**: Light Blue background (10% #4361ee), 1px Electric Blue border, Electric Blue text.
- **Urgent**: Light Pink background (10% #f72585), 1px Coral border, Coral text.
- **Closed**: Light Grey background (10% #dee2e6), 1px Dark Grey border, Dark Charcoal text.

### Input Fields

- Height: 40px or 48px.
- Background: `#ffffff`.
- Border: 1.5px `#dee2e6`.
- Focus State: 1.5px Electric Blue border with a 3px soft blue outer glow (halo).

### Kanban Columns

- Use `#f1f3f5` as the column background with a 12px top-rounded header.
- Cards within columns should have a subtle vertical margin of 12px.
