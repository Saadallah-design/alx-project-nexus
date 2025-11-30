import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectUser, logoutUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import OrderHistory from '../components/dashboard/OrderHistory';
import OrderDetail from '../components/dashboard/OrderDetail';
import ProfileEdit from '../components/dashboard/ProfileEdit';

const DashboardPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'profile'>('overview');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    const handleViewOrder = (orderId: string) => {
        setSelectedOrderId(orderId);
    };

    const handleBackToOrders = () => {
        setSelectedOrderId(null);
    };

    const renderContent = () => {
        if (selectedOrderId) {
            return <OrderDetail orderId={selectedOrderId} onBack={handleBackToOrders} />;
        }

        switch (activeTab) {
            case 'orders':
                return <OrderHistory onViewDetails={handleViewOrder} />;
            case 'profile':
                return <ProfileEdit />;
            case 'overview':
            default:
                return (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard Overview</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Welcome back, {user?.first_name}!</p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.first_name} {user?.last_name}</dd>
                                </div>
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className="text-sm font-medium text-primary hover:text-primary/80"
                            >
                                View Recent Orders &rarr;
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
                    <nav className="space-y-1">
                        <button
                            onClick={() => { setActiveTab('overview'); setSelectedOrderId(null); }}
                            className={`${activeTab === 'overview' && !selectedOrderId
                                ? 'bg-gray-50 text-primary hover:bg-white'
                                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
                        >
                            <UserCircleIcon
                                className={`${activeTab === 'overview' && !selectedOrderId ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                                    } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                                aria-hidden="true"
                            />
                            <span className="truncate">Overview</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('orders'); setSelectedOrderId(null); }}
                            className={`${activeTab === 'orders' || selectedOrderId
                                ? 'bg-gray-50 text-primary hover:bg-white'
                                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
                        >
                            <ShoppingBagIcon
                                className={`${activeTab === 'orders' || selectedOrderId ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                                    } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                                aria-hidden="true"
                            />
                            <span className="truncate">Orders</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab('profile'); setSelectedOrderId(null); }}
                            className={`${activeTab === 'profile'
                                ? 'bg-gray-50 text-primary hover:bg-white'
                                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
                        >
                            <UserCircleIcon
                                className={`${activeTab === 'profile' ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                                    } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                                aria-hidden="true"
                            />
                            <span className="truncate">Profile Settings</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full"
                        >
                            <ArrowRightOnRectangleIcon
                                className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                                aria-hidden="true"
                            />
                            <span className="truncate">Sign out</span>
                        </button>
                    </nav>
                </aside>

                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
