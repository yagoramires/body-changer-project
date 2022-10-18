import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  //   where,
} from 'firebase/firestore';
import db from '../firebase/config';

export const useFetchDocuments = (docCollection, search = null) => {
  // Documents States
  const [documents, setDocuments] = useState(null);

  // Message states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Ao sair da fução irá executar o cleanup
  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const collectionRef = await collection(db, docCollection);
      try {
        const q = await query(collectionRef, orderBy('createdAt', 'desc'));

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });

        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setError(e.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search]);

  return { documents, loading, error };
};
