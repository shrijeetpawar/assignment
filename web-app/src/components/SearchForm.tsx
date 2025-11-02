import React, { useState } from 'react';
import { searchConfig } from '../config/searchConfig';
import { searchCustomers } from '../api/customerService';
import { Customer } from '../types';

export default function SearchForm({ onResults }: { onResults: (c: Customer[]) => void }) {
  const initial = Object.keys(searchConfig.fields).reduce((acc: any, k) => ({ ...acc, [k]: '' }), {});
  const [form, setForm] = useState<Record<string, string>>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, val: string) => setForm(prev => ({ ...prev, [name]: val }));

  const onSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const cleaned = Object.fromEntries(Object.entries(form).filter(([_, v]) => v && v.trim() !== ''));
      const res = await searchCustomers(cleaned);
      onResults(res);
    } catch (err: any) {
      setError(err.message || 'Search failed');
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setForm(initial);
    onResults([]);
  };

  return (
    <form onSubmit={onSearch} className="p-4 bg-white rounded shadow space-y-4">
      {Object.entries(searchConfig.fields)
        .sort(([, a], [, b]) => a.renderOrder - b.renderOrder)
        .map(([key, cfg]: any) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{cfg.label}</label>

            {cfg.uiType === 'input' && (
              <input
                value={form[key]}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={cfg.placeholder}
                className="border rounded w-full p-2"
              />
            )}

            {cfg.uiType === 'date' && (
              <input
                type="date"
                value={form[key]}
                onChange={e => handleChange(key, e.target.value)}
                className="border rounded w-full p-2"
              />
            )}

            {cfg.uiType === 'select' && (
              <select
                value={form[key]}
                onChange={e => handleChange(key, e.target.value)}
                className="border rounded w-full p-2"
              >
                <option value="">{cfg.placeholder || 'Select'}</option>
                {(cfg.options || []).map((opt: string) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button type="button" onClick={onReset} className="px-4 py-2 border rounded">
          Reset
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
