// src/components/common/SidebarFilter.tsx
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCategory, clearFilters } from '../../store/slices/filterSlice';
import type { RootState } from '../../store/store';

type Props = {
    categories: string[];
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
};

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

export default function SidebarFilter({ categories, mobileFiltersOpen, setMobileFiltersOpen }: Props) {
    const dispatch = useAppDispatch();
    const { category } = useAppSelector((state: RootState) => state.filters);

    const handleCategoryChange = (categoryName: string | null) => {
        dispatch(setCategory(categoryName));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    // Build filter sections from categories
    const filterSections = [
        {
            id: 'category',
            name: 'Category',
            options: categories.map((cat) => ({
                value: cat,
                label: cat,
                checked: category === cat,
            })),
        },
    ];

    return (
        <>
            {/* Mobile filter dialog */}
            <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
                    >
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-secondary">Filters</h2>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(false)}
                                className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                            <h3 className="sr-only">Categories</h3>
                            <ul role="list" className="px-2 py-3 font-medium text-secondary">
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryChange(null)}
                                        className={classNames(
                                            !category ? 'text-primary font-bold' : 'text-secondary',
                                            'block px-2 py-3 w-full text-left'
                                        )}
                                    >
                                        All Products
                                    </button>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <button
                                            type="button"
                                            onClick={() => handleCategoryChange(cat)}
                                            className={classNames(
                                                category === cat ? 'text-primary font-bold' : 'text-secondary',
                                                'block px-2 py-3 w-full text-left'
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {filterSections.map((section) => (
                                <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-secondary">{section.name}</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-6">
                                            {section.options.map((option, optionIdx) => (
                                                <div key={option.value} className="flex gap-3">
                                                    <div className="flex h-5 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                value={option.value}
                                                                checked={option.checked}
                                                                onChange={() => handleCategoryChange(option.value)}
                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-checked:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <label
                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                        className="min-w-0 flex-1 text-gray-500"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            ))}

                            <div className="px-4 py-6">
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Desktop Filters */}
            <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-secondary">
                    <li>
                        <button
                            type="button"
                            onClick={() => handleCategoryChange(null)}
                            className={classNames(
                                !category ? 'text-primary font-bold' : 'text-secondary hover:text-primary',
                                'w-full text-left'
                            )}
                        >
                            All Products
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat}>
                            <button
                                type="button"
                                onClick={() => handleCategoryChange(cat)}
                                className={classNames(
                                    category === cat ? 'text-primary font-bold' : 'text-secondary hover:text-primary',
                                    'w-full text-left'
                                )}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>

                {filterSections.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-secondary">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                </span>
                            </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex gap-3">
                                        <div className="flex h-5 shrink-0 items-center">
                                            <div className="group grid size-4 grid-cols-1">
                                                <input
                                                    value={option.value}
                                                    checked={option.checked}
                                                    onChange={() => handleCategoryChange(option.value)}
                                                    id={`filter-${section.id}-${optionIdx}`}
                                                    name={`${section.id}[]`}
                                                    type="checkbox"
                                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                />
                                                <svg
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                >
                                                    <path
                                                        d="M3 8L6 11L11 3.5"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="opacity-0 group-has-checked:opacity-100"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                ))}

                <div className="py-6">
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50"
                    >
                        Clear All Filters
                    </button>
                </div>
            </form>
        </>
    );
}
