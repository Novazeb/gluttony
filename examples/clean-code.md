# Gluttony Code Examples: Before vs After

## 1. Minimalist Utility (YAGNI & Standard Library)

### Bad (Over-engineered with AI comments):
```ts
// ===================================
// UTILITY: FETCH DATA FUNCTION
// ===================================

import axios from 'axios';

// Interface for API response
interface ApiResponse<T> {
  data: T;
  status: number;
}

// Function to fetch data from API
export async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // Try to make request
  try {
    const response = await axios.get<T>(url);
    // Return data successfully
    return { data: response.data, status: response.status };
  } catch (err) {
    // Handle error
    throw err;
  }
}
```

### Good (Gluttony Lean & Clean):
```ts
export async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  return res.json() as Promise<T>;
}
```

---

## 2. Web UI (Gluttony UI Specialization: `/gluttony-ui`)

*Note: UI design and accessibility constraints are specialized under the dedicated `gluttony-ui` skill.*

### Bad (Generic AI Aesthetic):
* Blue-to-purple background gradient with blurry glow orbs.
* Glassmorphism on every card, modal, and navbar simultaneously.
* Pulsing green dot next to the headline indicating fake live status.
* Pill-shaped buttons with arrows on every element: `Get Started →`.

### Good (Gluttony Authentic Design):
* Solid, intentional color palette with 2-3 core brand colors + 1 accent.
* Matte flat elevation; shadows reserved exclusively for modals/dropdowns.
* Clear typographic hierarchy with WCAG AA compliant text contrast (4.5:1 minimum).
* Visible keyboard focus indicators and minimum 44x44px touch targets.
