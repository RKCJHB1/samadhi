import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import SectionHeader from '../../components/shared/SectionHeader';
import { MapPin, Phone, Mail, Clock, User, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Define the contact form schema with Zod
const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  honeypot: z.string().max(0, { message: "Bot detected" }), // Honeypot field should be empty
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// reCAPTCHA removed as online form submission is disabled

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  // reCAPTCHA script loading removed as online form submission is disabled

  // Initialize form with react-hook-form and zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (values: ContactFormValues) => {
    // Check for honeypot (if filled, it's likely a bot)
    if (values.honeypot) {
      console.log("Bot detected");
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      return;
    }

    // Rate limiting - prevent more than 3 submissions in a short period
    if (submissionCount >= 3) {
      toast({
        title: "Too many attempts",
        description: "Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionCount(prev => prev + 1);

    try {
      // Backend removed - Contact form now shows success message without actual submission
      console.log('Contact form data (backend removed):', values);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset the form
      form.reset();

      toast({
        title: "Thank you for your message!",
        description: "We appreciate your interest. Please contact us directly at viprananda@rkmm.org for immediate assistance.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Form submission unavailable",
        description: "Please contact us directly at viprananda@rkmm.org",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PageLayout title="Contact Us">
      <div className="flex items-center justify-center py-12 bg-gradient-to-br from-indian-cream to-white">
        <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center">
          <h1 className="text-3xl font-heading font-bold mb-4 text-black">Contact Us</h1>
          <p className="text-gray-700">
            Reach out to the Ramakrishna Centre of South Africa, Johannesburg
          </p>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Contact Information */}
            <div className="animate-fade-in mx-auto">
              <SectionHeader
                title="Get in Touch"
                subtitle="We'd love to hear from you. Contact us with any questions or enquiries."
                alignment="center"
              />

              <div className="space-y-5 mt-8 bg-gradient-to-br from-indian-cream to-white border border-indian-saffron p-5 rounded-lg pop-shadow-card">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-spiritual-500 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 mt-0">
                      <a
                        href="mailto:johannesburg@ramakrishna-phoenix.org.za"
                        className="text-spiritual-500 hover:underline transition-colors"
                      >
                        johannesburg@ramakrishna-phoenix.org.za
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-spiritual-500 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600 mt-0">Postnet Suite 204, Private Bag X3, Northriding, 2162</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indian-cream to-white border border-indian-saffron/30 p-5 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Persons in Charge</h3>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <User className="h-5 w-5 text-spiritual-500 mt-1" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium mb-1">President</p>
                        <p className="text-gray-600 mt-0">Revered Swami Saradaprabhananda</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <User className="h-5 w-5 text-spiritual-500 mt-1" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium mb-1">Swami in Charge</p>
                        <p className="text-gray-600 mt-0">Revered Swami Viprananda</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <User className="h-5 w-5 text-spiritual-500 mt-1" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium mb-1">Chairperson</p>
                        <p className="text-gray-600 mt-0">
                          Mr. Naresh Ramatar <a href="tel:+27829236537" className="text-spiritual-500 hover:underline transition-colors">(+27) 82 923 6537</a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <User className="h-5 w-5 text-spiritual-500 mt-1" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium mb-1">Secretary</p>
                        <p className="text-gray-600 mt-0">
                          Mr. Pranil Bhodraj <a href="tel:+27720521284" className="text-spiritual-500 hover:underline transition-colors">(+27) 72 052 1284</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Map */}
            <div className="col-span-1 lg:col-span-2 mt-16">
              <div className="rounded-lg overflow-hidden border border-indian-saffron pop-shadow-card h-96 animate-fade-in">
                <iframe
                  title="Ramakrishna Centre Location"
                  className="w-full h-full"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114299.42936254135!2d28.039802299999998!3d-26.172761200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1655114783429!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
