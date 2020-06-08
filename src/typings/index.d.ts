export type StateTypes = 'info' | 'success' | 'warning' | 'danger';

export type SizeTypes = 'xs' | 'sm' | 'md' | 'lg';

export type ColorTypes = 'primary' | StateTypes;

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export as namespace KUI;
