// src/components/cart/CartDrawer.tsx
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { toggleCart, removeFromCart, updateQuantity, selectCartItems, selectCartIsOpen, selectCartTotal } from '../../store/slices/cartSlice';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const isOpen = useAppSelector(selectCartIsOpen);
    const total = useAppSelector(selectCartTotal);

    const handleClose = () => {
        dispatch(toggleCart(false));
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={handleClose}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {items.length === 0 ? (
                                                            <li className="py-6 text-center text-gray-500">
                                                                Your cart is empty.
                                                            </li>
                                                        ) : (
                                                            items.map((item) => (
                                                                <li key={item.id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={item.images?.[0]?.image_url || item.image || 'https://placehold.co/100x100?text=No+Image'}
                                                                            alt={item.name}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <a href="#">{item.name}</a>
                                                                                </h3>
                                                                                <p className="ml-4">{parseFloat(item.sale_price).toFixed(2)} MAD</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{item.category.name}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                                                <button
                                                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                                                >-</button>
                                                                                <span className="px-2 text-gray-900">{item.quantity}</span>
                                                                                <button
                                                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                                                >+</button>
                                                                            </div>

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleRemove(item.id)}
                                                                                    className="font-medium text-primary hover:text-primary-hover"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>{total.toFixed(2)} MAD</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <Link
                                                    to="/checkout"
                                                    onClick={handleClose}
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-hover"
                                                >
                                                    Checkout
                                                </Link>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or{' '}
                                                    <button
                                                        type="button"
                                                        className="font-medium text-primary hover:text-primary-hover"
                                                        onClick={handleClose}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
