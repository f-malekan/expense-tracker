import PwaRegistration from "../components/Pwa/PwaRegistration";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PwaRegistration />
      {children}
    </>
  );
}
