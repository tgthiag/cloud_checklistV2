import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { dbpath } from "../config/dbpath";
import { db } from "../../database";

function loadQuestions() {
  const database = getDatabase(db);
  const [data, setData] = useState(null);

  useEffect(() => {
    const reference = ref(database, `data/${dbpath}/questions`);
    onValue(reference, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    }, { onlyOnce: true });
  }, []);

  return data;
}

export default loadQuestions;