"use client";
import ProfileCards from "../components/Cards/ProfileCards/ProfileCards";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <>
      <h1>Page profile{children}</h1>
      <ProfileCards />
    </>
  );
};

export default Dashboard;
