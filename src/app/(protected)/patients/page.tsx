import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { DataTable } from "@/components/ui/data-table";
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
import { patientsTable } from "@/db/schema";
import WithAuthentication from "@/hocs/with-authentication";
import { auth } from "@/lib/auth";

import { AddPatientButton } from "./_components/add-patient-button";
import { patientsTableColumns } from "./_components/table-columns";

export default async function PatientsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session!.user.clinic!.id),
  });

  return (
    <WithAuthentication mustHavePlan mustHaveClinic>
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderTitle>Pacientes</PageHeaderTitle>
            <PageHeaderDescription>
              Gerencie os pacientes da sua clínica
            </PageHeaderDescription>
          </PageHeaderContent>
          <PageActions>
            <AddPatientButton />
          </PageActions>
        </PageHeader>
        <PageContent>
          <DataTable columns={patientsTableColumns} data={patients} />
        </PageContent>
      </PageContainer>
    </WithAuthentication>
  );
}
