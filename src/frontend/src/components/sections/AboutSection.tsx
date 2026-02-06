import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Professional Excellence',
    description: 'Committed to delivering the highest quality service in every interaction.',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'Your success is our priority. We tailor our services to meet your unique needs.',
  },
  {
    icon: Zap,
    title: 'Efficient Solutions',
    description: 'Fast, reliable, and effective technology solutions that save you time.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tech Collective LLC is your trusted technology partner, dedicated to providing professional services 
              that simplify your digital life. With expertise spanning notarial services, device configuration, 
              web development, and strategic consulting, we're here to help you navigate the tech landscape with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-8 pb-6 space-y-4">
                    <div className="mx-auto p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 w-fit">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="font-display text-2xl font-bold">Why Choose Tech Collective?</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We combine technical expertise with a personal touch, ensuring that every client receives 
                customized solutions that truly work. Whether you need a quick phone setup or a comprehensive 
                technology strategy, we're here to help you succeed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

