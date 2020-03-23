import React, { FunctionComponent, CSSProperties } from "react";

export interface Props {
  dominantColorHex: string;
  disabled?: boolean;
  layoutStyle: CSSProperties;
};

const Placeholder: FunctionComponent<Props> = ({ dominantColorHex, layoutStyle, disabled = false }) => {
  return (
    <div
      style={{
        ...layoutStyle,
        backgroundColor: disabled ? "white" : dominantColorHex
      }}>
    </div>
  );
};

export default Placeholder;