import {
  Application,
  Company,
  Contract,
  Event,
  Mission,
  Project,
  Role,
  SkillCategory,
  SkillLevel,
  SkillType,
  User,
  Workshop,
} from "@prisma/client";
import { GET } from "../route";

export async function getUsers() {
  const res = await GET(`users`);
  return res.json();
}

export interface StuffedMission extends Mission {
  Company: Company;
  User: User;
  Projects: Project[];
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
  Mission: StuffedMission[];
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
  ApplicationSponsor: Application[];
}
