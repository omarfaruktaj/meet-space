import React from "react";
import Step from "./step";

type StepperProps = {
  activeStep: number;
  steps: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
  }>;
  disabledSteps?: number[];
  activeColor?: string;
  completeColor?: string;
  defaultColor?: string;
  circleFontColor?: string;
  activeTitleColor?: string;
  completeTitleColor?: string;
  defaultTitleColor?: string;
  size?: number;
  circleFontSize?: number;
  titleFontSize?: number;
  circleTop?: number;
  titleTop?: number;
  completeOpacity?: string;
  activeOpacity?: string;
  defaultOpacity?: string;
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
  defaultBorderColor?: string;
  completeBorderColor?: string;
  activeBorderColor?: string;
  defaultBorderStyle?: string;
  completeBorderStyle?: string;
  activeBorderStyle?: string;
  defaultBarColor?: string;
  completeBarColor?: string;
  lineMarginOffset?: number;
  defaultBorderWidth?: number;
};

const Stepper: React.FC<StepperProps> = ({
  activeStep = 0,
  steps,
  disabledSteps = [],
  ...props
}) => {
  return (
    <div className="flex justify-between w-full mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="w-full flex-1">
          <Step
            title={step.title}
            description={step.description}
            icon={step.icon}
            href={step.href}
            onClick={step.onClick}
            active={!disabledSteps.includes(index) && index === activeStep}
            completed={!disabledSteps.includes(index) && index < activeStep}
            first={index === 0}
            isLast={index === steps.length - 1}
            index={index}
            {...props}
          />
        </div>
      ))}
    </div>
  );
};

export default Stepper;
