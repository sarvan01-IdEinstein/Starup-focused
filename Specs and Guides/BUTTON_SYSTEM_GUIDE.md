# IdEinstein Button System Guide

## Overview

This guide explains the standardized button system for IdEinstein, designed to ensure consistent branding, accessibility, and user experience across all components.

## Button Variants

### Primary Buttons (Blue Brand Color)

#### `primary`
- **Use**: Main CTA buttons on light backgrounds
- **Style**: Blue background (#1E40AF), white text
- **Example**: "Book Consultation", "Submit Form"

#### `primary-light`
- **Use**: Main CTA buttons on dark backgrounds (gradients, dark sections)
- **Style**: White background, dark blue text
- **Example**: Hero section buttons on dark gradients

### Secondary Buttons (Outline Style)

#### `secondary`
- **Use**: Secondary actions on light backgrounds
- **Style**: Blue outline, blue text, fills on hover
- **Example**: "Learn More", "View Details"

#### `secondary-light`
- **Use**: Secondary actions on dark backgrounds
- **Style**: White outline, white text, fills on hover
- **Example**: Secondary buttons in dark hero sections

### Startup Accelerator (Gold Brand Color)

#### `accelerator`
- **Use**: Startup-specific services and CTAs
- **Style**: Gold gradient (yellow-500 to orange-500), white text
- **Example**: "Start Your Accelerator", startup service buttons

#### `accelerator-outline`
- **Use**: Secondary startup actions
- **Style**: Gold outline, gold text, fills on hover
- **Example**: Secondary startup CTAs

### Utility Buttons

#### `ghost`
- **Use**: Subtle actions, less prominent buttons
- **Style**: Transparent background, blue text, light hover

#### `link`
- **Use**: Text links that look like buttons
- **Style**: Blue text with underline on hover

#### `header`
- **Use**: Navigation and header buttons
- **Style**: White background, blue text, optimized for header

#### `destructive`
- **Use**: Delete, remove, or dangerous actions
- **Style**: Red background, white text

#### `success`
- **Use**: Confirm, save, or positive actions
- **Style**: Green background, white text

## Usage Guidelines

### For Light Backgrounds (white, light gray)
```tsx
// Main action
<Button variant="primary">Primary Action</Button>

// Secondary action
<Button variant="secondary">Secondary Action</Button>

// Startup services
<Button variant="accelerator">Start Accelerator</Button>
<Button variant="accelerator-outline">Learn About Accelerator</Button>
```

### For Dark Backgrounds (blue gradients, dark sections)
```tsx
// Main action
<Button variant="primary-light">Primary Action</Button>

// Secondary action
<Button variant="secondary-light">Secondary Action</Button>

// Startup services (works on any background)
<Button variant="accelerator">Start Accelerator</Button>
```

### For Navigation/Header
```tsx
<Button variant="header">Customer Area</Button>
```

## Color Scheme

- **Primary Blue**: #1E40AF (IdEinstein brand blue)
- **Einstein Gold**: #F59E0B (IdEinstein brand gold)
- **Hover States**: Darker shades for better interaction feedback
- **Text**: High contrast ratios for accessibility (WCAG AA compliant)
- **Shadows**: Enhanced for depth and premium feel

## Accessibility Features

- High contrast ratios (WCAG AA compliant)
- Focus states with visible rings
- Proper hover and active states
- Semantic color usage (red for destructive, green for success)

## Examples by Section

### Homepage Hero
```tsx
// Main CTA on dark background
<Button variant="accelerator" size="lg">🚀 Start Your Project</Button>

// Secondary action on dark background
<Button variant="secondary-light" size="lg">Learn Our Model</Button>
```

### Service Pages
```tsx
// Main CTA on light background
<Button variant="primary">Get Started</Button>

// Secondary action on light background
<Button variant="secondary">Learn More</Button>
```

### Forms
```tsx
// Submit button
<Button variant="primary" type="submit">Submit Form</Button>

// Cancel button
<Button variant="ghost">Cancel</Button>
```

### Contact/Support
```tsx
// Contact widget
<Button variant="primary" size="icon">
  <MessageCircle className="w-6 h-6" />
</Button>
```

## Migration Notes

### Old → New Mappings
- `default` → `primary`
- `outline` → `secondary` (light bg) or `secondary-light` (dark bg)
- `cta` → `primary` or `accelerator` (for startup services)
- `cta-white` → `primary-light`
- `outline-dark` → `primary-light` or `secondary-light`
- `header-cta` → `header`

## Best Practices

1. **Consistency**: Use the same variant for similar actions across the site
2. **Hierarchy**: Primary buttons for main actions, secondary for supporting actions
3. **Context**: Choose variants based on background color for optimal contrast
4. **Startup Focus**: Use `accelerator` variant for all startup-related services
5. **Accessibility**: Ensure sufficient color contrast and focus states

## Testing

Test buttons on both light and dark backgrounds to ensure readability and visual hierarchy are maintained.