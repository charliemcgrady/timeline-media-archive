import { WidgetConfig, RequiredMediaConfig } from './widgets';

export type StoryConfig = {
  id: string;
  title: string;
  widgets: Array<WidgetConfig>;

  // RequiredMediaConfig contains partials of the photo object which are
  // required to render any given widget. We are only using partials to save
  // bandwidth.
  media: Record<string, RequiredMediaConfig>;
};