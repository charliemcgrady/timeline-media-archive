import { DBSchema } from "../schema";
import Knex from "knex";
import knexProvider from "../../shared/knexProvider";

export default async (
  id: string,
  objectToMarshall: any,
  schema: DBSchema,
  trx: Knex.Transaction<any, any>
) => {
  const dbObject: { [key: string]: any } = {};
  Object.keys(objectToMarshall).forEach(key => {
    if (Object.keys(schema.getFields()).includes(key)) {
      // Defensively make sure we are not writing null values to the DB
      if (objectToMarshall[key] !== undefined && schema.getFields()[key]) {
        dbObject[schema.getFields()[key]] = objectToMarshall[key];
      }
    }
  });

  if (Object.keys(dbObject).length === 0) {
    return;
  }

  const existingObject = await knexProvider
    .get()(schema.getTable())
    .select(schema.getFields().id)
    .where(schema.getFields().id, id);
  const objectExists = existingObject.length > 0;

  if (objectExists) {
    return knexProvider
      .get()(schema.getTable())
      .transacting(trx)
      .update(dbObject)
      .where("id", id);
  } else {
    // For sub-fields like exif, id is not provided. Add it here so it's marshalled
    // alongside the other provided fields when inserted into the db
    dbObject.id = id;
    return knexProvider
      .get()(schema.getTable())
      .transacting(trx)
      .insert(dbObject);
  }
};
