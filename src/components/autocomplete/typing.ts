import { InputProps } from '../input/typing';
import { PopPanelPlacementType } from '../pop-panel/typing';

export interface AutoCompleteProps extends KUI.BasicProps<InputProps, 'onSelect'> {
  placement?: PopPanelPlacementType;
  dataSource?: { text: string; value: string }[];
  max?: number;
  highlight?: boolean;
  onSearch?: (value) => void;
  onChange?: (value) => void;
  onSelect?: (value, option) => void;
}
