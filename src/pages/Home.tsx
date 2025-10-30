import { useEffect, useState } from "react";

export default function Home() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then((res) => res.json())
      .then(setCustomers)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Patient Records</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {customers.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-2">{c.name}</h3>
            <p className="text-gray-700 mb-1">Age: {c.age}</p>
            <p className="text-gray-700">Condition: {c.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
