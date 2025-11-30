// src/components/checkout/OrderConfirmation.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { resetCheckout } from '../../store/slices/checkoutSlice';

const OrderConfirmation: React.FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [showAccountPrompt, setShowAccountPrompt] = useState(false);

    const isGuest = !localStorage.getItem('access_token');
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const handleContinueShopping = () => {
        dispatch(resetCheckout());
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError(null);

        if (!email) {
            setEmailError('Please enter your email address');
            return;
        }

        if (!/\S+@\S+\.\S/.test(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        // TODO: Send email to backend for order tracking
        console.log('Email submitted for order tracking:', email);
        setEmailSubmitted(true);
        setShowAccountPrompt(true);
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
                Order Number: <span className="font-medium text-gray-900">{orderId}</span>
            </p>

            {/* Email Collection for Guest Users */}
            {isGuest && !emailSubmitted && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        📧 Track Your Order
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Enter your email to receive order updates and tracking information.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(null);
                                }}
                                placeholder="your.email@example.com"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border"
                            />
                            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover transition-colors"
                        >
                            Get Order Updates
                        </button>
                    </form>
                </div>
            )}

            {/* Account Creation Prompt */}
            {isGuest && showAccountPrompt && (
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 mb-8 text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        🎉 Create an Account
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Save your order history, track shipments, and enjoy faster checkout next time!
                    </p>
                    <div className="flex gap-3">
                        <Link
                            to={`/register?email=${encodeURIComponent(email)}`}
                            className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-hover transition-colors"
                        >
                            Create Account
                        </Link>
                        <button
                            onClick={() => setShowAccountPrompt(false)}
                            className="flex-1 flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            )}

            {/* Email Submitted Confirmation */}
            {emailSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                    <p className="text-sm text-green-800">
                        ✓ Order updates will be sent to <span className="font-medium">{email}</span>
                    </p>
                </div>
            )}

            <div className="bg-gray-50 p-6 rounded-md mb-8 text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-3">What's Next?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        {emailSubmitted
                            ? 'You will receive an email confirmation shortly'
                            : 'Your order is being processed'}
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        We'll notify you when your order ships
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        {isGuest
                            ? 'Create an account to track your order anytime'
                            : 'Track your order status in your account'}
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
