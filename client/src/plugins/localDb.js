import Dexie from "dexie";

const db = new Dexie("LocalDesk");
db.version(1).stores({
  tasks: "++_id, title, message, expDate, createdAt, isDone, desk",
  desks: "++_id, title, tasks"
});

export default db;
