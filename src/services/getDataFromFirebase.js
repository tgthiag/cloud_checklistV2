import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { dbpath } from "../config/dbpath";
import { db } from "../../database";

function firebaseOnValue() {
  const database = getDatabase(db);
  const [data, setData] = useState(null);

  useEffect(() => {
    const reference = ref(database, `data/${dbpath}/records`);
    onValue(reference, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
      console.log(firebaseData);
    });

  }, []);

  return data;
}

export default firebaseOnValue;
