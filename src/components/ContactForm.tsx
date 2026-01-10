import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  variant?: "light" | "dark";
}

const ContactForm = ({ variant = "light" }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.full_name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === "dark";
  const inputClasses = isDark
    ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
    : "";
  const labelClasses = isDark ? "text-primary-foreground" : "text-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className={`font-heading text-2xl font-bold mb-6 ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
        Send us a Message
      </h3>
      
      <div>
        <label className={`block text-sm font-medium mb-2 ${labelClasses}`}>
          Full Name <span className="text-accent">*</span>
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className={`h-12 ${inputClasses}`}
          required
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${labelClasses}`}>
          Email Address <span className="text-accent">*</span>
        </label>
        <Input
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`h-12 ${inputClasses}`}
          required
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${labelClasses}`}>
          Phone Number
        </label>
        <Input
          type="tel"
          placeholder="+1 (234) 567-890"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`h-12 ${inputClasses}`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${labelClasses}`}>
          Message <span className="text-accent">*</span>
        </label>
        <Textarea
          placeholder="Tell us about your requirements..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`min-h-[120px] resize-none ${inputClasses}`}
          required
        />
      </div>

      <Button
        type="submit"
        variant={isDark ? "hero" : "accent"}
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
};

export default ContactForm;