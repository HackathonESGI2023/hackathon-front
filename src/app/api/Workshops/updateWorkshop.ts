import { Workshop } from "@prisma/client";

/**
 * PATCH /workshops/:id
 * @param id: number
 * @body Partial<<Omit<Workshop, "id">>
 * @returns Workshop
 */
