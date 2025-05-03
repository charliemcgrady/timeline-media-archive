import React, { FunctionComponent } from "react";
import "quill/dist/quill.snow.css";
import QuillEditor from "./QuillEditor";
import { WidgetConfig, Text } from '~/rgb-commons/types/widgets';
import { Container } from '@material-ui/core';

interface Props {
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
}

const EditTextWidget: FunctionComponent<Props> = ({
  widget,
  setWidget
}) => {
  const metadata = widget.metadata as Text.Metadata;

  return (
    <>
      <Container>
        <QuillEditor
          html={metadata.html}
          onChange={html => setWidget({
            ...widget,
            metadata: { html }
          })} />
      </Container>
    </>
  );
}

export default EditTextWidget;
