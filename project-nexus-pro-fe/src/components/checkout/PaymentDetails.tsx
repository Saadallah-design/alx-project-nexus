// src/components/checkout/PaymentDetails.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setPaymentMethod, setShippingRate, goToNextStep, setCurrentStep } from '../../store/slices/checkoutSlice';
import type { ShippingRate } from '../../types/checkout';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';

// Mock shipping rates - in a real app, these would be fetched from the backend
const mockShippingRates: ShippingRate[] = [
    {
        id: 'standard',
        carrier_name: 'Amana Express',
        price: '50.00',
        delivery_estimate: '3-5 business days',
    },
    {
        id: 'express',
        carrier_name: 'Amana Express',
        price: '100.00',
        delivery_estimate: '1-2 business days',
    },
];

const PaymentDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const [selectedRate, setSelectedRate] = useState<string>('standard');
    const [paymentMethod, setPaymentMethodLocal] = useState<'COD' | 'Card'>('COD');

    const handleContinue = () => {
        const rate = mockShippingRates.find(r => r.id === selectedRate);
        if (rate) {
            dispatch(setShippingRate(rate));
        }
        dispatch(setPaymentMethod(paymentMethod));
        dispatch(goToNextStep());
    };

    const handleBack = () => {
        dispatch(setCurrentStep(1));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-4">
                2. Shipping Method & Payment
            </h2>

            {/* Shipping Method Selection */}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Select Shipping Method</h3>
                <div className="space-y-4">
                    {mockShippingRates.map((rate) => (
                        <label
                            key={rate.id}
                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selectedRate === rate.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="shipping"
                                    value={rate.id}
                                    checked={selectedRate === rate.id}
                                    onChange={(e) => setSelectedRate(e.target.value)}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{rate.carrier_name}</p>
                                    <p className="text-sm text-gray-500">{rate.delivery_estimate}</p>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{rate.price} MAD</p>
                        </label>
                    ))}
                </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-4">
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            value="COD"
                            checked={paymentMethod === 'COD'}
                            onChange={() => setPaymentMethodLocal('COD')}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Cash on Delivery</p>
                            <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                    </label>

                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'Card' ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            value="Card"
                            checked={paymentMethod === 'Card'}
                            onChange={() => setPaymentMethodLocal('Card')}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Credit/Debit Card</p>
                            <p className="text-sm text-gray-500">Secure payment via card</p>
                        </div>
                    </label>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
                <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleContinue}
                    className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-hover transition-colors"
                >
                    Review Order
                    <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default PaymentDetails;
