import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, X, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category: number;
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const productIdParam = searchParams.get("id");
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = (import.meta.env.VITE_API_BASE_URL as string) || "";
    return `${base.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/`);
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData: Category[] = await categoriesResponse.json();
        const activeCategories = categoriesData.filter(cat => cat.is_active);
        setCategories(activeCategories);

        // Set initial category from URL param
        if (categoryParam) {
          const matchedCategory = activeCategories.find(
            c => c.name.toLowerCase() === categoryParam.toLowerCase()
          );
          if (matchedCategory) {
            setSelectedCategory(matchedCategory.name);
          }
        }
        setErrorCategories(null);
      } catch (err) {
        setErrorCategories(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoadingCategories(false);
      }

      try {
        // Fetch products
        const productsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/`);
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData: Product[] = await productsResponse.json();
        setProducts(productsData.filter(p => p.is_active));
        setErrorProducts(null);
      } catch (err) {
        setErrorProducts(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchData();
  }, [categoryParam]);

  const getCategoryName = (categoryId: number) => {
    return categories.find(c => c.id === categoryId)?.name || "Unknown";
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || getCategoryName(product.category) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 animate-fade-in">
              Our Products
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Explore Our Products
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Find the perfect products for your business from our extensive catalog.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {isLoadingCategories ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading categories...</span>
                </div>
              ) : errorCategories ? (
                <div className="text-sm text-destructive">Error loading categories</div>
              ) : (
                <>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === "All"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === category.name
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoadingProducts ? (
              <div className="col-span-full text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p>Loading products...</p>
              </div>
            ) : errorProducts ? (
              <div className="col-span-full text-center text-destructive py-12">
                {errorProducts}
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-accent uppercase tracking-wide">
                      {getCategoryName(product.category)}
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-foreground mt-1 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">
                        ${parseFloat(product.price).toLocaleString()}
                      </span>
                      <span className="text-sm text-accent font-medium">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredProducts.length === 0 && !isLoadingProducts && !errorProducts && (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative bg-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-muted transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={getImageUrl(selectedProduct.image)}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <span className="text-sm font-medium text-accent uppercase tracking-wide">
                {getCategoryName(selectedProduct.category)}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
                {selectedProduct.name}
              </h2>
              <p className="text-muted-foreground mb-6">
                {selectedProduct.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-3xl font-bold text-foreground">
                  ${parseFloat(selectedProduct.price).toLocaleString()}
                </span>
                <Button asChild variant="accent" size="lg">
                  <Link to="/contact">
                    Request Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Need a custom order?
              </h2>
              <p className="text-primary-foreground/70">
                Contact us for bulk pricing and custom product requirements.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 hover:shadow-glow transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
