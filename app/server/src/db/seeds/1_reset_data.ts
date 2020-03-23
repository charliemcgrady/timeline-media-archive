import Knex from "knex";
import {
  mediaColorsSchema,
  mediaLocationsSchema,
  mediaSchema,
  tagEdgesSchema,
  tagsSchema,
  mediaExifSchema,
  mediaArchivesSchema
} from "../schema";

exports.seed = async (knex: Knex) => {
  await knex(mediaSchema.getTable()).del();
  await knex(mediaExifSchema.getTable()).del();
  await knex(mediaArchivesSchema.getTable()).del();
  await knex(mediaColorsSchema.getTable()).del();
  await knex(mediaLocationsSchema.getTable()).del();
  await knex(tagEdgesSchema.getTable()).del();
  await knex(tagsSchema.getTable()).del();

  // Deletes existing users to start from scratch
  await knex("users")
    .del()
    .then(() => {
      return knex("users").insert({
        id: "rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d",
        username: "Charlie"
      });
    });
};
