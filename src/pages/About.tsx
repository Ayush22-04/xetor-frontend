import { Link } from "react-router-dom";
import { Target, Eye, Heart, Award, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every product we deliver and every interaction we have.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Honesty and transparency form the foundation of our business relationships.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Our customers' success is our success. We go above and beyond to exceed expectations.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "We're committed to sustainable practices that protect our planet for future generations.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "50+", label: "Countries Served" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 animate-fade-in">
              About Us
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Building Trust, Delivering Excellence
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              For over 15 years, xetor has been the trusted partner for businesses seeking premium quality products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2008, xetor started as a small family business with a simple mission: to provide businesses with high-quality products at fair prices. What began in a modest warehouse has grown into a trusted supplier serving thousands of businesses worldwide.
                </p>
                <p>
                  Our founder, David Mitchell, recognized the gap in the market for a supplier that truly understood the needs of small and medium-sized businesses. With this vision, xetor was born — a company dedicated to personalized service and unwavering quality.
                </p>
                <p>
                  Today, we continue to uphold the same values that started our journey. Our team of dedicated professionals works tirelessly to source the best products, ensure timely delivery, and provide support that goes beyond the transaction.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                <div className="w-full h-full rounded-xl bg-card shadow-card flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Target className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      To empower businesses with premium products and exceptional service, enabling their growth and success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-card shadow-card animate-fade-in">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  To be the most trusted partner for businesses worldwide, providing premium quality products with exceptional service that exceeds expectations.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-card shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground">
                  To revolutionize the B2B supply industry by setting new standards in quality, sustainability, and customer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose BizCraft?
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                We understand that choosing the right supplier is crucial for your business success. That's why we go above and beyond to ensure you receive the best products, competitive pricing, and outstanding support.
              </p>
              <p>
                With our extensive product catalog, streamlined ordering process, and dedicated account managers, we make procurement simple and efficient. Join thousands of satisfied businesses that trust xetor for their supply needs.
              </p>
            </div>
            <Button asChild variant="accent" size="lg">
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
