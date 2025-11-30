// src/components/checkout/OrderSummary.tsx
import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

const OrderSummary: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const cartTotal = useAppSelector(selectCartTotal);

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold text-secondary mb-6 border-b pb-4">
                Order Summary
            </h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                                {/* Product Image */}
                                <img
                                    src={item.images?.[0]?.image_url || item.image || 'https://placehold.co/80x80?text=No+Image'}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                                />

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm text-left ont-medium text-gray-900 truncate">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-left text-gray-500 mt-1">
                                        {parseFloat(item.sale_price).toFixed(2)} MAD
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-medium text-gray-900 w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Price and Delete */}
                                <div className="flex flex-col items-end justify-between">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {(parseFloat(item.sale_price) * item.quantity).toFixed(2)} MAD
                                    </p>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-sm font-medium text-gray-900">
                                {cartTotal.toFixed(2)} MAD
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Shipping</span>
                            <span className="text-sm font-medium text-gray-900">
                                Calculated at next step
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-lg font-bold text-primary">
                                {cartTotal.toFixed(2)} MAD
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderSummary;
