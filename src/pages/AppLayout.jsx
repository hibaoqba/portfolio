import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

export default function AppLayout({ children }) {
  return (
    <>
      <div className="app-bg relative min-h-screen">
        {children}
        <Footer />
      </div>
      <ThemeToggle />
    </>
  );
}
