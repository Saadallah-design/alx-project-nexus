import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProducts } from '../../store/slices/productsSlice';

export default function ProductList() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading products...</div>
            </div>
        );
    }

    // error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    // success state
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <p className="text-xl font-bold text-blue-600">
                                    ${product.sale_price}
                                </p>
                                {/* if product has discount show the price before discount */}
                                {product.discount_percentage !== "0.00" && (
                                    <p className="text-sm text-gray-500 line-through">
                                        ${product.base_price}
                                    </p>
                                )}
                            </div>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                {product.category.name}
                            </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                            {product.is_available ? (
                                <span className="text-green-600">In Stock</span>
                            ) : (
                                <span className="text-red-600">Out of Stock</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>


                {/* if no items / products found show this */}
            {items.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No products found.
                </div>
            )}
        </div>
    );
}
