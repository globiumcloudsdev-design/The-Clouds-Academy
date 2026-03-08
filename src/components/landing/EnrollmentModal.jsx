'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const INSTITUTE_TYPES = [
  { id: '1', name: 'School' },
  { id: '2', name: 'College' },
  { id: '3', name: 'Academy' },
  { id: '4', name: 'Coaching Center' },
  { id: '5', name: 'University' },
  { id: '6', name: 'Training Institute' },
];

const SUBSCRIPTION_STATUS = [
  { id: 'trial', name: 'Trial' },
  { id: 'active', name: 'Active' },
];

export default function EnrollmentModal({
  isOpen,
  onClose,
  selectedPlan,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const form = useForm({
    defaultValues: {
      institute_name: '',
      institute_code: '',
      institute_email: '',
      institute_contact: '',
      institute_type_id: '',
      institute_address: '',
      institute_city: '',
      institute_country: 'Pakistan',
      institute_zip_code: '',
      principal_name: '',
      principal_email: '',
      principal_phone: '',
      subscription_status: 'trial',
      trial_days: '30',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Add plan selection to the data
      const enrollmentData = {
        ...data,
        subscription_plan_id: selectedPlan?.id,
        institute_type_id: parseInt(data.institute_type_id),
        trial_days: parseInt(data.trial_days),
      };

      // TODO: Replace with actual API call
      console.log('Enrollment Data:', enrollmentData);

      // Simulate API call
      // const response = await fetch('/api/institutes/enroll', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(enrollmentData),
      // });
      
      // if (!response.ok) throw new Error('Enrollment failed');

      // const result = await response.json();
      // console.log('Enrollment successful:', result);
      
      // Show success message and close modal
      alert(`Welcome! Your enrollment for ${selectedPlan?.name} plan is submitted. We'll contact you shortly.`);
      form.reset();
      onClose();
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit enrollment. Please try again.');
      console.error('Enrollment error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Enroll for {selectedPlan?.name} Plan
          </DialogTitle>
          <DialogDescription>
            Fill in your institute details to get started with The Clouds Academy
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {submitError}
              </div>
            )}

            {/* Institute Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Institute Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="institute_name"
                  rules={{
                    required: 'Institute name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., ABC High School"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institute_code"
                  rules={{
                    required: 'Institute code is required',
                    pattern: { value: /^[A-Z0-9]+$/, message: 'Code must be uppercase alphanumeric' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Code *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., ABC001"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institute_email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="info@school.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institute_contact"
                  rules={{
                    required: 'Contact number is required',
                    pattern: {
                      value: /^[0-9\s\-\+\(\)]{7,}$/,
                      message: 'Invalid phone number',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+92-300-1234567"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institute_type_id"
                  rules={{ required: 'Institute type is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select institute type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {INSTITUTE_TYPES.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institute_country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address */}
              <FormField
                control={form.control}
                name="institute_address"
                rules={{ required: 'Address is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Street address and location"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="institute_city"
                  rules={{ required: 'City is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="Karachi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institute_zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="75000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Principal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Principal/Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="principal_name"
                  rules={{
                    required: 'Principal name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="principal_phone"
                  rules={{
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9\s\-\+\(\)]{7,}$/,
                      message: 'Invalid phone number',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+92-300-1234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="principal_email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="principal@school.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trial_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trial Days</FormLabel>
                      <FormControl>
                        <Input disabled type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Subscription Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Subscription Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subscription_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUBSCRIPTION_STATUS.map((status) => (
                            <SelectItem key={status.id} value={status.id}>
                              {status.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700">
                  <strong>Plan Selected:</strong> {selectedPlan?.name}
                  {selectedPlan?.priceMonthly && (
                    <div className="text-slate-600 mt-1">
                      PKR {selectedPlan.priceMonthly.toLocaleString()}/month
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 justify-end pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-indigo-600 to-violet-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  'Complete Enrollment'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
