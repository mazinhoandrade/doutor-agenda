"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { appointmentsTable } from "@/db/schema";

import TableActionAppointment from "./table-action";

type AppointmentWithRelations = typeof appointmentsTable.$inferSelect & {
  patient: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    sex: "male" | "female" | "other";
  };
  doctor: {
    id: string;
    name: string;
    speciality: string;
  };
};

export const appointmentsTableColumns: ColumnDef<AppointmentWithRelations>[] = [
  {
    id: "patient",
    header: "Paciente",
    accessorKey: "patient.name",
  },
  {
    id: "doctor",
    header: "Médico",
    accessorKey: "doctor.name",
    cell: (params) => {
      const appointment = params.row.original;
      return appointment.doctor.name;
    },
  },
  {
    id: "date",
    header: "Data e horário",
    accessorKey: "date",
    cell: (params) => {
      const appointment = params.row.original;
      return format(new Date(appointment.date), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      });
    },
  },
  {
    id: "specialty",
    header: "Especialidade",
    accessorKey: "doctor.speciality",
  },
  {
    id: "price",
    accessorKey: "appointmentPriceInCents",
    header: "Valor",
    cell: (params) => {
      const appointment = params.row.original;
      const price = appointment.appointmentPriceInCents / 100;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
    },
  },
  {
    id: "actions",
    header: "",
    cell: (params) => {
      const appointment = params.row.original;
      return <TableActionAppointment appointment={appointment} />;
    },
  },
];
