// src/components/checkout/OrderReview.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCartItems, selectCartTotal, clearCart } from '../../store/slices/cartSlice';
import { selectCheckoutData, setCurrentStep, goToNextStep, setCheckoutStatus, setCheckoutError } from '../../store/slices/checkoutSlice';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { checkoutApi, type CheckoutPayload } from '../../api/checkoutApi';

const OrderReview: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const cartTotal = useAppSelector(selectCartTotal);
    const checkoutData = useAppSelector(selectCheckoutData);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const shippingCost = parseFloat(checkoutData.selectedShippingRate?.price || '0');
    const total = cartTotal + shippingCost;

    // Sync local cart with backend on mount
    React.useEffect(() => {
        const syncCart = async () => {
            if (cartItems.length === 0) return;

            try {
                // Check if backend has items
                // We import cartApi dynamically to avoid circular dependencies if any
                const { cartApi } = await import('../../api/cartApi');

                try {
                    const backendCart = await cartApi.getCart();
                    if (backendCart.items.length === 0) {
                        console.log('Syncing local cart to backend...');
                        for (const item of cartItems) {
                            await cartApi.addToCart(item.id, item.quantity);
                        }
                    }
                } catch (error) {
                    // If 404 or other error, try to create cart by adding items
                    console.log('Cart not found, creating new cart from local items...');
                    for (const item of cartItems) {
                        await cartApi.addToCart(item.id, item.quantity);
                    }
                }
            } catch (err) {
                console.error('Failed to sync cart:', err);
            }
        };

        syncCart();
    }, [cartItems]); // Re-run if cartItems change, though mainly for initial load

    const handlePlaceOrder = async () => {
        dispatch(setCheckoutStatus('submitting'));
        setErrorMessage(null);

        try {
            // Transform frontend Address to backend CheckoutPayload
            const checkoutPayload: CheckoutPayload = {
                first_name: checkoutData.shippingAddress?.first_name,
                last_name: checkoutData.shippingAddress?.last_name,
                phone_number: checkoutData.shippingAddress?.phone_number,
                email: checkoutData.shippingAddress?.email,
                shipping_address: checkoutData.shippingAddress?.address_line_1 || '',
                shipping_address_line_2: checkoutData.shippingAddress?.address_line_2 || '',
                shipping_city: checkoutData.shippingAddress?.city || '',
                shipping_state: checkoutData.shippingAddress?.state_province,
                shipping_postal_code: checkoutData.shippingAddress?.postal_code || '',
                shipping_country: checkoutData.shippingAddress?.country,
            };

            // Check if user is authenticated
            const token = localStorage.getItem('access_token');
            const isGuest = !token;

            // Call appropriate API endpoint
            let response;
            if (isGuest) {
                response = await checkoutApi.createGuestOrder(checkoutPayload);
            } else {
                response = await checkoutApi.createOrder(checkoutPayload);
            }

            console.log('Order created:', response);

            // Clear cart and move to confirmation
            dispatch(clearCart());
            dispatch(setCheckoutStatus('succeeded'));
            dispatch(goToNextStep());
        } catch (error) {
            console.error('Checkout error:', error);
            const errorMsg = error instanceof Error ? error.message : 'Failed to place order. Please try again.';
            setErrorMessage(errorMsg);
            dispatch(setCheckoutError(errorMsg));
            dispatch(setCheckoutStatus('failed'));
        }
    };

    const handleBack = () => {
        dispatch(setCurrentStep(2));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-4">
                3. Review Your Order
            </h2>

            {/* Shipping Address */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Address</h3>
                {checkoutData.shippingAddress && (
                    <div className="bg-gray-50 p-4 text-left rounded-md text-sm text-gray-700">
                        <p className="font-medium">{checkoutData.shippingAddress.first_name} {checkoutData.shippingAddress.last_name}</p>
                        <p>{checkoutData.shippingAddress.address_line_1}</p>
                        {checkoutData.shippingAddress.address_line_2 && <p>{checkoutData.shippingAddress.address_line_2}</p>}
                        <p>{checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.state_province} {checkoutData.shippingAddress.postal_code}</p>
                        <p>{checkoutData.shippingAddress.country}</p>
                        <p className="mt-2">{checkoutData.shippingAddress.email}</p>
                        <p>{checkoutData.shippingAddress.phone_number}</p>
                    </div>
                )}
            </div>

            {/* Shipping Method */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Method</h3>
                {checkoutData.selectedShippingRate && (
                    <div className="bg-gray-50 text-left p-4 rounded-md text-sm text-gray-700">
                        <p className="font-medium">{checkoutData.selectedShippingRate.carrier_name}</p>
                        <p>{checkoutData.selectedShippingRate.delivery_estimate}</p>
                        <p className="mt-1 font-medium">{checkoutData.selectedShippingRate.price} MAD</p>
                    </div>
                )}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
                <div className="bg-gray-50 text-left p-4 rounded-md text-sm text-gray-700">
                    <p className="font-medium">{checkoutData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
                <div className="bg-gray-50 text-left rounded-md divide-y divide-gray-200">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center p-4">
                            <img
                                src={item.images?.[0]?.image_url || item.image || 'https://placehold.co/100x100?text=No+Image'}
                                alt={item.name}
                                className="h-16 w-16 rounded object-cover"
                            />
                            <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                                {(parseFloat(item.sale_price) * item.quantity).toFixed(2)} MAD
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6 mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium text-gray-900">{cartTotal.toFixed(2)} MAD</p>
                </div>
                <div className="flex justify-between text-sm mb-2">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium text-gray-900">{shippingCost.toFixed(2)} MAD</p>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
                    <p className="text-gray-900">Total</p>
                    <p className="text-primary">{total.toFixed(2)} MAD</p>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
            )}

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
                    onClick={handlePlaceOrder}
                    className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-hover transition-colors"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}
export default OrderReview;