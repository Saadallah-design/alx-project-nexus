import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setShippingAddress, goToNextStep } from '../../store/slices/checkoutSlice';
import { selectCartItems } from '../../store/slices/cartSlice';
import type { Address } from '../../types/checkout';
import { ArrowRightIcon, ShoppingBagIcon } from '@heroicons/react/20/solid';

// Simplified form state with only required fields
const initialFormState: Partial<Address> = {
    first_name: '',
    last_name: '',
    phone_number: '',
    city: '',
    postal_code: '',
    country: 'Morocco',
};

const ShippingForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartItems = useAppSelector(selectCartItems);
    const [formData, setFormData] = useState<Partial<Address>>(initialFormState);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const isCartEmpty = cartItems.length === 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S/.test(formData.email!)) newErrors.email = 'Email is invalid';
        if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
        if (!formData.address_line_1) newErrors.address_line_1 = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.postal_code) newErrors.postal_code = 'Postal code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // If cart is empty, redirect to home
        if (isCartEmpty) {
            navigate('/');
            return;
        }

        if (validateForm()) {
            // Create full Address object with required fields
            const fullAddress: Address = {
                first_name: formData.first_name!,
                last_name: formData.last_name!,
                phone_number: formData.phone_number!,
                email: formData.email!,
                address_line_1: formData.address_line_1!,
                address_line_2: formData.address_line_2 || '', // Send empty string if null/undefined
                city: formData.city!,
                state_province: '', // Not collected in simplified form
                postal_code: formData.postal_code!,
                country: formData.country || 'Morocco',
            };

            dispatch(setShippingAddress(fullAddress));
            dispatch(goToNextStep());
        }
    };

    const renderInput = (
        label: string,
        name: keyof Address,
        type: string = 'text',
        required: boolean = true
    ) => (
        <div>
            <label htmlFor={name} className="block text-left text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                required={required}
                value={(formData[name] as string) || ''}
                onChange={handleChange}
                disabled={isCartEmpty}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-4">
                Shipping Information
            </h2>

            {isCartEmpty && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                        Your cart is empty. Please add items to continue with checkout.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput('First Name', 'first_name')}
                    {renderInput('Last Name', 'last_name')}
                </div>

                {renderInput('Email', 'email', 'email')}
                {renderInput('Phone Number', 'phone_number', 'tel')}

                {renderInput('Street Address', 'address_line_1')}
                {renderInput('Apartment, suite, etc. (optional)', 'address_line_2')}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput('City', 'city')}
                    {renderInput('Postal Code', 'postal_code')}
                </div>

                <div>
                    <label htmlFor="country" className="text-left block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={isCartEmpty}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-10 px-3 border disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="Morocco">Morocco</option>
                        <option value="USA">United States</option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                    </select>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className={`w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm transition-colors ${isCartEmpty
                            ? 'bg-secondary hover:bg-secondary/90'
                            : 'bg-primary hover:bg-primary-hover'
                            }`}
                    >
                        {isCartEmpty ? (
                            <>
                                <ShoppingBagIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                Continue Shopping
                            </>
                        ) : (
                            <>
                                Continue to Payment
                                <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ShippingForm;