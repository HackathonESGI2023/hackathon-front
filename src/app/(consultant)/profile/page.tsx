"use client";

import SelectPinnedSkills from "./components/SelectPinnedSkills/SelectPinnedSkills";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  return (
    <>
      <h1>Profile page</h1>
      <SelectPinnedSkills />
    </>
  );
};

export default Profile;
