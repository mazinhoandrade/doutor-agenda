import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const WithAuthentication = async ({
  children,
  mustHaveClinic = false,
  mustHavePlan = false,
}: {
  children: React.ReactNode;
  mustHaveClinic?: boolean;
  mustHavePlan?: boolean;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/authentication");
  }

  if (mustHavePlan && !session.user.plan) {
    return redirect("/new-subscription");
  }

  if (mustHaveClinic && !session.user.clinic?.id) {
    return redirect("/clinic-form");
  }

  return children;
};

export default WithAuthentication;
