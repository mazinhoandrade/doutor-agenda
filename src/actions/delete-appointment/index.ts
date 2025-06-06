"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { protectedWithClinicActionClient } from "@/lib/next-safe-action";

const schema = z.object({
  id: z.string().uuid(),
});

export const deleteAppointment = protectedWithClinicActionClient
  .schema(schema)
  .action(async ({ parsedInput, ctx }) => {
    const appointment = await db.query.appointmentsTable.findFirst({
      where: eq(appointmentsTable.id, parsedInput.id),
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.clinicId !== ctx.user.clinic.id) {
      throw new Error("Appointment not found");
    }

    await db
      .delete(appointmentsTable)
      .where(eq(appointmentsTable.id, parsedInput.id));
    revalidatePath("/appointments");
  });
