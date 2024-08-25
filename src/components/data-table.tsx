import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

export interface DateTableColumn<Row extends object> {
  key: keyof Row | string;
  name: string;
  cell?: (value: Row[keyof Row], row: Row) => ReactNode;
  filterable?: boolean;
  creatable?: boolean;
}

export type DateTableRow = object;

export interface DataTableSearchParams {
  searchQuery: string | string[];
  searchColumn: string | string[];
  items: string | string[];
  page: string | string[];
}

interface DataTableProps<Row extends DateTableRow> {
  columns: DateTableColumn<Row>[];
  rows: Row[];
  actions?: ReactNode;
}

export default function DataTable<Row extends DateTableRow>({
  columns,
  rows,
  actions,
}: DataTableProps<Row>) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        {actions}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(({ key, name: header }) => (
                <TableHead key={key as string}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length ? (
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map(column => {
                    const value = row[column.key as keyof typeof row];
                    const parsedValue = () => {
                      if (
                        typeof value === "string" &&
                        !isNaN(new Date(value).getTime())
                      )
                        return new Date(value).toLocaleString();

                      return value;
                    };

                    return (
                      <TableCell key={column.key as string}>
                        {column.cell
                          ? column.cell(value, row)
                          : (parsedValue() as ReactNode)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
