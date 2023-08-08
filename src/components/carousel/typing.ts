import React from 'react';

export interface CarouselProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  children?: any;
  autoplay?: boolean;
  delay?: number;
  vertical?: boolean;
}

export interface CarouselPanelProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  index?: number;
  width?: number;
  height?: number;
  vertical?: boolean;
}
