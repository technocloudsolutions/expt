'use client';
import { useFirestore } from '../hooks/useFirestore';
import { useState, useCallback, useEffect } from 'react';
import { Expense } from '@/types';

export default function TestFirebase() {
  const { addDocument, getDocuments } = useFirestore('test');
  const [items, setItems] = useState<Expense[]>([]);

  const loadData = useCallback(async () => {
    const docs = await getDocuments();
    setItems(docs);
  }, [getDocuments]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = async () => {
    await addDocument({
      amount: 0,
      category: 'test',
      description: 'Test item',
      date: new Date().toISOString()
    });
    loadData();
  };

  return (
    <div>
      <button onClick={handleAdd}>Add Test Document</button>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            {item.description} - {item.date}
          </div>
        ))}
      </div>
    </div>
  );
} 