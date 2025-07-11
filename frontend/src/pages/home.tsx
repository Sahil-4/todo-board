import AuthGuard from "../components/AuthGuard/AuthGuard";
import Header from "../components/Header/Header";
import AddTaskModal from "../components/AddTaskModal/AddTaskModal";
import ActivityLogModal from "../components/ActivityLogModal/ActivityLogModal";

const Home = () => {
  return (
    <AuthGuard>
      <Header />
      <main className="container">
        <AddTaskModal />
        <ActivityLogModal />
      </main>
    </AuthGuard>
  );
};

export default Home;
