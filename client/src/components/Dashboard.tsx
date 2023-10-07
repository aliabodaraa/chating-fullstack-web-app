type DashboardPropsType = {
  children: React.ReactNode[];
};
const Dashboard = ({ children }: DashboardPropsType) => {
  console.log("Dashboard");
  let [Sidebar, MainInterface] = children;
  return (
    <div className="d-flex" style={{ height: "88vh", paddingTop: "30px" }}>
      {Sidebar}
      {MainInterface}
    </div>
  );
};

export default Dashboard;
