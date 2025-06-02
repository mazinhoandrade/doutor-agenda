import { z } from "zod";

export const DeletePatientSchema = z.object({
  id: z.string().uuid("ID do paciente inválido."),
});

export type DeletePatientInput = z.infer<typeof DeletePatientSchema>;
