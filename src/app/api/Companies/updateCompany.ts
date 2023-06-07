import { Company } from "@prisma/client";

/**
 * PATCH /companies/:id
 * @param id: number
 * @body Partial<<Omit<Company, "id">>
 * @returns Company
 */
