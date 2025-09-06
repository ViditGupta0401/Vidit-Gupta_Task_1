import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Get in</span>{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our courses? Need guidance on your learning path? 
              We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Let's Start a Conversation
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Whether you're a beginner looking to start your tech journey or an 
                  experienced developer wanting to level up, we're here to guide you.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">hello@edutech.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      123 Tech Street, Innovation City, IC 12345
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Response Time */}
              <div className="bg-gradient-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">
                  Quick Response Time
                </h3>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 hours. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gradient-card p-8 rounded-xl border border-border shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-background/50 border-border"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-background/50 border-border"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-background/50 border-border resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;