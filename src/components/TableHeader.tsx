import { createElement } from "react";

export type TableHeaderProps = React.ComponentPropsWithRef<"th"> & {
  children: React.ReactNode;
};

const TableHeader = ({ children, ...props }: TableHeaderProps) => {
  return createElement("th", props, children);
};

export default TableHeader;
