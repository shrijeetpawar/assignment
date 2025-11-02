# 🏥 Configuration-Driven Customer Search Application

A scalable **React + TypeScript** application that allows users to search and view customer data dynamically using a **configuration-driven approach**.  
Adding or modifying any field (like city, or middleName) requires **no code changes**, only updates to configuration.

---

## 🚀 How to Run the Application

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shrijeetpawar/assignment.git
cd assignment/web-app

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start mock API server
json-server --watch db.json --port 3001

# 4️⃣ Run the React app
npm start

    ✅ The mock API runs at: http://localhost:3001/customers

# 4️⃣ In new terminal 
npm start

✅ The React app runs at: http://localhost:3000

Use the search form to filter customers by First Name, Last Name, or Date of Birth, and view details dynamically in the results table.
⚙️ Brief Explanation of the Configuration Approach

This project uses config files instead of hardcoded UI.

    src/config/searchConfig.ts defines fields shown in the search form

    src/config/displayConfig.ts defines columns shown in the results table

Example:

export const searchConfig = {
  fields: {
    firstName: { uiType: 'input', label: 'First Name', renderOrder: 1 },
    lastName: { uiType: 'input', label: 'Last Name', renderOrder: 2 },
    dateOfBirth: { uiType: 'date', label: 'Date of Birth', renderOrder: 3 }
  }
};

Each field defines:

    uiType → input type (input, date, select)

    label → display label

    renderOrder → determines order on screen

    placeholder → optional hint text

    options → for dropdowns (if any)

Both the SearchForm and CustomerList components read from these configs dynamically.
➡️ You never modify components to add new fields — only configs.
🧩 How to Add a New Search Field

If later asks:

    “Please also allow filtering by City and show Address column.”

Just update the configs:
✳️ In searchConfig.ts

city: {
  uiType: 'input',
  label: 'City',
  placeholder: 'Enter City',
  renderOrder: 4
}

✳️ In displayConfig.ts

{
  key: 'city',
  label: 'City',
  order: 5,
  render: (c) => c.addresses?.[0]?.city || '-'
}

✅ No component changes needed — the app auto-renders and filters based on new config.
⚖️ Trade-offs and Decisions Made
✅ Advantages

    100% configuration-driven (UI and logic adapt automatically)

    Supports nested data (addresses, phones, emails)

    Case-insensitive, partial-match search

    Fully typed with TypeScript for safety

    Extensible — adding secureId, middleName, or new address fields just works

⚠️ Trade-offs

    Uses client-side filtering since JSON Server lacks deep nested queries
    → Ideal for demo/small datasets, but for production, a backend query API is better.

    Fetches all customer data initially, which slightly increases load time for very large data.

🧠 Summary

This solution demonstrates a professional, future-ready architecture:

    Configuration-driven design

    Dynamic rendering

    Extensible type-safe structure

    Easily maintainable codebase

⏱️ Time Spent

Approx. 7–8 hours total (including setup, dynamic config system, testing, and polishing)
🔗 Repository

GitHub: https://github.com/shrijeetpawar/assignment
