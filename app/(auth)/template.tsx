import PwaRegistration from "../components/Pwa/PwaRegistration";

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PwaRegistration />
      {children}
    </>
  );
}
