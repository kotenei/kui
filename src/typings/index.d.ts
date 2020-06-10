export type StateTypes = 'info' | 'success' | 'warning' | 'danger';

export type SizeTypes = 'xs' | 'sm' | 'md' | 'lg';

export type ColorTypes = 'primary' | StateTypes;

export type BasicProps<T, K extends keyof T = never> = Omit<T, K> & {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
};

export as namespace KUI;
