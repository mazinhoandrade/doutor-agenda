"use client";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientsTableActionsProps {
  patient: typeof patientsTable.$inferSelect;
}

const TableActionPatient = ({ patient }: PatientsTableActionsProps) => {
  const [upSertDialogOpen, setUpSertDialogOpen] = useState(false);
  return (
    <Dialog open={upSertDialogOpen} onOpenChange={setUpSertDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center font-semibold capitalize">
            {patient.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUpSertDialogOpen(true)}>
            <PencilIcon className="h-4 w-4" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon className="h-4 w-4" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertPatientForm
        patient={patient}
        isOpen={upSertDialogOpen}
        onSuccess={() => setUpSertDialogOpen(false)}
      />
    </Dialog>
  );
};

export default TableActionPatient;
