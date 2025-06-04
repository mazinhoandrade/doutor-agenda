import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Assinatura</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie a assinatura da sua clínica
          </PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <SubscriptionPlan
          className="w-[350px]"
          userEmail={session.user.email}
          active={session.user.plan === "essencial"}
        />
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionPage;
