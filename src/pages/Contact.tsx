import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const contactInfo = [
	{
		icon: MapPin,
		title: "Visit Us",
		details: ["123 Business Street, Suite 100", "New York, NY 10001"],
	},
	{
		icon: Phone,
		title: "Call Us",
		details: ["+1 (234) 567-890", "+1 (234) 567-891"],
	},
	{
		icon: Mail,
		title: "Email Us",
		details: ["info@bizcraft.com", "support@bizcraft.com"],
	},
	{
		icon: Clock,
		title: "Business Hours",
		details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
	},
];

const Contact = () => {
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		full_name: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			setIsSubmitted(true);
			toast({
				title: "Message Sent!",
				description: "We'll get back to you within 24 hours.",
			});

			// Reset form after showing success
			setTimeout(() => {
				setFormData({ full_name: "", email: "", phone: "", message: "" });
				setIsSubmitted(false);
			}, 3000);
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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<Layout>
			{/* Hero Section */}
			<section className="py-20 md:py-28 bg-secondary">
				<div className="container px-4">
					<div className="max-w-3xl mx-auto text-center">
						<span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 animate-fade-in">
							Contact Us
						</span>
						<h1
							className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in"
							style={{ animationDelay: "0.1s" }}
						>
							Get in Touch
						</h1>
						<p
							className="text-lg text-muted-foreground animate-fade-in"
							style={{ animationDelay: "0.2s" }}
						>
							Having questions or need a quote? We&apos;d love to hear from you.
							Our team is here to help.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Form & Info */}
			<section className="py-20 md:py-28 bg-background">
				<div className="container px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<div className="animate-fade-in">
							<div className="bg-card rounded-2xl shadow-card p-8 md:p-10">
								<h2 className="font-heading text-2xl font-bold text-foreground mb-6">
									Send us a Message
								</h2>

								{isSubmitted ? (
									<div className="text-center py-12">
										<CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
										<h3 className="font-heading text-xl font-semibold text-foreground mb-2">
											Thank You!
										</h3>
										<p className="text-muted-foreground">
											Your message has been sent. We&apos;ll get back to you soon.
										</p>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label
													htmlFor="name"
													className="block text-sm font-medium text-foreground mb-2"
												>
													Full Name *
												</label>
												<Input
													id="name"
													name="full_name"
													type="text"
													required
													value={formData.full_name}
													onChange={handleChange}
													placeholder="John Doe"
													className="h-12"
												/>
											</div>
											<div>
												<label
													htmlFor="email"
													className="block text-sm font-medium text-foreground mb-2"
												>
													Email Address *
												</label>
												<Input
													id="email"
													name="email"
													type="email"
													required
													value={formData.email}
													onChange={handleChange}
													placeholder="john@example.com"
													className="h-12"
												/>
											</div>
										</div>

										<div>
											<label
												htmlFor="phone"
												className="block text-sm font-medium text-foreground mb-2"
											>
												Phone Number
											</label>
											<Input
												id="phone"
												name="phone"
												type="tel"
												value={formData.phone}
												onChange={handleChange}
												placeholder="+1 (234) 567-890"
												className="h-12"
											/>
										</div>

										<div>
											<label
												htmlFor="message"
												className="block text-sm font-medium text-foreground mb-2"
											>
												Message *
											</label>
											<Textarea
												id="message"
												name="message"
												required
												value={formData.message}
												onChange={handleChange}
												placeholder="Tell us about your requirements..."
												rows={5}
												className="resize-none"
											/>
										</div>

										<Button
											type="submit"
											variant="accent"
											size="lg"
											className="w-full"
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<span className="flex items-center gap-2">
													<span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
													Sending...
												</span>
											) : (
												<span className="flex items-center gap-2">
													<Send className="w-4 h-4" />
													Send Message
												</span>
											)}
										</Button>
									</form>
								)}
							</div>
						</div>

						{/* Contact Info */}
						<div className="animate-slide-in-right">
							<h2 className="font-heading text-2xl font-bold text-foreground mb-6">
								Contact Information
							</h2>
							<p className="text-muted-foreground mb-8">
								Reach out to us through any of the following channels. We&apos;re
								available during business hours and typically respond within 24
								hours.
							</p>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{contactInfo.map((info, index) => (
									<div
										key={info.title}
										className="p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
										style={{ animationDelay: `${index * 0.1}s` }}
									>
										<div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
											<info.icon className="w-6 h-6 text-accent" />
										</div>
										<h3 className="font-heading font-semibold text-foreground mb-2">
											{info.title}
										</h3>
										{info.details.map((detail, i) => (
											<p key={i} className="text-sm text-muted-foreground">
												{detail}
											</p>
										))}
									</div>
								))}
							</div>

							{/* Map Placeholder */}
							<div className="mt-8 rounded-2xl overflow-hidden shadow-card">
								{/* <div className="aspect-[16/9] bg-secondary flex items-center justify-center">
									<div className="text-center p-8">
										<MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
										<p className="text-muted-foreground text-sm">
											Interactive map will be displayed here
										</p>
										<p className="text-xs text-muted-foreground/70 mt-2">
											123 Business Street, New York, NY 10001
										</p>
									</div>
								</div> */}
								<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2875.167794806331!2d70.79976257529138!3d22.258162879716913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDE1JzI5LjQiTiA3MMKwNDgnMDguNCJF!5e1!3m2!1sen!2sin!4v1768055849678!5m2!1sen!2sin" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			{/* <section className="py-20 md:py-28 bg-secondary">
				<div className="container px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-heading text-3xl font-bold text-foreground mb-4">
							Frequently Asked Questions
						</h2>
						<p className="text-muted-foreground mb-12">
							Quick answers to common questions about our services.
						</p>

						<div className="space-y-4 text-left">
							{[
								{
									q: "What are your minimum order quantities?",
									a: "Minimum order quantities vary by product category. For most items, we have no minimum for sample orders. For bulk orders, please contact us for specific requirements.",
								},
								{
									q: "Do you offer international shipping?",
									a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Contact us for a quote.",
								},
								{
									q: "What payment methods do you accept?",
									a: "We accept all major credit cards, bank transfers, and can arrange payment terms for established business accounts.",
								},
								{
									q: "Can I get a custom quote for my order?",
									a: "Absolutely! Fill out the contact form above with your requirements and we'll provide a personalized quote within 24 hours.",
								},
							].map((faq, index) => (
								<div
									key={index}
									className="p-6 rounded-xl bg-card shadow-card"
								>
									<h3 className="font-heading font-semibold text-foreground mb-2">
										{faq.q}
									</h3>
									<p className="text-muted-foreground text-sm">
										{faq.a}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section> */}
		</Layout>
	);
};

export default Contact;
