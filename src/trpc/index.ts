import { NextResponse } from "next/server";
import { publicProcedure, router } from "./trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  authCallback: publicProcedure.query(() => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user || !user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
