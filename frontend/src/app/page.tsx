import Image from "next/image";

export default async function Home() {
  const response = await fetch('https://mnrn-shop-backend.onrender.com/api/v1')
  const result = await response.json()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {result.result}
    </div>
  );
}
