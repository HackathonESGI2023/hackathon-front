type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  return <h1>dashboard{children}</h1>;
};

export default Dashboard;
