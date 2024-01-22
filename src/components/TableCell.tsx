import { createElement } from "react";

export type TableCellProps = React.ComponentPropsWithRef<"td"> & {
  children: React.ReactNode;
};

const TableCell = ({ children, ...props }: TableCellProps) => {
  return createElement("td", props, children);
};

export default TableCell;
