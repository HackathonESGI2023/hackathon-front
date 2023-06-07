import { Mission } from "@prisma/client";

/**
 * PATCH /missions/:id
 * @param id: number
 * @body Partial<<Omit<Mission, "id">>
 * @returns Mission
 */
