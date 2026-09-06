import { ReactNode } from "react";
import AppHeader from "./AppHeader";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-text">
      <AppHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
