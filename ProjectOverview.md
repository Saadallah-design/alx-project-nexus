"Project Nexus Pro FE." 




## 💡 Project Overview: Dynamic E-commerce Product Catalog

This project is about building a **high-fidelity, production-ready front-end application** that simulates a real-world e-commerce product catalog. My objective is to move beyond simple data display to create a genuinely **dynamic, usable, and performant** experience.

The core challenge is taking raw product data from an **API** (built as backend project on localhost) and transforming it into a seamless, interactive user interface. This involves mastering **state management (Redux)**, **type safety (TypeScript)**, and modern **component-based UI development (React/Tailwind CSS)**.

| Focus Area | Core Skill Gained |
| :--- | :--- |
| **API Integration** | Data fetching, loading states, error handling. |
| **Filtering/Sorting** | Advanced array manipulation, state synchronization. |
| **State Management** | Global state control, Redux thunks/sagas for async operations. |
| **Responsiveness** | Mobile-first development, modern CSS utility frameworks. |

---

## 🗺️ High-Level Architectural Plan

To achieve the project goals, I will try to organize the application into key layers:

### 1. ⚛️ Presentation Layer (React & Tailwind CSS)
This is what the user sees. It will be composed of reusable components.

* **`ProductCatalog` Component:** The main container holding the entire view.
* **`ProductCard` Component:** Displays a single product elegantly.
* **`Sidebar/FilterPanel` Component:** Contains the category and multi-criteria filter controls.
* **`SortDropdown` Component:** Handles price sorting (Ascending/Descending).
* **`Pagination/LoadMore` Component:** Manages the Infinite Scrolling/Pagination UI.

### 2. 🛠️ State Management Layer (Redux & TypeScript)
This manages the application data flow.

* **Redux Store:** Holds the core application state, including:
    * **Product List:** The raw data fetched from the API to test the API.
    * **Current Filters:** The user's active selections (e.g., Category: "Jellaba", Price Range: "MAD50-MAD100").
    * **Current Sort:** The active sorting rule (e.g., "Price - Ascending").
    * **Loading/Error Flags:** For UI feedback.
* **Redux Actions & Reducers:** Define how the state is updated in response to user actions (e.g., clicking a filter, scrolling down).

### 3. 🌐 Data Layer (API Integration)
This is responsible for communication with the outside world.

* I'll use a library like **`fetch`** or **`Axios`** within a **Redux Thunk/Saga** to handle the asynchronous call to the backend API.
* I'll focus on how to structure the API calls to efficiently support filtering and sorting (e.g., building query strings: `/products?category=X&sortBy=price&order=asc`).

---

## 🎯 Next Step (TO DO)

Establishing the foundation.

**Phase 1: Foundation & Static Display**

1.  **Project Setup:** Initialize the React/TypeScript project with Tailwind CSS.
2.  **Redux Integration:** Set up the basic Redux store structure (actions, reducers).
3.  **API Integration:** Fetch raw product data from an open e-commerce API (e.g., a dummy JSON API) and store it in your Redux state.
4.  **Display:** Create the `ProductList` component and use it to display the raw list of products in order to test the API integration.
