import { api } from "@/api";
import { DemoWithDetails } from "@/api/entities";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import DataTable, { DateTableColumn } from "../../../components/data-table";

export const metadata: Metadata = {
  title: "Demos",
};

const columns: DateTableColumn<DemoWithDetails>[] = [
  {
    key: "name",
    name: "Nome",
  },
  {
    key: "totalFrames",
    name: "Total de frames",
  },
  {
    key: "createdAt",
    name: "Criado em",
  },
  {
    key: "view",
    name: "Visualizar",
    cell: (_, row) => {
      return (
        <Link
          href={`/demos/${row.slug}`}
          className="flex items-center gap-1 py-2 text-md tracking-tight leading-6 font-bold text-gray-800 hover:opacity-80 active:opacity-60 transition-opacity"
        >
          <span>Ver demo</span>

          <ArrowRight width={18} />
        </Link>
      );
    },
  },
];

export default async function Demos() {
  const { demos } = await api.demo.findManyDetails();

  return (
    <main>
      <h1 className="mb-10 text-4xl font-bold text-zinc-950">Minhas demos</h1>

      <DataTable columns={columns} rows={demos} />
    </main>
  );
}
