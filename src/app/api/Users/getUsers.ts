import {
  Contract,
  Role,
  Event,
  Mission,
  SkillLevel,
  SkillType,
  Workshop,
  SkillCategory,
} from "@prisma/client";
import { GET } from "../route";

export async function getUsers() {
  const res = await GET(`users`);
  return res.json();
}

export interface UserResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profile_picture: string;
  address: string;
  slackId: string;
  roles: Role[];
  Contract: Contract[];
  Events: Event[];
  EventsOwner: Event[];
  Missions: Mission[];
  UserSkill: {
    id: number;
    isStarred: boolean;
    level: SkillLevel;
    skill: {
      color: string;
      name: string;
      type: SkillType;
      category: SkillCategory;
    };
  }[];
  WorkshopOwner: Workshop[];
  Workshops: Workshop[];
}
