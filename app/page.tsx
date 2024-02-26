import { Dashboard } from "./components";
import RunnerAnim from "@/components/animations/RunnerAnim";

type Data = {
  key: string;
  value:string
}
export default async function Home() {

  const data:Data[] = [{ key: "d1", value: "d1" }, { key: "d2", value: "d2" }, { key: "d3", value: "d3" }, { key: "d4", value: "d4" }, { key: "d5", value: "d5" }]
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dashboard />
    </main>
  );
}