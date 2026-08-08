"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import AuthModal from "./AuthModal";
import { addProduct } from "@/app/actions";
import { toast } from "sonner";

const AppForm = ({ user }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("url", url);

    const result = await addProduct(formData);

    if (result.error) {
      toast.error(result.error);
    }else {
      toast.success(result.message || "Product added successfully!");
      setUrl(""); // Clear the input field after successful submission
    }

    setLoading(false);
    
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 ">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Product URL (Amazon, eBay, etc.)"
            className="relative h-12 text-base text-white px-6 py-6 rounded-4xl bg-accent-foreground shadow-[0_4px_12px_rgba(0,0,0,0.12)] border-none hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:bg-white hover:text-black transition-all duration-300"
            required
            disabled={loading}
          />
          <Button
            className="relative px-6 py-6 rounded-4xl hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:bg-white hover:text-black transition-all duration-300"
            type="submit"
            disabled={loading}
            size={"lg"}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Product...
              </>
            ) : (
              "Track Price Drop"
            )}
          </Button>
        </div>
      </form>
      {/*Auth mode on*/}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AppForm;
