import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Smartphone, Globe, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: FileCheck,
    title: 'Notarial Services',
    description: 'Professional notary services for all your document authentication needs. Fast, reliable, and legally compliant.',
  },
  {
    icon: Smartphone,
    title: 'Phone Configuration & Setup',
    description: 'Expert assistance with phone setup, data transfer, and configuration. We make technology simple and accessible.',
  },
  {
    icon: Globe,
    title: 'Website Creation',
    description: 'Custom website design and development tailored to your business needs. Modern, responsive, and user-friendly.',
  },
  {
    icon: Lightbulb,
    title: 'Tech Consultations',
    description: 'Strategic technology consulting to help your business thrive. From planning to implementation, we guide you every step.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions designed to meet your personal and business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 w-fit group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-display">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

