import React from "react";

type StepProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index: number;
  active: boolean;
  completed: boolean;
  first: boolean;
  isLast: boolean;
  href?: string;
  onClick?: () => void;
  activeColor?: string;
  completeColor?: string;
  defaultColor?: string;
  activeTitleColor?: string;
  completeTitleColor?: string;
  defaultTitleColor?: string;
  circleFontColor?: string;
  size?: number;
  circleFontSize?: number;
  titleFontSize?: number;
  circleTop?: number;
  titleTop?: number;
  defaultOpacity?: string;
  completeOpacity?: string;
  activeOpacity?: string;
  completeTitleOpacity?: string;
  activeTitleOpacity?: string;
  defaultTitleOpacity?: string;
  barStyle?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden";
  defaultBarColor?: string;
  completeBarColor?: string;
  defaultBorderColor?: string;
  completeBorderColor?: string;
  activeBorderColor?: string;
  defaultBorderStyle?: string;
  completeBorderStyle?: string;
  activeBorderStyle?: string;
  lineMarginOffset?: number;
  defaultBorderWidth?: number;
};

const Step: React.FC<StepProps> = ({
  title,
  description,
  icon,
  index,
  active,
  completed,
  first,
  isLast,
  href,
  onClick,
  activeColor = "#5096FF",
  completeColor = "#5096FF",
  defaultColor = "#E0E0E0",
  activeTitleColor = "#000",
  completeTitleColor = "#000",
  defaultTitleColor = "#757575",
  circleFontColor = "#FFF",
  size = 32,
  circleFontSize = 16,
  titleFontSize = 16,
  titleTop = 8,
  defaultOpacity = "1",
  completeOpacity = "1",
  activeOpacity = "1",
  completeTitleOpacity = "1",
  activeTitleOpacity = "1",
  defaultTitleOpacity = "1",
  barStyle = "solid",
  defaultBarColor = "#E0E0E0",
  completeBarColor = "#5096FF",
  defaultBorderColor = "#E0E0E0",
  completeBorderColor = "#5096FF",
  activeBorderColor = "#5096FF",
  defaultBorderStyle = "solid",
  completeBorderStyle = "solid",
  activeBorderStyle = "solid",
  lineMarginOffset = 4,
  defaultBorderWidth = 3,
}) => {
  const stepContent = icon || index + 1;

  return (
    <div className="relative flex flex-col items-center  w-full">
      {/* Circle */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: completed
            ? completeColor
            : active
            ? activeColor
            : defaultColor,
          fontSize: circleFontSize,
          color: circleFontColor,
          opacity: active
            ? activeOpacity
            : completed
            ? completeOpacity
            : defaultOpacity,
          borderWidth: active || completed ? defaultBorderWidth : 0,
          borderColor: active
            ? activeBorderColor
            : completed
            ? completeBorderColor
            : defaultBorderColor,
          borderStyle: active
            ? activeBorderStyle
            : completed
            ? completeBorderStyle
            : defaultBorderStyle,
        }}
      >
        {href ? (
          <a href={href} onClick={onClick}>
            {stepContent}
          </a>
        ) : (
          <span>{stepContent}</span>
        )}
      </div>

      {/* Title */}
      <div
        className="text-center"
        style={{
          marginTop: titleTop,
          fontSize: titleFontSize,
          color: active
            ? activeTitleColor
            : completed
            ? completeTitleColor
            : defaultTitleColor,
          opacity: active
            ? activeTitleOpacity
            : completed
            ? completeTitleOpacity
            : defaultTitleOpacity,
        }}
      >
        {href ? (
          <a href={href} onClick={onClick}>
            {title}
          </a>
        ) : (
          <>
            <div className="text-base md:text-lg lg:text-xl font-semibold">
              {title}
            </div>
            <p className="text-xs md:text-sm lg:text-base px-2 md:px-4 lg:px-6 mt-1 md:mt-2">
              {description}
            </p>
          </>
        )}
      </div>

      {/* Left Bar */}
      {!first && (
        <div
          className="absolute top-4 left-0 right-1/2 -z-10"
          style={{
            height: 2,
            borderTopStyle: barStyle,
            borderTopWidth: 2,
            borderTopColor: completed ? completeBarColor : defaultBarColor,
            marginRight: size / 2 + lineMarginOffset,
            transform: "translateY(-50%)",
          }}
        />
      )}

      {/* Right Bar */}
      {!isLast && (
        <div
          className="absolute top-4 right-0 left-1/2 -z-10"
          style={{
            height: 2,
            borderTopStyle: barStyle,
            borderTopWidth: 2,
            borderTopColor:
              active || completed ? completeBarColor : defaultBarColor,
            marginLeft: size / 2 + lineMarginOffset,
            transform: "translateY(-50%)",
          }}
        />
      )}
    </div>
  );
};

export default Step;
