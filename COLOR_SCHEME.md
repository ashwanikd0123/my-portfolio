# Color Scheme & Theme Specification - FluidVectorAR

This document outlines the visual color palette, brand guidelines, and theme token mappings implemented across the **FluidVectorAR** Android application.

---

## 🎨 Design Philosophy

FluidVectorAR uses a modern, high-contrast palette tailored for professional vector illustration and AR tracing.

* **Primary Accent (Tech Indigo):** Conveys precision, technology, and creation.
* **Secondary Accent (Electric Cyan):** Adds a vibrant neon touch for active states, interactive controls, and highlight backgrounds.
* **Pro Darkroom Base (Slate 900 / 800):** Reduces eye strain during drawing sessions and enhances color contrast for canvas elements.
* **Crisp Light Surface (Slate 50 / White):** Provides a clean, distraction-free environment for light theme users.

---

## 🖌️ Core Brand Palette

### 1. Brand Accents
| Color Name | Hex Code | Compose Variable | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Tech Indigo (Light)** | `#4F46E5` | `TechIndigoLight` | Primary actions, main drawing accents, light theme primary buttons |
| **Tech Indigo (Dark)** | `#818CF8` | `TechIndigoDark` | Dark theme primary actions, neon pop highlights |
| **Electric Cyan** | `#06B6D4` | `ElectricCyan` | Secondary accents, active tool states, interactive controls |
| **Soft Cyan** | `#E0F2FE` | `SoftCyan` | Highlight container backgrounds, selected state surfaces |

### 2. Neutrals & Surfaces (Light Theme - Clean Minimalist)
| Color Name | Hex Code | Compose Variable | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Slate Background Light** | `#F8FAFC` | `SlateBackgroundLight` | Artboard surrounding background zone |
| **Surface Light** | `#FFFFFF` | `SurfaceLight` | Floating cards, toolbars, dialogs, bottom sheets |
| **Border Light** | `#E2E8F0` | `BorderLight` | Subtle thin line borders, grid lines |
| **Text Primary Light** | `#0F172A` | `TextPrimaryLight` | Primary typography, headers, main icons |
| **Text Secondary Light** | `#64748B` | `TextSecondaryLight` | Secondary labels, disabled states, hint text |

### 3. Neutrals & Surfaces (Dark Theme - Pro Darkroom Mode)
| Color Name | Hex Code | Compose Variable | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Slate Background Dark** | `#0F172A` | `SlateBackgroundDark` | Main app background, dark mode base |
| **Surface Dark** | `#1E293B` | `SurfaceDark` | Floating toolbars, layer panels, dialog containers |
| **Border Dark** | `#334155` | `BorderDark` | Dark mode component borders and dividers |
| **Text Primary Dark** | `#F1F5F9` | `TextPrimaryDark` | Primary dark theme text, active icons |
| **Text Secondary Dark** | `#94A3B8` | `TextSecondaryDark` | Subtitles, inactive tool icons, secondary labels |

### 4. Functional & System Tones
| Color Name | Hex Code | Compose Variable | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **System Success** | `#10B981` | `SystemSuccess` | Layer addition indicators, save confirmations |
| **System Danger** | `#F43F5E` | `SystemDanger` | Eraser mode, delete actions, reticle warnings |

---

## ⚡ Material 3 Theme Mappings (`Theme.kt`)

The app uses `MaterialTheme` with custom `lightColorScheme` and `darkColorScheme` mappings.

> [!NOTE]
> Dynamic system colors (Material You wallpaper-based colors) are intentionally disabled to ensure design consistency across drawing tools and canvas overlays.

### Light Theme Scheme (`lightColorScheme`)
```kotlin
primary = TechIndigoLight         // #4F46E5
onPrimary = SurfaceLight          // #FFFFFF
primaryContainer = SoftCyan       // #E0F2FE
onPrimaryContainer = TechIndigoLight // #4F46E5
secondary = ElectricCyan          // #06B6D4
onSecondary = SurfaceLight        // #FFFFFF
background = SlateBackgroundLight // #F8FAFC
onBackground = TextPrimaryLight   // #0F172A
surface = SurfaceLight            // #FFFFFF
onSurface = TextPrimaryLight      // #0F172A
outline = BorderLight             // #E2E8F0
```

### Dark Theme Scheme (`darkColorScheme`)
```kotlin
primary = TechIndigoDark          // #818CF8
onPrimary = SlateBackgroundDark   // #0F172A
primaryContainer = SlateBackgroundDark // #0F172A
onPrimaryContainer = TechIndigoDark   // #818CF8
secondary = ElectricCyan          // #06B6D4
onSecondary = SlateBackgroundDark // #0F172A
background = SlateBackgroundDark  // #0F172A
onBackground = TextPrimaryDark    // #F1F5F9
surface = SurfaceDark             // #1E293B
onSurface = TextPrimaryDark       // #F1F5F9
outline = BorderDark              // #334155
```

---

## 📐 Canvas & Specialized Feature Colors

Beyond system theme colors, specific components utilize tailored tones for canvas interactions and export functions:

| Component | Color Hex | Description |
| :--- | :--- | :--- |
| **Selection Handles / Outline** | `#2196F3` | Active vector selection bounding box & transform handle fills |
| **Selection Mask Overlay** | `#602196F3` | Translucent blue fill for multi-element selection boundaries |
| **Canvas Grid Overlay** | `#E0E0E0` | Grid line color for artboard background guidelines |
| **Tutorial Card Base** | `#0F172A` / `#1A1A2E` | Container surfaces for AR projection & stencil camera tutorials |

---

## 📂 XML Resource Mappings (`res/values/colors.xml`)

XML resource colors support the system window backgrounds and cold-start splash themes:

```xml
<!-- Light Theme Splash & Windows -->
<color name="slate_background_light">#F8FAFC</color>
<color name="splash_background">#F8FAFC</color>

<!-- Dark Theme Splash & Windows (res/values-night/colors.xml) -->
<color name="splash_background">#0F172A</color>
```

---

## 🛠️ Code Reference Paths

* **Compose Colors:** [`Color.kt`](file:///C:/Users/ashwa/AndroidStudioProjects/FluidVectorAR/app/src/main/java/com/example/fluidvectorar/ui/theme/Color.kt)
* **Compose Theme Setup:** [`Theme.kt`](file:///C:/Users/ashwa/AndroidStudioProjects/FluidVectorAR/app/src/main/java/com/example/fluidvectorar/ui/theme/Theme.kt)
* **Values XML Colors:** [`colors.xml`](file:///C:/Users/ashwa/AndroidStudioProjects/FluidVectorAR/app/src/main/res/values/colors.xml)
* **Night Values XML Colors:** [`colors.xml (night)`](file:///C:/Users/ashwa/AndroidStudioProjects/FluidVectorAR/app/src/main/res/values-night/colors.xml)
