import { auth } from "../auth";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;
  return <div>{userId}</div>;
}
