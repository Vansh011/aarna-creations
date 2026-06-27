"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { Check, ImagePlus, Lock, PackageMinus, RefreshCw, Search, Trash2, UploadCloud, X } from "lucide-react";
import { categories, sizes } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import type { Product, Size } from "@/types";

type Tab = "add" | "remove";

interface CompressedImage {
  id: string;
  file: File;
  previewUrl: string;
  originalName: string;
  originalSize: number;
}

const initialForm = {
  name: "",
  discountedPrice: "",
  mainPrice: "",
  color: "",
  fabricMaterial: "",
  category: categories[0],
  subcategory: "",
  description: "",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function imageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };
    image.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

async function compressImage(file: File): Promise<File> {
  const image = await imageFromFile(file);
  const maxEdge = 1600;
  const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not prepare image compression");
  context.drawImage(image, 0, 0, width, height);

  let type = "image/webp";
  let blob = await canvasToBlob(canvas, type, 0.78);
  if (!blob) {
    type = "image/jpeg";
    blob = await canvasToBlob(canvas, type, 0.78);
  }
  if (blob && blob.size > file.size) {
    const smallerBlob = await canvasToBlob(canvas, type, 0.75);
    if (smallerBlob) blob = smallerBlob;
  }
  if (!blob) throw new Error("Could not compress image");

  const extension = type === "image/webp" ? ".webp" : ".jpg";
  const safeName = file.name.replace(/.[^.]+$/, "").replace(/[^a-z0-9_-]+/gi, "-").toLowerCase();
  return new File([blob], safeName + extension, { type });
}

export function OwnerDashboard() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<Tab>("add");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [removePin, setRemovePin] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => [product.name, product.category, product.subcategory, product.color]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(term));
  }, [products, search]);

  const loadProducts = async (nextPin = pin) => {
    const response = await fetch("/api/admin/products", {
      headers: { "x-owner-pin": nextPin },
      cache: "no-store",
    });
    if (!response.ok) throw new Error((await response.json()).error ?? "Could not load products");
    const data = await response.json();
    setProducts(data.products ?? []);
  };

  const handleUnlock = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await loadProducts(pin);
      setUnlocked(true);
      setMessage("Owner tools unlocked.");
    } catch (unlockError) {
      setError(unlockError instanceof Error ? unlockError.message : "Invalid PIN");
    } finally {
      setBusy(false);
    }
  };

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleSize = (size: Size) => {
    setSelectedSizes((current) => current.includes(size)
      ? current.filter((item) => item !== size)
      : [...current, size]);
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 5 - images.length);
    if (files.length === 0) return;
    setCompressing(true);
    setError("");
    try {
      const compressed = await Promise.all(files.map(async (file) => {
        const compressedFile = await compressImage(file);
        return {
          id: crypto.randomUUID(),
          file: compressedFile,
          previewUrl: URL.createObjectURL(compressedFile),
          originalName: file.name,
          originalSize: file.size,
        };
      }));
      setImages((current) => [...current, ...compressed].slice(0, 5));
    } catch (imageError) {
      setError(imageError instanceof Error ? imageError.message : "Could not compress images");
    } finally {
      setCompressing(false);
      event.target.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const image = current.find((item) => item.id === id);
      if (image) URL.revokeObjectURL(image.previewUrl);
      return current.filter((item) => item.id !== id);
    });
  };

  const resetAddForm = () => {
    images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setForm(initialForm);
    setSelectedSizes([]);
    setImages([]);
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("pin", pin);
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      selectedSizes.forEach((size) => formData.append("sizes", size));
      images.forEach((image) => formData.append("images", image.file));

      const response = await fetch("/api/admin/products", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Upload failed");
      setProducts((current) => [data.product, ...current]);
      resetAddForm();
      setMessage("New item uploaded to the website.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };

  const handleRemove = async () => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: removePin, ids: selectedProductIds }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Remove failed");
      setProducts(data.products ?? []);
      setSelectedProductIds([]);
      setRemovePin("");
      setMessage("Removed " + data.removed + " item(s) from the website.");
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Remove failed");
    } finally {
      setBusy(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-[70vh] bg-ivory px-4 py-16">
        <div className="mx-auto max-w-md rounded-lg border border-gold/20 bg-white p-8 shadow-[0_24px_80px_rgba(90,21,41,0.12)]">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-gold">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-serif text-3xl text-maroon">Owner Access</h1>
            <p className="mt-2 text-sm text-maroon/65">Private product upload and sold-item removal for AARNA CREATIONS.</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <Label htmlFor="pin">Owner PIN</Label>
              <Input id="pin" type="password" value={pin} onChange={(event) => setPin(event.target.value)} className="mt-1.5" placeholder="Enter PIN" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={busy || !pin}>
              {busy ? "Checking..." : "Unlock Owner Tools"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory">
      <section className="relative overflow-hidden bg-maroon px-4 py-12 text-ivory">
        <div className="absolute inset-0 boutique-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Private dashboard</p>
          <h1 className="mt-2 font-serif text-4xl">Owner Tools</h1>
          <p className="mt-3 max-w-2xl text-ivory/75">Add new arrivals, compress photos, and remove sold pieces from the live website.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Button variant={tab === "add" ? "gold" : "outline"} onClick={() => setTab("add")}>
            <UploadCloud className="h-4 w-4" /> Add New Item
          </Button>
          <Button variant={tab === "remove" ? "gold" : "outline"} onClick={() => setTab("remove")}>
            <PackageMinus className="h-4 w-4" /> Remove Sold Items
          </Button>
          <Button variant="ghost" onClick={() => loadProducts().catch((loadError) => setError(loadError.message))}>
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
        </div>

        {message && <div className="mb-5 rounded-md border border-emerald/20 bg-emerald/10 px-4 py-3 text-sm text-emerald"><Check className="mr-2 inline h-4 w-4" />{message}</div>}
        {error && <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        {tab === "add" ? (
          <form onSubmit={handleUpload} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-maroon">Item Details</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" value={form.name} onChange={(event) => updateForm("name", event.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="discountedPrice">Discounted Price *</Label>
                  <Input id="discountedPrice" type="number" min="1" value={form.discountedPrice} onChange={(event) => updateForm("discountedPrice", event.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="mainPrice">Main Price *</Label>
                  <Input id="mainPrice" type="number" min="1" value={form.mainPrice} onChange={(event) => updateForm("mainPrice", event.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="color">Color *</Label>
                  <Input id="color" value={form.color} onChange={(event) => updateForm("color", event.target.value)} className="mt-1.5" placeholder="e.g. Maroon, gold work" />
                </div>
                <div>
                  <Label htmlFor="fabricMaterial">Fabric / Material *</Label>
                  <Input id="fabricMaterial" value={form.fabricMaterial} onChange={(event) => updateForm("fabricMaterial", event.target.value)} className="mt-1.5" placeholder="e.g. Cotton silk" />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select id="category" value={form.category} onChange={(event) => updateForm("category", event.target.value)} className="mt-1.5 flex h-11 w-full rounded-md border border-maroon/20 bg-white px-4 py-2 text-sm text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input id="subcategory" value={form.subcategory} onChange={(event) => updateForm("subcategory", event.target.value)} className="mt-1.5" placeholder="Optional" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Available Sizes *</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sizes.map((size) => {
                      const active = selectedSizes.includes(size);
                      return (
                        <button key={size} type="button" onClick={() => toggleSize(size)} className={["rounded-md border px-3 py-2 text-sm", active ? "border-maroon bg-maroon text-white" : "border-maroon/30 text-maroon"].join(" ")}>{size}</button>
                      );
                    })}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" value={form.description} onChange={(event) => updateForm("description", event.target.value)} className="mt-1.5 min-h-36" placeholder="Describe fabric, pattern, work, fit, and styling." />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl text-maroon">Photos</h2>
              <p className="mt-1 text-sm text-maroon/60">Upload 1 to 5 photos. Each photo is compressed to WebP/JPEG around 75-80% quality before upload.</p>
              <label className="mt-5 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gold/40 bg-cream/70 p-6 text-center text-maroon transition-colors hover:border-gold">
                <ImagePlus className="mb-3 h-8 w-8 text-gold" />
                <span className="font-medium">Choose photos</span>
                <span className="mt-1 text-xs text-maroon/55">{compressing ? "Compressing..." : "JPG, PNG, or WebP"}</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} disabled={images.length >= 5 || compressing} />
              </label>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((image) => (
                  <div key={image.id} className="relative overflow-hidden rounded-lg border border-gold/20 bg-cream">
                    <div className="relative aspect-[3/4]">
                      <img src={image.previewUrl} alt={image.originalName} className="h-full w-full object-cover" />
                    </div>
                    <button type="button" onClick={() => removeImage(image.id)} className="absolute right-2 top-2 rounded-full bg-white p-1 text-maroon shadow" aria-label="Remove image">
                      <X className="h-4 w-4" />
                    </button>
                    <div className="p-2 text-[11px] text-maroon/65">
                      <p className="line-clamp-1">{image.originalName}</p>
                      <p>{formatBytes(image.originalSize)} to {formatBytes(image.file.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button type="submit" variant="gold" size="lg" className="mt-6 w-full" disabled={busy || compressing}>
                <UploadCloud className="h-5 w-5" /> {busy ? "Uploading..." : "Upload to Website"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="rounded-lg border border-gold/20 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-2xl text-maroon">Remove Sold Items</h2>
                <p className="mt-1 text-sm text-maroon/60">Selected items will disappear from the website and uploaded photos will be deleted.</p>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-maroon/45" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-10" placeholder="Search items" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {filteredProducts.length === 0 ? (
                <p className="rounded-lg bg-cream p-8 text-center text-maroon/65">No active uploaded products found.</p>
              ) : filteredProducts.map((product) => {
                const selected = selectedProductIds.includes(product.id);
                return (
                  <button key={product.id} type="button" onClick={() => toggleProductSelection(product.id)} className={["flex gap-4 rounded-lg border p-3 text-left transition-colors", selected ? "border-maroon bg-maroon/10" : "border-gold/15 hover:border-gold/40"].join(" ")}>
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-cream">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-serif text-lg text-maroon">{product.name}</h3>
                        <span className="font-semibold text-maroon">{formatPrice(product.discountedPrice)}</span>
                      </div>
                      <p className="mt-1 text-sm text-maroon/60">{product.category}{product.subcategory ? " / " + product.subcategory : ""}</p>
                      <p className="mt-1 text-sm text-maroon/60">Color: {product.color}</p>
                      <p className="mt-1 text-xs text-maroon/50">Sizes: {product.sizes.join(", ")}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 rounded-lg bg-cream p-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <Label htmlFor="removePin">Confirm PIN to remove selected items</Label>
                <Input id="removePin" type="password" value={removePin} onChange={(event) => setRemovePin(event.target.value)} className="mt-1.5 bg-white" placeholder="Enter PIN again" />
                <p className="mt-2 text-xs text-maroon/55">Selected: {selectedProductIds.length}</p>
              </div>
              <Button variant="default" size="lg" onClick={handleRemove} disabled={busy || selectedProductIds.length === 0 || !removePin}>
                <Trash2 className="h-5 w-5" /> Remove Items from Website
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
