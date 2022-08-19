import React from 'react';

export interface RowSelection {
  selectedRowKeys?: string[];
  onChange?: (selectedRowKeys: string[], event: React.ChangeEvent<HTMLInputElement>) => any;
  onSelect?: (
    record: any,
    selected: boolean,
    selectedRowKeys: string[],
    event: React.ChangeEvent<HTMLInputElement>,
  ) => any;
}

export interface TableProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  bordered?: boolean;
  expandable?: boolean;
  loading?: boolean;
  sortable?: boolean;
  scroll?: boolean;
  stripe?: boolean;
  dataSource?: any;
}

export interface TableColumnProps
  extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode | string;
  field?: string;
  align?: 'left' | 'right' | 'center';
  fixed?: 'left' | 'right' | boolean;
  width?: number;
  render?: (record) => void;
}
