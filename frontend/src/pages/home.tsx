import AuthGuard from "../components/AuthGuard/AuthGuard";

const Home = () => {
  return (
    <AuthGuard>
      <div>Home</div>
    </AuthGuard>
  );
};

export default Home;
