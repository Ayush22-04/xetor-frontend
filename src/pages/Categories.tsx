import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import categoryElectronics from "@/assets/category-electronics.jpg";
import categoryFurniture from "@/assets/category-furniture.jpg";
import categoryClothing from "@/assets/category-clothing.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categoryTools from "@/assets/category-tools.jpg";
import categoryOffice from "@/assets/category-office.jpg";
import { useEffect, useState } from "react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Cutting-edge technology products including laptops, smartphones, tablets, and accessories for modern businesses.",
    image: categoryElectronics,
    count: 156,
  },
  {
    id: 2,
    name: "Furniture",
    description: "Premium office and home furniture designed for comfort and productivity. Desks, chairs, storage, and more.",
    image: categoryFurniture,
    count: 89,
  },
  {
    id: 3,
    name: "Clothing",
    description: "Professional attire and workwear for all industries. Quality fabrics, durable construction, and modern styles.",
    image: categoryClothing,
    count: 234,
  },
  {
    id: 4,
    name: "Accessories",
    description: "Essential accessories including bags, wallets, watches, and personal items to complement your professional look.",
    image: categoryAccessories,
    count: 178,
  },
  {
    id: 5,
    name: "Tools & Equipment",
    description: "Professional-grade tools and equipment for construction, manufacturing, and maintenance operations.",
    image: categoryTools,
    count: 145,
  },
  {
    id: 6,
    name: "Office Supplies",
    description: "Everything your office needs from stationery to organizational tools. Keep your workspace running smoothly.",
    image: categoryOffice,
    count: 312,
  },
];

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  // optional item count if your API provides it later
  count?: number;
}

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/categories/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 animate-fade-in">
              Our Categories
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Browse Our Product Categories
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Discover our comprehensive range of products organized into easy-to-navigate categories.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    // src={category.image}
                    src={`${import.meta.env.VITE_API_BASE_URL}${category.image}`}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-semibold text-xl text-foreground">
                      {category.name}
                    </h3>
                    {/* <span className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground">
                      {category.count} items
                    </span> */}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center text-accent font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Browse Products</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Can't find what you're looking for?
              </h2>
              <p className="text-primary-foreground/70">
                Contact us and we'll help you source the products you need.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 hover:shadow-glow transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
