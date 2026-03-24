# E-commerce Coding Assessment

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features Implemented

*   **Server-Side Rendering (SSR):** Product listing fetched directly on the server for performance and SEO using Next.js App Router setup.
*   **Skeleton Loading:** `loading.tsx` integrated for better UX during server fetching.
*   **Responsive UI:** Fully responsive Product Grid and layout using pure Tailwind CSS utility classes.
*   **Client-Side Filtering & Sorting:** Real-time search with a custom generic `useDebounce`, category dropdown, and price range filters utilizing `useMemo` for heavy computation optimization.
*   **Global State Management:** Cart State managed natively through React Context API and `useReducer`, maintaining zero external dependencies.
*   **State Persistence & Hydration Handling:** Cart data is persisted across sessions using `localStorage`, securely avoiding Next.js server/client hydration mismatches.
*   **Nested Object Flattening:** Recursive utility function implemented to flatten nested cart state (items, filters, metadata) into strict dot-notation for export logging.

## Time Spent (Estimate: 6 Hours)

| Phase | Duration | Key Tasks Completed |
| :--- | :--- | :--- |
| **1: Setup & Architecture** | 1.0 hr | Init Next.js 15 App Router, Tailwind config, TS Interfaces, Server-side fetching (`page.tsx`), and `loading.tsx`. |
| **2: UI Layout** | 1.0 hr | Built fully responsive product grid (1 to 4 cols) and standard `ProductCard` using strictly Tailwind utility classes. |
| **3: Global State** | 1.5 hrs | Created `CartContext`. Solved Next.js hydration mismatch for `localStorage` using a safe mounted state strategy. |
| **4: Logic & Filters** | 1.0 hr | Implemented custom `useDebounce`, Category/Price filters, and `useMemo` for optimized rendering. |
| **5: Cart & Export** | 1.0 hr | Wired Cart UI to Context. Implemented recursive object flattening algorithm for the "Export Cart" feature. |
| **6: Polish & Docs** | 0.5 hr | Added sticky header, hover effects, handled empty states, and finalized README documentation. |


## Technical Decisions and Trade-offs

*   **Native Context API over Zustand/Redux:** 
    Since the application's global state requirement is strictly limited to the shopping cart, introducing external dependencies like Redux or Zustand adds unnecessary bundle bloat and setup complexity. React Context coupled with `useReducer` handles this isolated domain natively, cleanly, and predictably.
*   **`useMemo` for Filtering & Sorting:** 
    Filtering and sorting logic can be computationally expensive on every render—especially as product counts increase. Wrapping the `filteredProducts` array computation in `useMemo` guarantees that filtering evaluates *only* when the fetched data (`products`) or user inputs (`filters`) shift, resulting in optimal React rendering flows.
*   **Solving `localStorage` Hydration Mismatches in Next.js:** 
    Reading from `window.localStorage` directly during the initial render phase in Next.js throws hydration mismatch errors because the server pre-render lacks the `window` object. This was solved by utilizing a `useEffect` "mounted" state flag strategy. The components render skeletal or fallback UI on the very first server/client pass, reading from `localStorage` predictably only after the component safely mounts on the client.
