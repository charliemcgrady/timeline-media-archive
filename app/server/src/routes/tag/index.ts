import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { SYNC_TAGS_PATH, GET_TAGS_PATH } from "../paths";
import { SyncTagsRequest } from "../../rgb-commons/types/api";
import { authenticated } from "../../authenticated";
import knexProvider from "../../shared/knexProvider";
import { tagsSchema, tagEdgesSchema } from "../../db/schema";
import insertOrUpdateItem from "../../db/util/insertOrUpdateItem";
import { Transaction } from "knex";
import { getDefaultUserId } from "../../rgb-commons/uuidFactory";
import { get } from "./getTagsDao";

const router = new Router();

router.get(GET_TAGS_PATH, async context => {
  context.body = await get();
});

router.put(SYNC_TAGS_PATH, bodyParser(), async context => {
  if (!authenticated(context)) {
    context.status = 401;
    return;
  }

  const input = new SyncTagsRequest(context.request.body);
  await knexProvider.get().transaction(async trx => {
    await deleteTags(input, trx);
    await addOrUpdateTags(input, trx);
    await deleteTagEdges(input, trx);
    await addOrUpdateTagEdges(input, trx);
  });

  context.status = 200;
  context.body = await get();
});

const deleteTags = async (
  input: SyncTagsRequest,
  trx: Transaction<any, any>
) => {
  const idsToDelete = input.getTagsToDelete().map(({ id }) => id);
  await knexProvider
    .get()(tagsSchema.getTable())
    .transacting(trx)
    .whereIn("id", idsToDelete)
    .del();
};

const addOrUpdateTags = async (
  input: SyncTagsRequest,
  trx: Transaction<any, any>
) => {
  const tags = input.getTagsToAddOrUpdate();
  for (let i = 0; i < tags.length; i++) {
    await insertOrUpdateItem(
      tags[i].id,
      { ...tags[i], ownerId: getDefaultUserId() },
      tagsSchema,
      trx
    );
  }
};

const deleteTagEdges = async (
  input: SyncTagsRequest,
  trx: Transaction<any, any>
) => {
  const idsToDelete = input.getTagEdgesToDelete().map(({ id }) => id);
  await knexProvider
    .get()(tagsSchema.getTable())
    .transacting(trx)
    .whereIn("id", idsToDelete)
    .del();
};

const addOrUpdateTagEdges = async (
  input: SyncTagsRequest,
  trx: Transaction<any, any>
) => {
  const tagEdges = input.getTagEdgesAddOrUpdate();
  for (let i = 0; i < tagEdges.length; i++) {
    await insertOrUpdateItem(tagEdges[i].id, tagEdges[i], tagEdgesSchema, trx);
  }
};

export default router;
