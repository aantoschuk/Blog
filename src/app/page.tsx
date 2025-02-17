import { NavBar } from "@/components";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Blog</h1>
      </main>
    </div>
  );
}
