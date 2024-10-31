import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { useState } from 'react';
import { useAuth } from './useAuth';
import { Expense } from '@/types';

export const useFirestore = (collectionName: string) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addDocument = async (data: Omit<Expense, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) {
      setError('Must be logged in to add documents');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const ref = collection(db, collectionName);
      const docRef = await addDoc(ref, {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      console.log('Document added successfully:', docRef.id);
      setLoading(false);
      return docRef;
    } catch (err: any) {
      console.error('Error adding document:', err);
      setError(err.message || 'Could not add the document');
      setLoading(false);
      return null;
    }
  };

  const getDocuments = async (): Promise<Expense[]> => {
    if (!user) {
      setError('Must be logged in to fetch documents');
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const ref = collection(db, collectionName);
      const q = query(ref, where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const documents = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...(doc.data() as Omit<Expense, 'id'>)
      }));
      setLoading(false);
      return documents;
    } catch (err: any) {
      console.error('Error getting documents:', err);
      setError(err.message || 'Could not fetch the documents');
      setLoading(false);
      return [];
    }
  };

  return { error, loading, addDocument, getDocuments };
}; 