
import Image from "next/image";
import { Rabbit, Shield, Bell, TrendingDown } from "lucide-react";
import AppForm from "@/components/AppForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";
export default async function Home() {
  const supabase = await createClient();

  const {
     data:{user},
  } = await supabase.auth.getUser();

  const products = user? await getProducts(): [];
  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];
  return (
    <main className="min-h-screen  bg-[radial-gradient(circle_at_50%_35%,#1746A2_0%,#0B2B70_35%,#071A4A_75%)]">
      <header className="sticky backdrop-blur-2xl top-0 z-10 ">
        <div className="max-w-7xl mx-auto px-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl text-olive-100 font-extrabold mt-5 h-15 ">PRICEDROP</h1>
            {/* <Image
              src={"/logo-org-2.png"}
              alt="logo"
              width={600}
              height={200}
              className="h-28 w-auto"
              loading="eager"
            /> */}
          </div>
          {/*Auth btn*/}
          <AuthButton user={user} />
        </div>
      </header>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent-foreground text-white px-6 py-2 rounded-full text-sm font-medium mb-6">Made by Sarang</div>
          <h2 className="text-2xl font-bold mb-4 tracking-tight text-white">Never Miss a Price Drop Update</h2>
          <p className="text-xl text-mist-400 max-w-2xl mx-auto mb-12" >
            Smart Price Tracking Made Simple. Add any product link, we'll
            monitor the price for you and notify you the moment it drops.
          </p>
          {/*product form*/}
          <AppForm user={user} />
          {/*features*/}
          {products.length === 0 && (<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            {FEATURES.map(({icon: Icon, title, description})=>(
              <div key={title}
              className="bg-[radial-gradient(circle_at_50%_35%,#1746A2_0%,#0B2B70_35%,#071A4A_75%)] p-6 rounded-xl border border-gray-500">
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-white"/>
                </div>
                <h3 className="font-semibold text-gray-300 mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{description}</p>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {user && products.length>0 && <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-200">Your Tracked Products</h3>

          <span className="text-sm text-gray-500">
           {products.length} {products.length===1 ? "product": "products"}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
         {products.map((product)=>(<ProductCard key={product.id} product={product}/>))}
        </div>
        </section>}    

      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

