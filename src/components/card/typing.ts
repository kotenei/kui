export interface CardProps extends KUI.BasicProps<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode | string;
  extra?: React.ReactNode | string;
  bordered?: boolean;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
}
