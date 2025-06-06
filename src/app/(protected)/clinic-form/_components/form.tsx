"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const clinicSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Nome deve conter pelo menos 3 caracteres.",
  }),
});

const ClinicForm = () => {
  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
    },
  });

  const addClinicAction = useAction(createClinic, {
    onSuccess: () => {
      toast.success("Clínica criada com sucesso");
    },
    onError: (error) => {
      if (isRedirectError(error)) {
        return;
      }
      toast.error("Erro ao criar clínica");
    },
  });

  const onSubmit = async (values: z.infer<typeof clinicSchema>) => {
    addClinicAction.execute(values);
    /* try {
      await createClinic(values.name);
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.error(error);
      toast.error("Erro ao criar clínica");
    } */
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              disabled={form.formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Criar clínica"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default ClinicForm;
