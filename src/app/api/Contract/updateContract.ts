import { Contract } from "@prisma/client";

/**
 * PATCH /contract/:id
 * @param id: number
 * @body Partial<<Omit<Contract, "id">>
 * @returns Contract
 */
