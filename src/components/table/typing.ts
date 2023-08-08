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

export interface RowExpansion {
  expandedRowKeys?: string[];
  onChange?: (expandedRowKeys: string[], event: React.ChangeEvent<HTMLInputElement>) => any;
  expandedRowRender?: (record: any, index?: number, expanded?: boolean) => any;
}

export interface TableProps extends KUI.BasicProps<React.HtmlHTMLAttributes<HTMLDivElement>> {
  bordered?: boolean;
  loading?: boolean;
  scrollHeight?: number;
  stripe?: boolean;
  dataSource?: any;
  rowSelection?: RowSelection;
  rowExpansion?: RowExpansion;
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
