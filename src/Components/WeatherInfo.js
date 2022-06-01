import css from "../Styles/index.module.scss";
import cls from "classnames";
import { Text, Tooltip } from "@geist-ui/core";

export default function WeatherInfo({
  className,
  text,
  icon: Icon,
  tooltipText,
  children,
  styleIcon,
  classNameTooltip,
  ...args
}) { 
  return (
    <Tooltip
      className={classNameTooltip}
      text={
        <Text className="m-0" small>
          {tooltipText}
        </Text>
      }
    >
      <div className={cls(css.weatherInfo, className)} {...args}>
        <Text className="m-0 me-1" small>
          {text}
        </Text>

        <Icon style={{ fontSize: "0.875em", ...styleIcon }} />
        {children}
      </div>
    </Tooltip>
  );
}
