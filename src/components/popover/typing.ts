import { TooltipProps } from '../tooltip/typing';

export interface PopoverProps extends KUI.BasicProps<TooltipProps> {
  content?: React.ReactNode | string;
}
