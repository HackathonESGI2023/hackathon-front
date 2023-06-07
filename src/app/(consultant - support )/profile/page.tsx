type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  return <h1>Page profile{children}</h1>;
};

export default Dashboard;
