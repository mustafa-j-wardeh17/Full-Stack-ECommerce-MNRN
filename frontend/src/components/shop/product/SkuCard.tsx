'use client';
import { HttpResponse, SkuDetail } from "@/util/types";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface SkuCardsProps {
    skus: SkuDetail[] | null;
}

const SkuCards = ({ skus }: SkuCardsProps) => {
    const [selectedSku, setSelectedSku] = useState<SkuDetail | null>(skus ? skus[0] : null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const onSelect = (sku: SkuDetail) => {
        setSelectedSku(sku);
        setQuantity(1); // Reset quantity on SKU change
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleCheckout = async () => {
        if (!selectedSku) {
            alert("Please select a SKU to proceed with checkout.");
            return;
        }

        const checkoutDetails = [
            {
                skuPriceId: selectedSku.stripePriceId,
                quantity,
                skuId: selectedSku._id,
            },
        ];

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/orders/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ checkoutDetails }),
                credentials: 'include'
            });

            if (response.ok) {
                const data: HttpResponse = await response.json();
                router.push(data.result);
            } else {
                const errorData = await response.json();
                alert(`Checkout failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("An error occurred during checkout. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!skus || skus.length === 0) {
        return <p className="text-gray-500">No SKUs available.</p>;
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">
                    Total Price:{' '}
                    <span>
                        {selectedSku && selectedSku.price
                            ? (selectedSku.price * quantity).toFixed(2) + ' $'
                            : "No prices available"}
                    </span>
                </h2>
                <p className="text-xs text-gray-500">
                    Selected Plan:{' '}
                    <span className="text-sm font-bold">
                        {selectedSku && selectedSku.skuName
                            ? selectedSku.skuName
                            : "No plans available"}
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skus.map((sku) => (
                    <div
                        key={sku.stripePriceId}
                        onClick={() => onSelect(sku)}
                        className={`cursor-pointer border rounded-md shadow-sm p-3 flex flex-col items-center text-center gap-1 transition-all duration-300 
                            ${selectedSku?.stripePriceId === sku.stripePriceId
                                ? "bg-primary  text-secondary shadow-md"
                                : "bg-primary-foreground border-primary text-primary hover:bg-primary/10 hover:border-primary/50 hover:text-primary/80"
                            }`}
                    >
                        <h4 className="font-medium text-md">{sku.skuName}</h4>
                        <p className="text-base font-bold">${sku.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">
                            {sku.lifetime ? "Lifetime Access" : `${sku.validity} days`}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex mt-6 items-center justify-between sm:gap-6 gap-2">
                {/* Quantity Controls */}
                <div className="border border-gray-300 rounded-lg p-3 flex gap-3 items-center">
                    <button
                        onClick={decreaseQuantity}
                        className="text-primary/70 hover:text-primary transition"
                        disabled={loading}
                    >
                        <FiMinus size={20} />
                    </button>
                    <p className="font-bold">{quantity}</p>
                    <button
                        onClick={increaseQuantity}
                        className="text-primary/70 hover:text-primary transition"
                        disabled={loading}
                    >
                        <FiPlus size={20} />
                    </button>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    className="flex-1 bg-primary text-secondary py-3 rounded-lg hover:bg-primary/80 transition duration-150"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Checkout"}
                </button>

                {/* Wishlist Button */}
                <div className="text-right">
                    <button
                        className="text-primary/60 border border-primary/90 hover:border-primary hover:text-primary p-2 flex items-center justify-center rounded-lg transition duration-150"
                        disabled={loading}
                    >
                        <CiHeart size={30} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default SkuCards;
