# Micro-Interactions Documentation

This project includes two main micro-interactions:

1. **Theme Switch (Auto / Light / Dark)**  
2. **Accent Color Picker**

Each interaction is described below with usage details and simple test checklists.

---

## 1) 🌗 Theme Switch (Auto / Light / Dark)

### Description
A segmented control that switches the site theme between:
- **Auto**: Follows the operating system preference (`prefers-color-scheme`).  
- **Light**: Forces light mode.  
- **Dark**: Forces dark mode.  

The current theme is saved in `localStorage` (`site-theme`) so it persists after reloading.  
The active theme is applied using a `data-theme="dark"` attribute on the `<html>` element.

### Files Involved
- **`script.js`** → Handles button clicks, localStorage, and system preference changes.  
- **`index.html`** → Contains the segmented control markup.  
- **`style.css`** → Applies light/dark styles using CSS variables.  

### How to Test
- **Functional:** Click each button (`Auto`, `Light`, `Dark`).  
  - Expectation: Theme changes instantly; pressed button shows `aria-pressed="true"`.  
- **Persistence:** Select a theme, refresh the page.  
  - Expectation: The same theme loads from `localStorage`.  
- **Auto Behavior:** Set system theme to dark → select Auto → switch system to light.  
  - Expectation: Page updates automatically.  
- **Keyboard:** Use `Tab` + `Enter/Space` to switch themes.  
  - Expectation: Works same as mouse click.  
- **Accessibility:** Screen reader should announce which button is active.  
- **Visual/Regression:** Check background, text, and card colors match `:root` and `:root[data-theme="dark"]`.  
- **Cross-Browser:** Test in Chrome, Firefox, Safari; confirm no console errors.  

---

## 2) 🎨 Accent Color Picker

### Description
A color picker that lets users set a custom site accent color.  
- Updates CSS variables: `--accent`, `--accent-rgba`, `--accent-contrast`.  
- Updates a swatch preview and hex code.  
- Tokens briefly “pulse” with animation when color changes.  
- Automatically calculates readable contrast (white or dark text).  
- Saves choice in `localStorage` (`site-accent`) and restores it on reload.  

### Files Involved
- **`script.js`** → Handles color input, updates variables, stores in `localStorage`.  
- **`index.html`** → Contains the color input and swatch display.  
- **`style.css`** → Defines accent variables and pulse animation.  

### How to Test
- **Functional:** Pick a color.  
  - Expectation: Swatch and buttons update; tokens pulse briefly.  
- **Persistence:** Change color → refresh.  
  - Expectation: Same color loads from `localStorage`.  
- **Contrast Check:**  
  - Dark accent → text should be white.  
  - Light accent → text should be dark.  
- **Animation:** Change colors quickly.  
  - Expectation: Tokens animate (pulse) without layout shift.  
- **Keyboard Input:** Use Tab + arrow keys on color picker.  
  - Expectation: Accent updates correctly.  
- **Accessibility:**  
  - Screen reader announces “Choose accent color.”  
  - Contrast ratios meet WCAG AA.  
- **Edge Case:** Set picker value to empty.  
  - Expectation: No crashes; defaults handled.  
- **Mobile:** Test on iOS/Android.  
  - Expectation: Native color picker works, updates applied.  

---

## ✅ Summary

- **Theme Switch:** Lets users control or auto-follow system theme.  
- **Accent Picker:** Lets users personalize accent color with accessibility in mind.  

Both micro-interactions are:
- Persistent across reloads  
- Accessible via keyboard and screen reader  
- Tested for edge cases and mobile support
