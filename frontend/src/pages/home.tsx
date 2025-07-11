import AuthGuard from "../components/AuthGuard/AuthGuard";
import Header from "../components/Header/Header";
import ActivityLogModal from "../components/ActivityLogModal/ActivityLogModal";

const Home = () => {
  return (
    <AuthGuard>
      <Header />
      <main className="container">
        <ActivityLogModal />
      </main>
    </AuthGuard>
  );
};

export default Home;
