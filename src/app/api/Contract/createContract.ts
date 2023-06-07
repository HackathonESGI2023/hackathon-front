import { Contract } from "@prisma/client";
/**
 * POST /contract
 * @body Partial<<Omit<Contract, "id">>
 * @returns Contract
 */
