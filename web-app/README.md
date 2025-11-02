## 🧩 Customer Search Application

A **configuration-driven React + TypeScript** application for searching and displaying customer information, built as per the Web Technical Assignment requirements.

---

## 🚀 Overview

This project demonstrates a **scalable, configuration-based UI architecture** where all form fields and display columns are driven entirely from configuration files not hardcoded components.

Adding a new customer field (e.g., `middleName`, `secureId`, `city`, or any future attribute) requires **only editing the configuration or data model**, without touching React component logic.

---

## 🧰 Tech Stack

- ⚛️ **React 18 + TypeScript**
- 🎨 **Tailwind CSS** + shadcn/ui components
- 🔧 **JSON Server** (mock backend)
- 🧠 Config-driven architecture for extensibility

---

## 📁 Project Structure

src/
├── api/
│ └── customerService.ts # Handles dynamic filtering logic (case-insensitive, partial, AND-based)
├── components/
│ ├── SearchForm.tsx # Renders fields dynamically from searchConfig
│ ├── CustomerList.tsx # Displays results dynamically from displayConfig
├── config/
│ ├── searchConfig.ts # Controls form fields and order
│ ├── displayConfig.ts # Controls which columns are shown in results
├── types.ts # Defines Customer, Address, Phone, Email interfaces
└── App.tsx # Integrates SearchForm and CustomerList


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/shrijeetpawar/assignment.git
cd assignemnt

2️⃣ Install Dependencies

npm install

3️⃣ Run Mock API Server

npx json-server --watch db.json --port 3001

API will be available at:
👉 http://localhost:3001/customers
4️⃣ Run React App

npm start

App runs at 👉 http://localhost:3000
🧮 Configuration Approach
🔹 Search Configuration (searchConfig.ts)

All form fields are defined via configuration.
Example:

export const searchConfig = {
  fields: {
    firstName: { uiType: 'input', label: 'First Name', renderOrder: 1 },
    lastName: { uiType: 'input', label: 'Last Name', renderOrder: 2 },
    dateOfBirth: { uiType: 'date', label: 'Date of Birth', renderOrder: 3 }
  }
};

➡️ Adding a new field (e.g., middleName or city) only requires adding it here.
The form and search logic update automatically.
🔹 Display Configuration (displayConfig.ts)

Defines what appears in the result table.

export const displayConfig = {
  columns: [
    { key: 'name', label: 'Name', render: (c) => `${c.firstName} ${c.middleName || ''} ${c.lastName}`, order: 1 },
    { key: 'dateOfBirth', label: 'DOB', order: 2 },
    { key: 'primaryPhone', label: 'Primary Phone', render: (c) => c.phones?.find(p => p.isPrimary)?.number || '-', order: 3 },
    { key: 'primaryEmail', label: 'Primary Email', render: (c) => c.emails?.find(e => e.isPrimary)?.address || '-', order: 4 },
  ]
};

➡️ The UI automatically adapts when new columns are added here.
🔍 Dynamic Filtering Logic (customerService.ts)

The search is:

    ✅ Case-insensitive

    ✅ Partial-match capable

    ✅ Works across nested objects (addresses, phones, emails)

    ✅ Uses AND logic across multiple filters

    ✅ Automatically adapts to any new fields added in the Customer type or JSON data

Example:

# Matches any customer with:
# firstName like "John" AND state like "CA"
http://localhost:3001/customers?firstName_like=John&state_like=CA

🧩 How to Add a New Search Field

    Add the new key to searchConfig.ts:

    middleName: { uiType: 'input', label: 'Middle Name', renderOrder: 4 },

    (Optional) Add the same field to displayConfig.ts if you want it visible in the table.

    If the field exists in db.json and types.ts, it will automatically:

        Appear in the search form

        Be filterable

        Show in results if configured

✅ No need to modify React components.
📊 Example Scenarios
Action	Result
Search First Name = John	Shows all customers with first name like “John”
Search Last Name = Davis	Shows “Emily Davis”
Leave form empty	Displays all 15 customers
Add field city to config	Instantly searchable by city
Add secureId in displayConfig	Secure ID shown in results
🧠 Design Decisions & Trade-offs

    Configuration-first approach for scalability

    Flat + nested search unified in one loop

    Case-insensitive filtering for user-friendly search

    AND logic ensures precise multi-field filtering

    TypeScript strong typing ensures safer future extensions

🕒 Time Spent

    Planning & Architecture: 3 hrs

    Development & Testing: 4 hrs

    Configuration & Dynamic Logic: 2 hrs

    Documentation & Polish: 1 hr

Total: ~10 hours
💡 Future Enhancements

    Add pagination and sorting (configurable)

    Integrate live API instead of JSON Server

    Add shadcn/ui dropdowns and modals for UX polish

    Export search results to CSV

🧑‍💻 Author

Your Shrijeet Pawar
B.Tech Final Year | Full-Stack Developer | React + Node + PostgreSQL Enthusiast
| 💼 LinkedIn : https://www.linkedin.com/in/shrijeet-pawar/
|
