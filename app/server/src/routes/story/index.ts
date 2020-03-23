import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { POST_STORIES_PATH, GET_STORIES_PATH, PUT_STORY_PATH, GET_STORY_PATH } from "../paths";
import { create, getAll, put, get } from "./storyDao";
import { SerializedStory, CreateStoryRequest } from '../../rgb-commons/types/api';

const router = new Router();

router.post(POST_STORIES_PATH, bodyParser(), async (context) => {
  const input = new CreateStoryRequest(context.request.body);
  context.body = await create(input.getTitle());
});

router.put(PUT_STORY_PATH, bodyParser(), async (context) => {
  const input = new SerializedStory(context.request.body, context.params.id);
  context.body = await put(input.getConfig());
});

router.get(GET_STORIES_PATH, async (context) => {
  context.body = await getAll();
});

router.get(GET_STORY_PATH, async (context) => {
  const story = await get(context.params.id);
  if (!story) {
    context.status = 404;
  } else {
    context.body = story;
  }
});

export default router;
