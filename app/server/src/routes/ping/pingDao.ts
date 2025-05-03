import knexProvider from "../../shared/knexProvider";

export const deepPing = async () => {
  const knex = knexProvider.get();
  await knex.raw('select 1+1 as result');
  return "Healthy";
}
