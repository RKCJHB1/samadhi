import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/shared/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Heart, CreditCard } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const donationSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().min(10, { message: "Please enter a valid mobile number." }),
  amount: z.number().min(20, { message: "Minimum donation amount is R20." }),
  purpose: z.string().min(1, { message: "Please select a purpose for your donation." })
});

type DonationFormValues = z.infer<typeof donationSchema>;

const DonatePage = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [100, 250, 500, 1000];

  const donationPurposes = [
    "New Ashram Project",
    "General Donation",
    "Nutrition Programme",
    "Women Empowerment",
    "Children's Value Education",
    "Temple Maintenance"
  ];

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      amount: 100,
      purpose: "New Ashram Project"
    }
  });

  const handleDonate = (values: DonationFormValues) => {
    setIsProcessing(true);

    // Read PayFast credentials from environment
    const merchantId = import.meta.env.VITE_PAYFAST_MERCHANT_ID as string | undefined;
    const merchantKey = import.meta.env.VITE_PAYFAST_MERCHANT_KEY as string | undefined;

    if (!merchantId || !merchantKey || merchantKey === 'YOUR_ACTUAL_MERCHANT_KEY_HERE') {
      toast({
        title: 'Payment configuration error',
        description: 'PayFast merchant details are not configured. Please set VITE_PAYFAST_MERCHANT_ID and VITE_PAYFAST_MERCHANT_KEY.',
        variant: 'destructive',
      });
      setIsProcessing(false);
      return;
    }

    // Prepare PayFast form fields per Custom Integration spec
    const safeItemName = `Donation - ${values.purpose}`.slice(0, 100);

    const paymentData: Record<string, string> = {
      merchant_id: String(merchantId),
      merchant_key: String(merchantKey),
      amount: values.amount.toFixed(2),
      item_name: safeItemName,
      item_description: `Contribution from ${values.firstName} ${values.lastName} towards Ramakrishna Centre of South Africa Phoenix Johannesburg Sub Centre.`,
      return_url: `${window.location.origin}/donate/thank-you`,
      cancel_url: `${window.location.origin}/donate`,
      notify_url: `${window.location.origin}/api/payfast-notification`, // TODO: Implement IPN endpoint server-side
      name_first: values.firstName,
      name_last: values.lastName,
      email_address: values.email,
      cell_number: values.mobile,
      // Optional extras you may add:
      // m_payment_id: crypto.randomUUID?.() ?? Date.now().toString(),
      // email_confirmation: '1',
      // confirmation_address: values.email,
    };

    // Create a form and submit it to PayFast
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://payment.payfast.io/eng/process'; // Live PayFast endpoint

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <PageLayout>
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-12 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <img
              src="/pics/belurmath.jpg"
              alt="Belur Math"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-heading font-bold">Support Our Mission</h1>
            </div>
            <div className="absolute bottom-0 right-0 p-4 text-white text-sm italic">
              Belur Math, Headquarters of the Ramakrishna Math and Mission
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
                <h2 className="text-2xl font-heading font-semibold mb-4">Why Donate?</h2>
                <p className="mb-4">Your donations support our various spiritual and humanitarian services including:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Spiritual gatherings and educational programs</li>
                  <li>Nutrition Programme for underprivileged communities</li>
                  <li>Women Empowerment Programme</li>
                  <li>Children's value education classes</li>
                  <li>New Ashram Project development</li>
                </ul>
              </Card>

              <div className="p-4 bg-gradient-to-br from-spiritual-50 to-white border-l-4 border-spiritual-500 rounded pop-shadow-card">
                <p className="italic">"It is a privilege to serve mankind, for this is the worship of God. God is here, in all these human souls. He is the soul of man." <span className="whitespace-nowrap">- Swami Vivekananda</span></p>
              </div>

              <div className="p-5 border border-indian-saffron/30 rounded-lg shadow-sm bg-gradient-to-r from-indian-cream to-white pop-shadow-card">
                <h4 className="text-xl font-heading font-semibold mb-3">Bank Transfer</h4>
                <p className="mb-3 text-sm">
                  You can make a direct deposit or EFT to our building fund account:
                </p>
                <div className="bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg text-sm border border-indian-saffron/20">
                  <div className="grid grid-cols-2 gap-2">
                    <p><strong>Acc Name:</strong> The Ramakrishna Centre of SA, JHB</p>
                    <p><strong>Acc Type:</strong> Business Account</p>
                    <p><strong>Bank:</strong> First National Bank</p>
                    <p><strong>Branch Code:</strong> 200607</p>
                    <p><strong>Branch:</strong> 4 Merchant Place 390</p>
                    <p><strong>Acc Number:</strong> 62858238035</p>
                    <p><strong>Swift Code:</strong> FIRNZAJJ</p>
                    <p><strong>Reference:</strong> Your name</p>
                  </div>
                </div>
                <div className="mt-3 text-sm bg-gradient-to-br from-indian-cream to-white p-3 rounded-lg border border-indian-saffron/20">
                  <p><strong>Note:</strong> Please email proof of deposit to: <span className="font-medium">johannesburg@ramakrishna-phoenix.org.za</span></p>
                </div>
              </div>

            </div>

            <div className="space-y-6">
              <Card className="p-6 shadow-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron pop-shadow-card">
              <h2 className="text-2xl font-heading font-semibold mb-4 flex items-center">
                <Heart className="mr-2 text-red-500" />
                Make a Donation
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Support our mission with a secure online donation.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleDonate)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose of Donation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {donationPurposes.map((purpose) => (
                              <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>Donation Amount (ZAR)</FormLabel>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {presetAmounts.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => onChange(preset)}
                              className={`py-2 px-4 border rounded-md ${
                                value === preset
                                  ? 'bg-spiritual-100 border-spiritual-500 text-spiritual-700'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}

                            >
                              R{preset}
                            </button>
                          ))}
                        </div>
                        <FormLabel className="mt-4">Or enter a custom amount</FormLabel>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">R</span>
                          </div>
                          <Input
                            type="number"
                            min="20"
                            value={value}
                            onChange={(e) => onChange(Number(e.target.value))}
                            className="pl-8"

                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-spiritual-600 hover:bg-spiritual-700 text-white py-3 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>{isProcessing ? 'Processing...' : `Donate`}</span>
                  </Button>
                </form>
              </Form>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment processing provided by PayFast.
                <br />
                The Ramakrishna Centre is a registered Non-Profit Organization.
              </p>
            </Card>

            <div className="p-5 border border-indian-saffron/30 rounded-lg shadow-sm bg-gradient-to-r from-indian-cream to-white pop-shadow-card mt-6">
              <h4 className="text-xl font-heading font-semibold mb-3">Tax Benefits</h4>
              <p className="mb-3">
                The Ramakrishna Centre of South Africa is a registered non-profit organization. Certain local donations to the Centre may qualify for Section 18A taxation benefits from SARS.
              </p>
              <p className="text-sm">
                Please consult a tax advisor to understand your tax implications.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DonatePage;
