import Database from "../config/Database";

async function getConnection() {
  const instanceDb = new Database();
  const connection = await instanceDb.init(); // devuelve un promesa

  return connection;
}

const db = getConnection();

export default db;
