import React from 'react';
import { displayConfig } from '../config/displayConfig';
import { Customer } from '../types';

export default function CustomerList({ customers }: { customers: Customer[] }) {
  if (!customers || customers.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No results found. Try adjusting your search filters.
      </div>
    );
  }

  const columns = [...displayConfig.columns].sort((a, b) => a.order - b.order);

  return (
    <div className="overflow-x-auto mt-6 bg-white rounded shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 text-left font-semibold border-b text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="p-2 text-sm">
                  {col.render ? col.render(c) : (c as any)[col.key] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
