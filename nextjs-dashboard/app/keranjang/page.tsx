'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
    const [quantity, setQuantity] = useState(1);

    const productPrice = 800000;
    const formattedPrice = new Intl.NumberFormat('id-ID').format(productPrice);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header/Navbar */}
            <header className="py-4 px-6 flex justify-between items-center">
                <Link href="/">
                    <div className="flex items-center">
                        <Image src="/images/logo0.png" alt="Ce4L Logo" width={80} height={30} />
                    </div>
                </Link>
                <div className="flex items-center space-x-4">
                    <button className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                    <button className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    </button>
                </div>
            </header>

            <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
                {/* Cart Item */}
                <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between mb-12">
                    <div className="flex items-center">
                        <div className="w-24 h-24 relative mr-4">
                            <Image
                                src="/images/toko1.png"
                                alt="TDR-3000"
                                width={96}
                                height={96}
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-bold">TDR-3000</h2>
                    </div>

                    <div className="flex items-center">
                        <div className="mr-2 text-right">
                            <p className="text-sm text-gray-600">Qty</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={decreaseQuantity}
                                className="bg-white px-4 py-2 text-xl font-medium border border-gray-300"
                            >
                                -
                            </button>
                            <div className="bg-gray-200 px-6 py-2 text-xl min-w-[60px] text-center">
                                {quantity}
                            </div>
                            <button
                                onClick={increaseQuantity}
                                className="bg-white px-4 py-2 text-xl font-medium border border-gray-300"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Total Section */}
                <div className="border-t border-b border-gray-300 py-4 mb-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Total</h3>
                        <p className="text-lg font-medium">Rp {formattedPrice},00</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">

                    <Link href="/toko">
                        <button className="mt-6 w-full bg-blue-600 text-white py-2 px-1 rounded hover:bg-blue-700 transition">
                            Lanjutkan Belanja
                        </button>
                    </Link>
                    <Link href="/keranjang">
                    <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                        Checkout
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}