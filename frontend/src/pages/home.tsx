import AuthGuard from "../components/AuthGuard/AuthGuard";
import Header from "../components/Header/Header";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import AddTaskModal from "../components/AddTaskModal/AddTaskModal";
import ActivityLogModal from "../components/ActivityLogModal/ActivityLogModal";
import ViewTaskModal from "../components/ViewTaskModal/ViewTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal/UpdateTaskModal";

const Home = () => {
  return (
    <AuthGuard>
      <Header />
      <main className="container">
        <KanbanBoard />
        <AddTaskModal />
        <ActivityLogModal />
        <ViewTaskModal />
        <UpdateTaskModal />
      </main>
    </AuthGuard>
  );
};

export default Home;
