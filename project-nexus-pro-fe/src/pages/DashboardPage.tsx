// src/pages/DashboardPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { logoutUser, selectUser } from '../store/slices/authSlice';
import { UserCircleIcon, ShoppingBagIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Welcome back, {user?.first_name || 'User'}!
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <ArrowRightOnRectangleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Profile Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <UserCircleIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                            </div>
                            <div className="text-left ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Profile Information</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            {user?.first_name} {user?.last_name}
                                        </div>
                                        <div className="text-sm text-gray-500">{user?.email}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:text-primary-hover">
                                Edit profile
                            </a>
                        </div>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <ShoppingBagIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                            </div>
                            <div className="text-left ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Recent Orders</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            View your order history
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:text-primary-hover">
                                View orders
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
