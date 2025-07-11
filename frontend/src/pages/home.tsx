import AuthGuard from "../components/AuthGuard/AuthGuard";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <AuthGuard>
      <Header />
      <main className="container">
      </main>
    </AuthGuard>
  );
};

export default Home;
