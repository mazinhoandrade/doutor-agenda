import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { usersTable, usersToClinicsTable } from "@/db/schema";

const FIVE_MINUTES = 5 * 60 * 1000;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
    usePlural: true,
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      // TODO: colocar cache
      const [userData, clinics] = await Promise.all([
        db.query.usersTable.findFirst({
          where: eq(usersTable.id, user.id),
        }),
        db.query.usersToClinicsTable.findMany({
          where: eq(usersToClinicsTable.userId, user.id),
          with: {
            clinic: true,
            user: true,
          },
        }),
      ]);
      // TODO: ao adaptar para o usuario ter multiplas clinicas, deve-se mudar esse codigo
      const clinic = clinics?.[0];
      return {
        user: {
          ...user,
          plan: userData?.plan,
          clinic: clinic?.clinicId
            ? {
                id: clinic?.clinicId,
                name: clinic?.clinic?.name,
              }
            : undefined,
        },
        session,
      };
    }),
  ],
  user: {
    modelName: "usersTable",
    additionalFields: {
      stripeCustomerId: {
        type: "string",
        filterable: "stripeCustomerId",
        required: false,
      },
      stripeSubscriptionId: {
        type: "string",
        filterable: "stripeSubscriptionId",
        required: false,
      },
      plan: {
        type: "string",
        filterable: "plan",
        required: false,
      },
    },
  },
  account: {
    modelName: "accountsTable",
  },
  session: {
    // CACHE ASIDE
    cookieName: {
      enabled: true,
      maxAge: FIVE_MINUTES,
    },
    modelName: "sessionsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});
