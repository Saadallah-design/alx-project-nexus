import { useEffect, useState, useRef, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProducts, loadMoreProducts, selectHasMore } from '../../store/slices/productsSlice';
import type { RootState } from '../../store/store';
import SidebarFilter from '../common/SidebarFilter';
import { FunnelIcon } from '@heroicons/react/20/solid';

import ProductCard from '../common/ProductCard';

export default function ProductList() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state: RootState) => state.products);
    const hasMore = useAppSelector(selectHasMore);
    const filters = useAppSelector((state: RootState) => state.filters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Ref for the intersection observer target
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Derive unique categories from products
    const categories = Array.from(new Set(items.map((p) => p.category.name)));

    // Apply filters
    const filteredItems = items.filter((product) => {
        // Category filter
        if (filters.category && product.category.name !== filters.category) {
            return false;
        }
        // Price range filter (sale_price is a string)
        const price = parseFloat(product.sale_price);
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
            return false;
        }
        // Search filter
        if (filters.search) {
            const query = filters.search.toLowerCase();
            if (!product.name.toLowerCase().includes(query)) {
                return false;
            }
        }
        return true;
    });

    // Infinite scroll callback
    const handleLoadMore = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(loadMoreProducts());
        }
    }, [dispatch, loading, hasMore]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    handleLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading, handleLoadMore]);

    // Initial loading state
    if (loading && items.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-primary">Loading products...</div>
            </div>
        );
    }

    // error state
    if (error && items.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-12 pb-6">
                        <h1 id="products" className="text-4xl font-bold tracking-tight text-secondary">Our Collection</h1>

                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden flex items-center gap-2"
                            >
                                <span className="text-sm font-medium text-gray-700">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <SidebarFilter
                                categories={categories}
                                mobileFiltersOpen={mobileFiltersOpen}
                                setMobileFiltersOpen={setMobileFiltersOpen}
                            />

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                                    {filteredItems.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {filteredItems.length === 0 && !loading && (
                                    <div className="text-center text-gray-500 mt-8">No products found.</div>
                                )}

                                {/* Loading indicator for infinite scroll */}
                                {loading && items.length > 0 && (
                                    <div className="text-center text-primary mt-8">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <p className="mt-2">Loading more products...</p>
                                    </div>
                                )}

                                {/* Intersection observer target */}
                                <div ref={observerTarget} className="h-10" />

                                {/* End of results message */}
                                {!hasMore && items.length > 0 && (
                                    <div className="text-center text-gray-500 mt-8 mb-8">
                                        <p className="text-sm">You've reached the end of our collection</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
