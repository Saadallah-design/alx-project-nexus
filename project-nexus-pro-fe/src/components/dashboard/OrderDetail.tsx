import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchOrderDetails, selectCurrentOrder, selectOrdersLoading, selectOrdersError, clearCurrentOrder } from '../../store/slices/orderSlice';
import { ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface OrderDetailProps {
    orderId: string;
    onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onBack }) => {
    const dispatch = useAppDispatch();
    const order = useAppSelector(selectCurrentOrder);
    const loading = useAppSelector(selectOrdersLoading);
    const error = useAppSelector(selectOrdersError);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderDetails(orderId));
        }
        return () => {
            dispatch(clearCurrentOrder());
        };
    }, [dispatch, orderId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Error loading order details: {error}</p>
                <button onClick={onBack} className="mt-4 text-primary hover:text-primary/80 underline">
                    Back to Orders
                </button>
            </div>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex items-center">
                <button onClick={onBack} className="mr-4 text-gray-400 hover:text-gray-500">
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Order Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Order #{order.id}</p>
                </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="mt-1 text-sm text-gray-900 capitalize">{order.status}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Placed On</dt>
                        <dd className="mt-1 text-sm text-gray-900">{new Date(order.created_at).toLocaleString()}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                        <dd className="mt-1 text-sm text-gray-900 font-semibold">{order.total_price} MAD</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                        <dd className="mt-1 text-sm text-gray-900">{order.payment_method || 'N/A'}</dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            {order.shipping_address}<br />
                            {order.shipping_address_line_2 && <>{order.shipping_address_line_2}<br /></>}
                            {order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}<br />
                            {order.shipping_country}
                        </dd>
                    </div>
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 mb-4">Items</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            <ul role="list" className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                                {order.items.map((item) => {
                                    const imageUrl = item.product_image;

                                    return (
                                        <li key={item.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.product_name}
                                                        className="h-10 w-10 rounded-md object-cover mr-4"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-md bg-gray-200 mr-4 flex items-center justify-center">
                                                        <ShoppingBagIcon className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                )}
                                                <span className="ml-2 flex-1 w-0 truncate">
                                                    {item.product_name} (x{item.quantity})
                                                </span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <span className="font-medium">{item.extended_price} MAD</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default OrderDetail;
