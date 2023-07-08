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
      console.log(firebaseData);
    }, { onlyOnce: true });

    // Optionally, you can perform any cleanup logic here if needed

  }, []);

  return data;
}

export default loadQuestions;

// import { useEffect, useState } from "react";
// import { getDatabase, ref, onValue, get } from "firebase/database";
// import { dbpath } from "../config/dbpath";
// import {db} from "../../database";

// function loadQuestions() {
//   const database = getDatabase(db);
//   const [data, setData] = useState(null);


// useEffect(async () => {
//   const snapshot = await get(ref(database, `data/${dbpath}/questions`))
//   setData(snapshot)
//   console.log(data)
// },[])

//   return data;
// }

// export default loadQuestions;