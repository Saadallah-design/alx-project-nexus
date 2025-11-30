// src/components/checkout/OrderConfirmation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetCheckout } from '../../store/slices/checkoutSlice';

const OrderConfirmation: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleContinueShopping = () => {
        dispatch(resetCheckout());
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
            </div>

            <h2 className="text-3xl font-bold text-secondary mb-4">
                Order Placed Successfully!
            </h2>

            <p className="text-gray-600 mb-2">
                Thank you for your order. We've received your order and will process it shortly.
            </p>

            <p className="text-sm text-gray-500 mb-8">
                Order Number: <span className="font-medium text-gray-900">ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </p>

            <div className="bg-gray-50 p-6 rounded-md mb-8 text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-3">What's Next?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        You will receive an email confirmation shortly
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        We'll notify you when your order ships
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        Track your order status in your account
                    </li>
                </ul>
            </div>

            <div className="flex gap-4 justify-center">
                <Link
                    to="/"
                    onClick={handleContinueShopping}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-hover transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
