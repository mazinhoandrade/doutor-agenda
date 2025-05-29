import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user?.clinic?.id) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>madicos</PageHeaderContent>
      </PageHeader>
    </PageContainer>
  );
};

export default DashboardPage;
