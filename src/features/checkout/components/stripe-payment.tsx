'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { createStripePaymentIntent, completeStripeOrder } from '../routes/actions';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = stripePublishableKey && stripePublishableKey !== 'pk_test_placeholder'
    ? loadStripe(stripePublishableKey)
    : null;

function StripeForm({ orderCode, onCancel }: { orderCode: string; onCancel?: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setSubmitting(true);
        setErrorMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.href,
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message || 'Payment confirmation failed');
                setSubmitting(false);
                return;
            }

            if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
                await completeStripeOrder(orderCode);
            } else {
                setErrorMessage('Payment status: ' + (paymentIntent?.status || 'incomplete'));
                setSubmitting(false);
            }
        } catch (err: any) {
            if (err?.message?.includes('NEXT_REDIRECT')) {
                throw err;
            }
            setErrorMessage(err?.message || 'An error occurred during payment');
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            {errorMessage && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
                    {errorMessage}
                </div>
            )}
            <div className="flex gap-3 pt-2">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
                        Back
                    </Button>
                )}
                <Button type="submit" disabled={!stripe || submitting} className="flex-1">
                    {submitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing Payment...
                        </>
                    ) : (
                        'Confirm & Pay with Stripe'
                    )}
                </Button>
            </div>
        </form>
    );
}

export function StripePayment({ orderCode, onCancel }: { orderCode: string; onCancel?: () => void }) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        async function init() {
            try {
                const secret = await createStripePaymentIntent();
                if (isMounted) {
                    setClientSecret(secret);
                    setLoading(false);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err?.message || 'Failed to initialize Stripe Payment Intent');
                    setLoading(false);
                }
            }
        }
        init();
        return () => {
            isMounted = false;
        };
    }, []);

    if (!stripePromise) {
        return (
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm">
                <p className="font-semibold mb-1">Stripe Publishable Key Required</p>
                <p>
                    Please configure your <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> in{' '}
                    <code>storefront/.env.local</code> to complete live card payments.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 text-muted-foreground gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Initializing secure Stripe payment...</span>
            </div>
        );
    }

    if (error || !clientSecret) {
        return (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
                <p className="font-semibold mb-1">Could not start Stripe payment</p>
                <p>{error || 'No client secret returned from server'}</p>
            </div>
        );
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: 'stripe',
                },
            }}
        >
            <StripeForm orderCode={orderCode} onCancel={onCancel} />
        </Elements>
    );
}
