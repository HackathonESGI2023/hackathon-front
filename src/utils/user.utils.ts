import { UserResponse } from "../app/api/Users/getUsers";

const getUserLevel = (user: UserResponse) => {
  // Time at Carbon
  let monthesAtCarbon = 0;
  const contracts = user.Contract;
  contracts.forEach((contract) => {
    const startDate = new Date(contract.startDate);
    const endDate = contract.endDate ? new Date(contract.endDate) : new Date();
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    monthesAtCarbon += diffMonths;
  });

  // Points per events
  let eventsPoints = user.Events.length;

  // Points pers workshops
  let workshopsPoints = user.Workshops.length * 2;

  // Points per missions
  let missionsPoints = user.Mission.length * 3;

  // Points per projects
  let projectsPoints = 0;
  user.Mission.forEach((mission) => {
    projectsPoints += mission.Projects.length;
  });

  // Points per sponsorships
  let sponsorshipsPoints = user.ApplicationSponsor.length * 5;

  const totalPoints =
    monthesAtCarbon +
    eventsPoints +
    workshopsPoints +
    missionsPoints +
    projectsPoints +
    sponsorshipsPoints;

  return {
    totalPoints,
    level: Math.floor(totalPoints / 10),
    xp: (totalPoints % 10) * 10,
  };
};

export const userUtils = {
  level: getUserLevel,
};
