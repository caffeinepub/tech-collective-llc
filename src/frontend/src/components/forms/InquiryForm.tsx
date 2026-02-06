import { useState } from 'react';
import { useSubmitInquiry } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface InquiryFormProps {
  onSuccess: () => void;
}

const services = [
  'Notarial Services',
  'Phone Configuration & Setup',
  'Website Creation',
  'Tech Consultations',
];

export default function InquiryForm({ onSuccess }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [serviceInterested, setServiceInterested] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: submitInquiry, isPending } = useSubmitInquiry();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    } else if (contactInfo.includes('@')) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactInfo)) {
        newErrors.contactInfo = 'Please enter a valid email address';
      }
    }

    if (!serviceInterested) {
      newErrors.serviceInterested = 'Please select a service';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    submitInquiry(
      {
        name: name.trim(),
        contactInfo: contactInfo.trim(),
        serviceInterested,
        message: message.trim(),
      },
      {
        onSuccess: () => {
          setName('');
          setContactInfo('');
          setServiceInterested('');
          setMessage('');
          setErrors({});
          onSuccess();
        },
        onError: (error) => {
          setErrors({ submit: error instanceof Error ? error.message : 'Failed to submit inquiry' });
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-display">Send Us a Message</CardTitle>
        <CardDescription>Fill out the form below and we'll be in touch soon</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo">Email or Phone *</Label>
            <Input
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="your.email@example.com or (555) 123-4567"
              className={errors.contactInfo ? 'border-destructive' : ''}
            />
            {errors.contactInfo && <p className="text-sm text-destructive">{errors.contactInfo}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service Interested In *</Label>
            <Select value={serviceInterested} onValueChange={setServiceInterested}>
              <SelectTrigger className={errors.serviceInterested ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceInterested && (
              <p className="text-sm text-destructive">{errors.serviceInterested}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your needs..."
              rows={5}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          {errors.submit && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

