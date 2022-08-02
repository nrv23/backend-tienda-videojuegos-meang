import Database from "../config/Database";
const instanceDb = new Database();

async function getConnection() {
  
  const connection = await instanceDb.init(); // devuelve un promesa

  return connection;
}

const db = getConnection();

export default db;
