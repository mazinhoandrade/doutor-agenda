import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WithAuthentication from "@/hocs/with-authentication";

import ClinicForm from "./_components/form";

const ClinicFormPage = async () => {
  return (
    <WithAuthentication mustHavePlan>
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
    </WithAuthentication>
  );
};

export default ClinicFormPage;
