"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import AddCoffeeComponent from "@/components/features/addcoffee/AddCoffeeComponent";
import { boolean, z } from "zod";
import { ICoffeeImport } from "@/types/import";

const urlSchema = z.string().url({ message: "Invalid URL" });

export default function AddCoffee() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [coffeeImport, setCoffeeImport] = useState<ICoffeeImport | null>(null);
  const [url, setUrl] = useState<string>("");
  const [importedUrl, setImportedUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [manualImport, setManualImport] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const getToken = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setAccessToken(session.access_token);
      }
    };

    getToken();
  }, [supabase]);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      urlSchema.parse(url); // Validate URL
      setLoading(true);

      const res = await fetch("/api/finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken || ""}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      const data: ICoffeeImport = await res.json();
      setCoffeeImport(data);
      setImportedUrl(url);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const manualImportEvent = () => {
    setManualImport(true);
  };

  return (
    <div className="pl-20 pr-20">
      <div className="pb-2">
        <h1 className="font-bold text-2xl text-[var(--dark-heading-text)] pt-2">
          Add a Coffee
        </h1>
      </div>

      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="text-xs">
          For the most accurate and detailed coffee information, please use the
          manual import option unless the Import from URL feature below
          (currently in beta) is compatible with your coffee’s product page.
          Once submitted, your coffee entry will go through an admin review
          before it&apos;s visible to others. In the meantime, you&apos;ll still
          be able to view and interact with it right away. Thanks for helping
          grow our coffee community! ☕
        </p>
      </div>

      <form
        onSubmit={handleImport}
        className="flex gap-2 flex-col sm:flex-row mb-4"
      >
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter coffee product URL"
          className="flex-1"
        />
        <Button
          type="submit"
          className="shrink-0 sm:w-auto w-full cursor-pointer flex items-center justify-center"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin mr-2" />}
          Import
        </Button>
      </form>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex flex-col items-center pt-4">
        <h1 className="text-xs pb-2">URL import not working?</h1>
        <Button
          onClick={manualImportEvent}
          className="cursor-pointer"
          variant="outline"
        >
          Use Manual import
        </Button>
      </div>

      <div className="container">
        {(coffeeImport && importedUrl) || manualImport ? (
          <AddCoffeeComponent imported={coffeeImport} url={importedUrl} />
        ) : null}
      </div>
    </div>
  );
}
