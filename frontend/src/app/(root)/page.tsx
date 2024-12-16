import Hero from "@/components/Home/Hero";

export default async function Home() {
  // const response = await fetch('https://mnrn-shop-backend.onrender.com/api/v1')
  // const result = await response.json() || ''

  return (
    <div >
      <Hero />
      {"result.result"}
    </div>
  );
}
