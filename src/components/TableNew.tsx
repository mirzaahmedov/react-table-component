import styles from "./table.module.css";

const TABLE_TAGS = ["TR", "TD", "TH"];

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TableCell from "./TableCell";

export type SortOptions = "asc" | "desc" | null;
export type SortableColumn = {
  sortable?: true;
  sort: SortOptions;
};
export type NonSortableColumn = {
  sortable?: false;
};

export type TableValue = string | number | boolean | object | React.ReactNode;
export type TableColumn<D> = {
  key: keyof D;
  label: D[keyof D] | React.ReactNode;
  show?: boolean;
} & (NonSortableColumn | SortableColumn);

export type TableProps<D extends Record<string, TableValue>> = {
  data: D[] | undefined;
  columns: TableColumn<D>[];
  selection?: D["id"][];
  isLoading?: boolean;
  onClickRow?: (data: D, id: D["id"]) => void;
  renderData?: (data: D, column: TableColumn<D>) => React.ReactNode;
  renderHeader?: (column: TableColumn<D>, data?: D[]) => React.ReactNode;
};

const Table = <D extends Record<string, TableValue>>({
  data,
  columns,
  selection = [],
  isLoading = false,
  onClickRow = () => {},
  renderData = defaultRenderData,
  renderHeader = defaultRenderHeader,
}: TableProps<D>) => {
  return (
    <table className={`${styles.table} ${isLoading ? styles.loading : ""}`}>
      <thead className={styles.table__head}>
        <Table.Row>
          {Array.isArray(columns)
            ? columns.map((column) => renderHeader(column, data))
            : null}
        </Table.Row>
      </thead>
      <tbody className={styles.table__body}>
        {Array.isArray(data)
          ? data.map((data, i) => (
              <Table.Row
                key={i}
                onClick={(e) => {
                  if (TABLE_TAGS.includes((e.target as HTMLElement).tagName)) {
                    onClickRow(data, data["id"] as D["id"]);
                  }
                }}
                className={
                  data.id && selection.includes(data.id as D["id"])
                    ? styles.table__rowSelected
                    : ""
                }
              >
                {Array.isArray(columns)
                  ? columns.map((column) => renderData(data, column))
                  : null}
              </Table.Row>
            ))
          : null}
      </tbody>
    </table>
  );
};

Table.Cell = TableCell;
Table.Row = TableRow;
Table.Header = TableHeader;

function defaultRenderData<D extends Record<string, TableValue>>(
  data: D,
  column: TableColumn<D>,
) {
  return (
    <Table.Cell key={String(column.key)}>{String(data[column.key])}</Table.Cell>
  );
}
function defaultRenderHeader<D extends Record<string, TableValue>>(
  column: TableColumn<D>,
) {
  return (
    <Table.Header key={String(column.key)}>
      <div>{String(column.label)}</div>
    </Table.Header>
  );
}

export default Table;
