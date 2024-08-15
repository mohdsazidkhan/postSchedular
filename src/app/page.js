"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg">
        <button
          onClick={() => router.push("/login")}
          className="w-full px-6 py-2 bg-gray-500 text-black rounded hover:bg-gray-600"
        >
          Login
        </button>
      </div>
    </main>
  );
}
