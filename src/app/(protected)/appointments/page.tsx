import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

//import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddAppointmentsButton from "./_components/add-appointments-button";
//import { appointmentsTableColumns } from "./_components/table-columns";

const AppointmentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user?.clinic?.id) {
    redirect("/clinic-form");
  }

  const [patients, doctors] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinic.id),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, session.user.clinic.id),
    }),
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, session.user.clinic.id),
      with: {
        patient: true,
        doctor: true,
      },
    }),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Agendamentos</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie os agendamentos da sua clínica
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageActions>
          <AddAppointmentsButton patients={patients} doctors={doctors} />
        </PageActions>
      </PageHeader>
      <PageContent>
        kkk
        {/*         <DataTable
          columns={appointmentsTableColumns}
          data={appointmentsTable}
        />
        {patients.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-muted-foreground">Nenhum paciente cadastrado</p>
          </div>
        )} */}
      </PageContent>
    </PageContainer>
  );
};

export default AppointmentsPage;
