import { Workshop } from "@prisma/client";
/**
 * POST /workshops
 * @body Partial<<Omit<Workshop, "id">>
 * @returns Workshop
 */
