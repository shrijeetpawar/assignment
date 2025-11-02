
import axios from 'axios';
import { Customer } from '../types';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function searchCustomers(queryObj: Record<string, string>): Promise<Customer[]> {
  const cleaned = Object.fromEntries(
    Object.entries(queryObj).filter(([_, v]) => v && v.trim() !== '')
  );

  const { data: customers } = await axios.get<Customer[]>(`${BASE}/customers`);
  if (Object.keys(cleaned).length === 0) return customers;

  const filtersLower = Object.fromEntries(
    Object.entries(cleaned).map(([k, v]) => [k.toLowerCase(), v.toLowerCase()])
  );

  const finalResults = customers.filter((customer) =>
    Object.entries(filtersLower).every(([key, val]) => {
      const allValues = deepSearch(customer, key);
      return allValues.some((v) => v.includes(val));
    })
  );

  return finalResults;
}


function deepSearch(obj: any, key: string): string[] {
  let results: string[] = [];

  if (typeof obj !== 'object' || obj === null) return results;

  for (const [k, v] of Object.entries(obj)) {
    if (k.toLowerCase() === key.toLowerCase() && typeof v === 'string') {
      results.push(v.toLowerCase());
    } else if (Array.isArray(v)) {
      v.forEach((item) => results.push(...deepSearch(item, key)));
    } else if (typeof v === 'object') {
      results.push(...deepSearch(v, key));
    }
  }

  return results;
}
