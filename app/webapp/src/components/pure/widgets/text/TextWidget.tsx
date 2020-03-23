import React, { FunctionComponent } from "react";
import { Text } from "~/rgb-commons/types/widgets";
import "./TextWidget.css";

interface Props {
  metadata: Text.Metadata;
}

const TextWidget: FunctionComponent<Props> = ({ metadata }) => {
  return (
    // Apply .ql-editor so we render the same CSS as the Quill editor
    <div className="ql-editor">
      <div
        className="rgb-text-widget"
        dangerouslySetInnerHTML={{ __html: metadata.html }}
      />
    </div>
  );
};

export default TextWidget;
