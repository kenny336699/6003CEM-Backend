import * as db from "../helpers/database";

export const getAll = async () => {
  const query = "select * from user ";
  const user = await db.runQuery(query, null);
  return user;
};
