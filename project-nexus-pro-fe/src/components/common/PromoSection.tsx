// src/components/common/PromoSection.tsx
import promo1 from "../../assets/images/promo-01.jpg";
import promo2 from "../../assets/images/promo-02.jpg";
import promo3 from "../../assets/images/promo-03.jpg";
import promo4 from "../../assets/images/promo-04.jpg";

export default function PromoSection() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

                    {/* Text Content */}
                    <div className="flex flex-col justify-center text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
                            Discover Moroccan Elegance
                        </h1>
                        <p className="mt-6 text-lg text-secondary/70 leading-relaxed">
                            Experience the timeless beauty of traditional Moroccan craftsmanship.
                            Our handcrafted Jellabas and artisanal pieces blend heritage with contemporary style.
                        </p>
                        <div className="mt-10">
                            <a
                                href="#products"
                                className="inline-block rounded-md border border-transparent bg-primary px-8 py-3 text-center font-medium text-white hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl"
                            >
                                Shop Collection
                            </a>
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        {/* Column 1 */}
                        <div className="space-y-4 sm:space-y-6">
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={promo1}
                                    alt="Moroccan traditional clothing"
                                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={promo2}
                                    alt="Moroccan traditional clothing"
                                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={promo3}
                                    alt="Moroccan traditional clothing"
                                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="overflow-hidden rounded-lg">
                                <img
                                    src={promo4}
                                    alt="Moroccan traditional clothing"
                                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}