import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-lg">This is a test</p>
    </div>
  );
}
