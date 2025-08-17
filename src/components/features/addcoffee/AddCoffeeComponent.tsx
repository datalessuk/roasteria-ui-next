"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DropDown from "@/components/features/components/dropdown/DropDown";
import {
  roastLevelDropDownOptions,
  processingMethodDropDownOptions,
} from "@/constants/dropdown";

import { createClient } from "@/utils/supabase/client";
import { ICoffeeImport } from "@/types/import";

interface AddCoffeeComponentProps {
  imported?: ICoffeeImport | null;
  url?: string;
}

const coffeeFormSchema = z.object({
  coffeeName: z.string().min(1, "Coffee name is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Please enter a valid URL"),
  roastLevel: z.string().min(1, "Roast level is required"),
  processingMethod: z.string().min(1, "Processing method is required"),
  isSingleOrigin: z.boolean(),
  tastingNotes: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Za-z]+(?:,\s*[A-Za-z]+)*$/.test(val), {
      message:
        'Use commas to separate tasting notes (e.g., "pear, almond, chocolate")',
    }),
});

type CoffeeFormData = z.infer<typeof coffeeFormSchema>;

export default function AddCoffeeComponent({
  imported,
  url,
}: AddCoffeeComponentProps) {
  const supabase = createClient();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [roastLevel, setRoastLevel] = useState<string>("");
  const [processingMethod, setProcessingMethod] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CoffeeFormData>({
    resolver: zodResolver(coffeeFormSchema),
    defaultValues: {
      coffeeName: "",
      description: "",
      url: "",
      roastLevel: "",
      isSingleOrigin: false,
      processingMethod: "",
      tastingNotes: "",
    },
  });

  const watchedValues = watch();

  const imageToBlob = async (imageUrl: string): Promise<Blob | null> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob;
    } catch (err) {
      console.error("Failed to convert image to blob:", err);
      return null;
    }
  };

  const uploadImage = async (
    coffeeId: number | string
  ): Promise<string | null> => {
    try {
      let imageBlob: Blob | null = null;

      if (imageFile) {
        imageBlob = imageFile as Blob;
      } else if (imported?.image) {
        imageBlob = await imageToBlob(imported.image);
      }

      if (!imageBlob) return null;

      const mimeParts = imageBlob.type.split("/");
      const fileExt = mimeParts.length === 2 ? mimeParts[1] : "jpg";
      const fileName = `${coffeeId}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("coffeeimages")
        .upload(fileName, imageBlob, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("❌ Error uploading image:", error.message);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from("coffeeimages")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("❌ Image upload failed:", error);
      return null;
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setImageFile(file);

    if (imageObjectUrl) {
      URL.revokeObjectURL(imageObjectUrl);
    }
    setImageObjectUrl(URL.createObjectURL(file));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLoad = async () => {
    if (!imported?.image) {
      return;
    }
    const imageBlob = await imageToBlob(imported.image);
    if (imageBlob) {
      if (imageObjectUrl) {
        URL.revokeObjectURL(imageObjectUrl);
      }
      setImageObjectUrl(URL.createObjectURL(imageBlob));
    } else {
      setImageObjectUrl(null);
    }
  };

  const resetForm = () => {
    if (imageObjectUrl) {
      URL.revokeObjectURL(imageObjectUrl);
      setImageObjectUrl(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImageFile(null);
    reset();
    router.push("/search/");
  };

  const onSubmit = async (data: CoffeeFormData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const tastingNotesArray = data.tastingNotes
        ? data.tastingNotes
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const { data: coffeeData, error: insertError } = await supabase
        .from("unapproved_coffees")
        .insert([
          {
            name: data.coffeeName,
            single_origin: data.isSingleOrigin,
            description: data.description,
            url: data.url,
            roast_level: data.roastLevel,
            processing_method: data.processingMethod,
            tasting_notes_array: tastingNotesArray,
            user_id: user?.id,
          },
        ])
        .select();

      if (insertError) {
        console.error("❌ Error saving coffee:", insertError.message);
        alert("Error: " + insertError.message);
        return;
      }

      const coffeeId = coffeeData[0].id;

      let imageUrl = null;
      if (imageFile || imported?.image) {
        imageUrl = await uploadImage(coffeeId);
      }

      if (imageUrl) {
        const { error: updateError } = await supabase
          .from("unapproved_coffees")
          .update({ image_url: imageUrl })
          .eq("id", coffeeId);
        if (updateError) {
          console.error("❌ Error updating image URL:", updateError.message);
        }
      }

      if (coffeeData) {
        toast.success(
          "Coffee Added to collection. A admin will approve for public viewing."
        );
        resetForm();
      }
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (imported) {
      handleLoad();
      setValue("coffeeName", imported.name);
      setValue("url", url ?? "");
      if (imported.description) setValue("description", imported.description);
      if (imported.tastingNotes)
        setValue("tastingNotes", imported.tastingNotes);

      // Pre-select roast
      const normalizedRoast = roastLevelDropDownOptions.find(
        (option) => option.value.toLowerCase() === imported.roast?.toLowerCase()
      )?.value;
      if (normalizedRoast) setValue("roastLevel", normalizedRoast);

      // Pre-select processing method
      const normalizedProcessing = processingMethodDropDownOptions.find(
        (option) =>
          option.value.toLowerCase() ===
          imported.processingMethod?.toLowerCase()
      )?.value;
      if (normalizedProcessing)
        setValue("processingMethod", normalizedProcessing);
    }
  }, [imported, setValue, url]);

  return (
    <div>
      <div className="p-3 rounded-lg border border-border text-card-foreground shadow-sm dark:shadow-md dark:shadow-black/20 p-6 mb-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
        <h1 className="text-xl font-semibold mb-1">Coffee Image Upload</h1>
        <div className="mt-2">
          {imageObjectUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="rounded-lg object-cover w-20 h-20"
              src={imageObjectUrl}
              alt="Image preview"
            />
          )}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <div>
              <p className="text-xs pt-2">Upload Image</p>
              <p className="text-xs pb-2 opacity-50">
                Supported formats: JPEG, PNG, WebP, GIF • Maximum size: 5MB
              </p>
              <Button variant="secondary" onClick={triggerFileInput}>
                Choose File
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-xl mx-auto w-full p-4 sm:p-6 rounded-lg border border-border text-card-foreground shadow-sm dark:shadow-md dark:shadow-black/20 mb-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
          <div>
            <h1 className="font-bold text-xl text-[var(--dark-heading-text)]">
              Add New Coffee Release
            </h1>
          </div>

          <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-xs">
              <span className="font-bold">Required fields</span> are marked with
              a red asterisk (*). Please fill out all required fields before
              submitting.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label
                  className="text-sm font-semibold text-[#2C1810]/60 dark:text-amber-200/70"
                  htmlFor="coffeeName"
                >
                  Coffee Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("coffeeName")}
                  id="coffeeName"
                  type="text"
                  placeholder="Coffee name"
                />
                {errors.coffeeName && (
                  <p className="text-red-500 text-sm">
                    {errors.coffeeName.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label
                  className="text-sm font-semibold text-[#2C1810]/60 dark:text-amber-200/70"
                  htmlFor="description"
                >
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder="Description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label
                  className="text-sm font-semibold text-[#2C1810]/60 dark:text-amber-200/70"
                  htmlFor="url"
                >
                  Product URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("url")}
                  id="url"
                  type="text"
                  placeholder="Product URL"
                />
                {errors.url && (
                  <p className="text-red-500 text-sm">{errors.url.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label
                  className="text-sm font-semibold text-[#2C1810]/60 dark:text-amber-200/70"
                  htmlFor="roastLevel"
                >
                  Roast Level <span className="text-red-500">*</span>
                </Label>
                <DropDown
                  value={watchedValues.roastLevel} // RHF watch value
                  onChange={(value: string) => setValue("roastLevel", value)} // updates RHF
                  dropDownOptions={roastLevelDropDownOptions}
                  placeholder="Select a roast level"
                />
                {errors.roastLevel && (
                  <p className="text-red-500 text-sm">
                    {errors.roastLevel.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label
                  className="text-sm font-semibold text-[#2C1810]/60 dark:text-amber-200/70"
                  htmlFor="isSingleOrigin"
                >
                  Single Origin
                </Label>
                <Checkbox
                  checked={watchedValues.isSingleOrigin}
                  onCheckedChange={(checked) =>
                    setValue("isSingleOrigin", !!checked)
                  }
                  id="isSingleOrigin"
                />
              </div>

              <div className="grid gap-3">
                <Label
                  className="text-sm font-semibold text-[#2C1810]/60 dark:text-amber-200/70"
                  htmlFor="processingMethod"
                >
                  Processing Method <span className="text-red-500">*</span>
                </Label>
                <DropDown
                  value={watchedValues.processingMethod}
                  onChange={(value: string) =>
                    setValue("processingMethod", value)
                  }
                  dropDownOptions={processingMethodDropDownOptions}
                  placeholder="Select a processing method"
                />
                {errors.processingMethod && (
                  <p className="text-red-500 text-sm">
                    {errors.processingMethod.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <Label
                  className="text-sm font-semibold text-[#2C1810]/60 dark:text-amber-200/70"
                  htmlFor="tastingNotes"
                >
                  Tasting Notes
                </Label>
                <Input
                  {...register("tastingNotes")}
                  id="tastingNotes"
                  type="text"
                  placeholder="Tasting notes"
                />
                {errors.tastingNotes && (
                  <p className="text-red-500 text-sm">
                    {errors.tastingNotes.message}
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Coffee"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
