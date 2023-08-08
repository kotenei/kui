export interface LazyLoadProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  container?: Window | 'string';
  loading?: string;
  error?: string;
  onError?: (value: object) => void;
  onSuccess?: (value: object) => void;
}
