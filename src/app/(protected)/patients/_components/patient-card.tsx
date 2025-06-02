"use client";

import { PhoneIcon, TrashIcon, UserIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePatient } from "@/actions/delete-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const { execute: deletePatientAction, isPending: isDeleting } = useAction(
    deletePatient,
    {
      onSuccess: () => {
        toast.success("Paciente excluído com sucesso");
      },
      onError: (error) => {
        console.error("Error deleting patient:", error);
        toast.error("Erro ao excluir paciente");
      },
    },
  );

  const handleDeleteClick = () => {
    deletePatientAction({ id: patient.id });
  };

  const getSexLabel = (sex: string | null) => {
    if (!sex) return "Não informado";
    switch (sex) {
      case "male":
        return "Masculino";
      case "female":
        return "Feminino";
      case "other":
        return "Outro";
      default:
        return "Não informado";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            {/* <AvatarImage src={patient.avatarImageUrl ?? undefined} /> // Assuming no avatar for patients yet */}
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold capitalize">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">{patient.email}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 flex flex-col gap-2">
        <Badge variant="outline" className="py-1">
          <PhoneIcon className="text-muted-foreground mr-2 h-4 w-4" />
          <span className="text-sm">{patient.phoneNumber}</span>
        </Badge>
        <Badge variant="outline" className="py-1">
          <UserIcon className="text-muted-foreground mr-2 h-4 w-4" />
          <span className="text-sm">{getSexLabel(patient.sex)}</span>
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="mt-4 flex flex-col gap-2 px-4 pb-4">
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              Editar Dados
            </Button>
          </DialogTrigger>
          {isEditDialogOpen && (
            <UpsertPatientForm
              patient={patient}
              isOpen={isEditDialogOpen}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          )}
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="w-full"
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? (
                "Excluindo..."
              ) : (
                <>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Excluir Paciente
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir este paciente?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser revertida. Isso irá excluir o paciente
                permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                {isDeleting ? "Excluindo..." : "Continuar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
