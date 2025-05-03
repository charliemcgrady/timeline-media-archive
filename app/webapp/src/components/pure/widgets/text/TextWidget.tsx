import React, { FunctionComponent, useLayoutEffect, useRef } from "react";
import { Text } from "~/rgb-commons/types/widgets";
import "./TextWidget.css";

interface Props {
  metadata: Text.Metadata;
  className?: string;
  widgetId?: string;
}

const TextWidget: FunctionComponent<Props> = ({
  widgetId,
  metadata,
  className = ""
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (widgetRef && widgetRef.current) {
      const links = widgetRef.current.querySelectorAll("a");
      const currentOrigin = window.location.origin;

      links.forEach(link => {
        const linkOrigin = new URL(link.href).origin;

        if (
          linkOrigin === currentOrigin &&
          link.getAttribute("target") === "_blank"
        ) {
          link.removeAttribute("target");
        }
      });
    }
  }, [widgetRef]);

  return (
    // Apply .ql-editor so we render the same CSS as the Quill editor
    <div className="ql-editor" ref={widgetRef}>
      <div
        className={`rgb-text-widget ${className}`}
        id={widgetId}
        dangerouslySetInnerHTML={{ __html: metadata.html }}
      />
    </div>
  );
};

export default TextWidget;
