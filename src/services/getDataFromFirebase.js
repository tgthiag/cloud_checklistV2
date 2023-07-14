import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { dbpath } from "../config/dbpath";
import { db } from "../../database";

export function useFirebaseData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const database = getDatabase(db);
    const reference = ref(database, `data/${dbpath}/records`);
    onValue(reference, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });
  }, []);

  return data;
}
