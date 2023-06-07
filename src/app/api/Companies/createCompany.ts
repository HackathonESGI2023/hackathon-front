import { Company } from "@prisma/client";
/**
 * POST /companies
 * @body Partial<<Omit<Company, "id">>
 * @returns Company
 */
