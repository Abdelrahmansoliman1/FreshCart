import { getSpecificCategory } from "@/lib/servcies/category.service";
import { getProductsByBrand, getProductsByCategory } from "@/lib/servcies/product.service";
import ProductCard from "@/app/_Components/layout/Home/ProductCard/ProductCard";
import { notFound } from "next/navigation";
import { getSpecificBrand } from "@/lib/servcies/brands.service";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    
    const brandRes = await getSpecificBrand(id);
    const brand = brandRes.data;

    if (!brand) return notFound();

    
    const productsRes = await getProductsByBrand(id);
    const products = productsRes.data;

    return (
      <section className="p-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mt-4">
            {brand.name}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>

      </section>
    );
  } catch {
    return notFound();
  }
}