"use client";
import { ColumnDef } from "@tanstack/react-table";

import { patientsTable } from "@/db/schema";

import TableActionPatient from "./table-action";

type Patient = typeof patientsTable.$inferSelect;

export const patientsTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "phoneNumber",
    header: "Telefone",
    accessorKey: "phoneNumber",
    cell: (params) => {
      const phone = params.row.original.phoneNumber;
      const formatted = phone.replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
        "($1) $2 $3-$4",
      );
      return formatted;
    },
  },
  {
    id: "sex",
    header: "Sexo",
    accessorKey: "sex",
    cell: (params) => {
      const sex = params.row.original.sex;
      if (sex === "male") return "Masculino";
      if (sex === "female") {
        return "Feminino";
      } else {
        return "Não informado";
      }
    },
  },
  {
    id: "actions",
    header: "",
    accessorKey: "actions",
    cell: (params) => {
      const patient = params.row.original;
      return <TableActionPatient patient={patient} />;
    },
  },
];
