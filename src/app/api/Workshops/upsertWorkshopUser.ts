import { Workshop } from "@prisma/client";
import { PATCH } from "../route";

export const upsertWorkshopUser = async (params: {
  id: Workshop["id"];
  params: {
    userId: number;
    isParticipating: boolean;
  };
}): Promise<Workshop> => {
  const res = await PATCH(`workshops/${params.id}/upsert-user`, params.params);

  return res.json();
};
