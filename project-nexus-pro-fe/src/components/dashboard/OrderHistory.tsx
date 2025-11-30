import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchUserOrders, selectOrders, selectOrdersLoading, selectOrdersError } from '../../store/slices/orderSlice';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface OrderHistoryProps {
    onViewDetails: (orderId: string) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ onViewDetails }) => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const loading = useAppSelector(selectOrdersLoading);
    const error = useAppSelector(selectOrdersError);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

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
                <p className="text-red-500">Error loading orders: {error}</p>
                <button
                    onClick={() => dispatch(fetchUserOrders())}
                    className="mt-4 text-primary hover:text-primary/80 underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {orders.map((order) => {
                    const firstItem = order.items[0];
                    const imageUrl = firstItem?.product_image;

                    return (
                        <li key={order.id}>
                            <div className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt="Order thumbnail"
                                                    className="h-12 w-12 rounded-md object-cover mr-4"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-md bg-gray-200 mr-4 flex items-center justify-center">
                                                    <ShoppingBagIcon className="h-6 w-6 text-gray-400" />
                                                </div>
                                            )}
                                            <p className="truncate text-sm font-medium text-primary">
                                                Order #{order.id.slice(0, 8)}
                                            </p>
                                        </div>
                                        <div className="ml-2 flex flex-shrink-0">
                                            <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                                                ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                Total: {order.total_price} MAD
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>
                                                Placed on <time dateTime={order.created_at}>{new Date(order.created_at).toLocaleDateString()}</time>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => onViewDetails(order.id)}
                                            className="text-sm font-medium text-primary hover:text-primary/80"
                                        >
                                            View Details &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default OrderHistory;
