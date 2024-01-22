import { createElement } from "react";

export type TableRowProps = React.ComponentPropsWithRef<"tr"> & {
  children: React.ReactNode;
};

const TableRow = ({ children, ...props }: TableRowProps) => {
  return createElement("tr", props, children);
};

export default TableRow;
