type ColumnNames<
  // eslint-disable-next-line
  T extends ReadonlyArray<Record<string, any>>,
  K extends keyof T[number],
> = keyof {
  [Property in T[number] as Property[K]]: false;
};

type ColumnType<T> = {
  label: string;
  field: keyof T;
};
type TableProps<T extends Record<string, unknown>, C extends ColumnType<T>> = {
  cols: C[];
  rows: T[];
  renderRow: (
    row: T,
    col: ColumnType<ColumnNames<C[], "field">>,
    rows: T[],
  ) => React.ReactNode;
};

function Table<T extends Record<string, unknown>, C extends ColumnType<T>>({
  cols,
  rows,
  renderRow,
}: TableProps<T, C>) {
  return (
    <table>
      <thead>
        <tr>
          {cols.map((c) => (
            <th>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr>
            {cols.map((c) => (
              <td>{renderRow(r, c, rows)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
