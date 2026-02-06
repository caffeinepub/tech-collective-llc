import { useState } from 'react';
import InquiryForm from '../forms/InquiryForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="w-full py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Get in <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to get started? Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-display">Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">info@techcollective.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Serving clients nationwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardContent className="pt-12 pb-12 text-center space-y-4">
                    <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
                    <h3 className="font-display text-2xl font-bold">Thank You!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Your inquiry has been received. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-primary hover:underline font-medium"
                    >
                      Send another message
                    </button>
                  </CardContent>
                </Card>
              ) : (
                <InquiryForm onSuccess={() => setSubmitted(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

