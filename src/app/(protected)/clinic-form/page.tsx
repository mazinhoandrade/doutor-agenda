import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ClinicForm from "./_components/form";

const ClinicFormPage = () => {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crie sua clínica</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para criar sua clínica.
          </DialogDescription>
        </DialogHeader>
        <ClinicForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicFormPage;
