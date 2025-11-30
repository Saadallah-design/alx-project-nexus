// src/pages/CheckoutPage.tsx

import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectCurrentStep } from '../store/slices/checkoutSlice';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentDetails from '../components/checkout/PaymentDetails';
import OrderReview from '../components/checkout/OrderReview';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import OrderSummary from '../components/checkout/OrderSummary';

const CheckoutPage: React.FC = () => {
    const currentStep = useAppSelector(selectCurrentStep);

    let stepContent;

    switch (currentStep) {
        case 1:
            stepContent = <ShippingForm />;
            break;
        case 2:
            stepContent = <PaymentDetails />;
            break;
        case 3:
            stepContent = <OrderReview />;
            break;
        case 4:
            stepContent = <OrderConfirmation />;
            break;
        default:
            stepContent = <ShippingForm />;
            break;
    }

    // Show two-column layout for steps 1-3, full width for confirmation
    const isFlowPage = currentStep >= 1 && currentStep <= 3;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-secondary">
                        Checkout
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Step {currentStep} of 4
                    </p>
                </div>

                {/* Content */}
                {isFlowPage ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* LEFT COLUMN: Form */}
                        <div className="order-2 lg:order-1">
                            {stepContent}
                        </div>

                        {/* RIGHT COLUMN: Order Summary */}
                        <div className="order-1 lg:order-2">
                            <OrderSummary />
                        </div>
                    </div>
                ) : (
                    // FULL WIDTH for Confirmation Page (Step 4)
                    <div className="max-w-3xl mx-auto">
                        {stepContent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;