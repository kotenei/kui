export interface CollapseProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  activeIds?: string[];
  defaultActiveIds?: string[];
  accordion?: boolean;
  onChange?: (id: string) => void;
}

export interface CollapsePanelProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'onClick'> {
  border?: boolean;
  id: string;
  icon?: React.ReactNode | string;
  header?: React.ReactNode | string;
  activeIds?: string[];
  disabled?: boolean;
  onClick?: (id: string) => void;
}
