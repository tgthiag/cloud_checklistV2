import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { dbpath } from "../config/dbpath";
import databaseDb from "../../database";

export function useFirebaseData() {
  const [data, setData] = useState({});

  useEffect(() => {
    const database = getDatabase(databaseDb);
    const reference = ref(database, `data/${dbpath}/records`);
    onValue(reference, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });
  }, []);

  return data;
}
