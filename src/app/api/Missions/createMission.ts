import { Mission } from "@prisma/client";
/**
 * POST /missions
 * @body Partial<<Omit<Mission, "id">>
 * @returns Mission
 */
