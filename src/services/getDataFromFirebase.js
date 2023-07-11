import { ref, onValue, getDatabase } from 'firebase/database';
import { dbpath } from '../config/dbpath';
import db from '../../database';

// Initialize Firebase with your project configuration
// ...

export async function GetDataFromFirebase() {
  const database = getDatabase(db);
  const reference = ref(database, `data/${dbpath}/records/`);

  return new Promise((resolve, reject) => {
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    });
  });
}
