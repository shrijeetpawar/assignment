import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import CustomerList from './components/CustomerList';
import { Customer } from './types';

function App(){
  const [customers, setCustomers] = useState<Customer[]>([]);
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Care247 — Customer Search</h1>
      <SearchForm onResults={setCustomers} />
      <CustomerList customers={customers} />
    </div>
  );
}
export default App;
