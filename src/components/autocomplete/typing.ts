import { InputProps } from '../input/typing';
import { PopPanelPlacementType } from '../pop-panel/typing';

export interface AutoCompleteProps extends KUI.BasicProps<InputProps> {
  placement?: PopPanelPlacementType;
  dataSource?: { text: string; value: string }[];
  max?: number;
  highlight?: boolean;
  defaultValue?: string;
  value?: string;
  onSearch?: (value) => void;
  onChange?: (value) => void;
}
