import React, { FunctionComponent, useEffect } from "react";
import Quill from "quill";
import QuillToolbar from "./QuillToolbar";
import "quill/dist/quill.snow.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

interface Props {
  html: string;
  onChange: (newHtml: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "white"
    }
  })
);

const QuillEditor: FunctionComponent<Props> = ({ html, onChange }) => {
  const editorRef = React.useRef<Quill | undefined>(undefined);
  const editorDomRef = React.useRef<HTMLDivElement>(null);

  // Toolbars need to be assigned ids to have multiple on same page.
  // Create unique id to avoid clashes
  const textWidgetId = React.useRef<string>(
    Math.floor(Math.random() * 100000).toString()
  );

  useEffect(() => {
    if (editorDomRef.current && !editorRef.current) {
      editorDomRef.current.innerHTML = html;

      editorRef.current = new Quill(editorDomRef.current, {
        modules: {
          toolbar: "#toolbar-container-" + textWidgetId.current
        },
        placeholder: "Enter text...",
        theme: "snow"
      });

      editorRef.current.on("text-change", () => {
        if (editorDomRef.current) {
          onChange(
            editorDomRef.current.getElementsByClassName("ql-editor")[0]
              .innerHTML
          );
        }
      });
    }

    return () => {};
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <QuillToolbar htmlId={"toolbar-container-" + textWidgetId.current} />
      <div ref={editorDomRef} style={{ maxHeight: 400 }} />
    </div>
  );
};

export default QuillEditor;
