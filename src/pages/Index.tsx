import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Headphones, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/HeroSlider";
import categoryElectronics from "@/assets/category-electronics.jpg";
import categoryFurniture from "@/assets/category-furniture.jpg";
import categoryClothing from "@/assets/category-clothing.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const featuredCategories = [
  { id: 1, name: "Electronics", image: categoryElectronics, count: 156 },
  { id: 2, name: "Furniture", image: categoryFurniture, count: 89 },
  { id: 3, name: "Clothing", image: categoryClothing, count: 234 },
  { id: 4, name: "Accessories", image: categoryAccessories, count: 178 },
];
const stats = [
  { value: "3000+", label: "Happy Clients" },
  { value: "500+", label: "Our Products" },
  { value: "50+", label: "Success Brands" },
];

const features = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "All products undergo rigorous quality checks before shipping.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day shipping on orders placed before 2 PM.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is here to help you anytime.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    content: "xetor has been our go-to supplier for three years. Exceptional quality and service!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Procurement Manager",
    content: "The product range is impressive, and their pricing is very competitive.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Store Manager",
    content: "Reliable delivery and excellent customer support. Highly recommended!",
    rating: 5,
  },
];

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <Layout>
      {/* Hero Section with Slider */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0">
          <HeroSlider />
        </div>

        {/* Content Overlay */}
        <div className="container relative z-10 px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent font-medium text-sm mb-6 animate-fade-in">
              Premium Quality Products
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.1s" }}>
              Your Trusted Partner for{" "}
              <span className="text-accent">Business Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-fade-in drop-shadow-md" style={{ animationDelay: "0.2s" }}>
              Discover our extensive range of premium products designed to meet all your business needs. Quality, reliability, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/products">
                  View Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of product categories designed to meet your every need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${category.image}`}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading font-semibold text-xl text-primary-foreground mb-1">
                    {category.name}
                  </h3>
                  {/* <p className="text-primary-foreground/70 text-sm">
                    {category.count} Products
                  </p> */}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/categories">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-20 md:py-28 bg-secondary">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-heading font-bold text-5xl md:text-6xl text-accent mb-3">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it — hear from businesses that trust us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Contact us today for a personalized quote and discover how we can support your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Get a Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
      {/* Contact Form Section */}
      <section className="py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="container px-4">
          <div className="max-w-xl mx-auto bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-10">
            <ContactForm variant="dark" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
