import React, { FunctionComponent, useState } from "react";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";

const DEFAULT_VERTICAL_PADDING = 100;
const DEFAULT_HORIZONTAL_PADDING = 40;

export interface Props {
  width?: number;
  height?: number;
  panoRef: React.RefObject<HTMLDivElement>;
  showInstructions: boolean;
}

const MarzipanoContainerElement: FunctionComponent<Props> = ({
  width = window.innerWidth - DEFAULT_HORIZONTAL_PADDING,
  height = window.innerHeight - DEFAULT_VERTICAL_PADDING,
  panoRef,
  showInstructions
}) => {
  const infoBannerWidth = 140;
  const infoBannerHeight = 80;

  const instructionBannerStyles: React.CSSProperties = {
    position: "absolute",
    zIndex: 10,
    top: height / 2 - infoBannerHeight / 2,
    left: width / 2 - infoBannerWidth / 2,
    width: infoBannerWidth,
    height: infoBannerHeight
  };

  const [instructionsTouched, setInstructionsTouched] = useState(false);

  return (
    <>
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width,
          height,
          overflow: "hidden",
          margin: "auto"
        }}
        ref={panoRef}
      >
        {showInstructions && !instructionsTouched && (
          <>
            <div
              style={{
                ...instructionBannerStyles,
                backgroundColor: "white",
                opacity: 0.8,
                borderRadius: 5
              }}
            ></div>
            <div
              style={{
                ...instructionBannerStyles,
                padding: 10,
                textAlign: "center",
                cursor: "move"
              }}
              onClick={() => setInstructionsTouched(true)}
              onDragStart={() => setInstructionsTouched(true)}
              onTouchStart={() => setInstructionsTouched(true)}
            >
              <ThreeDRotationIcon fontSize="large" />
              <div>Drag to explore</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MarzipanoContainerElement;
