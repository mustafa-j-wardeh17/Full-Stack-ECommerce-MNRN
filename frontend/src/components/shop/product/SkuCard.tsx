'use client';
import { PostCartItemResponse, SkuDetail } from "@/util/types";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "@/context";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

interface SkuCardsProps {
    skus: SkuDetail[] | null;
    productName: string;
    productImage: string;
    hasLicenses: boolean;
}

const SkuCards = ({ hasLicenses, skus, productName, productImage }: SkuCardsProps) => {
    const [selectedSku, setSelectedSku] = useState<SkuDetail | null>(skus ? skus[0] : null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [isInWishlist, setIsInWishlist] = useState<boolean>(false); // State to track wishlist status
    const router = useRouter();
    const params = useParams();
    const { user, setUser } = useUserContext();

    useEffect(() => {
        if (user && selectedSku) {
            // Check if the selected SKU is in the user's wishlist
            const isWishlistItem = user?.wishlist?.some(
                (item) => item.productId === params.productId as string && item.skuId === selectedSku._id
            );
            setIsInWishlist(isWishlistItem!); // Set the button color based on wishlist status
        }
    }, [selectedSku, user, setUser, params.productId]);

    const onSelect = (sku: SkuDetail) => {
        setSelectedSku(sku);
        setQuantity(1); // Reset quantity when SKU changes
    };

    const increaseQuantity = () => {
        if (selectedSku && quantity < selectedSku.remainingStock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCart = async () => {
        if (!selectedSku) {
            toast.error("Please select a SKU to proceed.");
            return;
        }

        const addToCartDetails = {
            userId: user?.id,
            productName,
            productImage,
            productId: params.productId as string,
            skuKey: selectedSku.skuName,
            skuPriceId: selectedSku.stripePriceId,
            skuPrice: selectedSku.price,
            quantity,
            skuId: selectedSku._id,
        };

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addToCartDetails),
                credentials: "include",
            });

            if (response.ok) {
                const data: PostCartItemResponse = await response.json();
                toast.success(data.message);
            } else {
                const errorData = await response.json();
                toast.error(`Add to cart failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Add to cart Error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddRemoveWishlist = async () => {
        if (!selectedSku) {
            toast.error("Please select a SKU to proceed.");
            return;
        }

        const wishlistItem = {
            productId: params.productId as string,
            skuId: selectedSku._id,
        };

        const isWishlistItem = user?.wishlist?.some(
            (item) => item.productId === wishlistItem.productId && item.skuId === wishlistItem.skuId
        );


        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/wishlist`,
                {
                    method: isWishlistItem ? "DELETE" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(wishlistItem),
                    credentials: "include",
                }
            );

            if (response.ok) {
                const updatedWishlist = isWishlistItem
                    ? user!.wishlist?.filter(
                        (item) =>
                            item.productId !== wishlistItem.productId ||
                            item.skuId !== wishlistItem.skuId
                    )
                    : [...(user!.wishlist || []), wishlistItem];

                setUser({ ...user, wishlist: updatedWishlist });
                setIsInWishlist(!isWishlistItem); // Toggle wishlist status
                toast.success(
                    isWishlistItem
                        ? "Removed from wishlist successfully."
                        : "Added to wishlist successfully."
                );
            } else {
                const errorData = await response.json();
                toast.error(
                    `Failed to update wishlist: ${errorData.message || "Unknown error"}`
                );
            }
        } catch (error) {
            console.error("Wishlist Update Error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    if (!skus || skus.length === 0) {
        return <p className="text-gray-500">No SKUs available.</p>;
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="md:text-lg sm:text-md text-sm ">
                    Total Price:{" "}
                    <span className="font-bold">
                        {selectedSku && selectedSku.price
                            ? (selectedSku.price * quantity).toFixed(2) + " $"
                            : "No prices available"}
                    </span>
                </h2>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skus.map((sku) => (
                    <div
                        key={sku.stripePriceId}
                        onClick={() => sku.remainingStock > 0 && onSelect(sku)}
                        className={`cursor-pointer border rounded-md shadow-sm p-3 flex flex-col items-center justify-center text-center gap-1 transition-all duration-300 
                            ${selectedSku?.stripePriceId === sku.stripePriceId
                                ? "bg-primary text-secondary shadow-md"
                                : sku.remainingStock > 0
                                    ? "bg-primary-foreground border-primary text-primary hover:bg-primary/10 hover:border-primary/50 hover:text-primary/80"
                                    : "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <h4 className="md:text-md sm:text-sm text-xs">{sku.skuName}</h4>
                        {hasLicenses && (
                            <p className="text-xs text-gray-500">
                                {sku.lifetime ? "Lifetime Access" : `${sku.validity} days`}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <p className="text-sm mt-4">Remaining in stock: <span className="font-extrabold">{selectedSku?.remainingStock}</span></p>

            <div className="flex mt-6 items-center justify-between sm:gap-6 gap-2">
                {/* Quantity Controls */}
                <div className="border md:text-lg sm:text-md text-sm border-gray-300 rounded-lg p-3 flex gap-3 items-center">
                    <button
                        onClick={decreaseQuantity}
                        className="text-primary/70 hover:text-primary transition"
                        disabled={loading}
                    >
                        <FiMinus className="lg:text-2xl md:text-xl sm:text-lg text-md" />
                    </button>
                    <p className="font-bold">{quantity}</p>
                    <button
                        onClick={increaseQuantity}
                        className="text-primary/70 hover:text-primary transition"
                        disabled={loading || (selectedSku! && quantity >= selectedSku.remainingStock)}
                    >
                        <FiPlus className="lg:text-2xl md:text-xl sm:text-lg text-md" />
                    </button>
                </div>

                {/* Add To Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-secondary py-3 rounded-lg hover:bg-primary/80 transition duration-150"
                    disabled={loading || (selectedSku! && selectedSku.remainingStock === 0)}
                >
                    {loading ? "Processing..." : "Add To Cart"}
                </button>

                {/* Wishlist Button */}
                <div className="text-right">
                    <button
                        onClick={handleAddRemoveWishlist}
                        className={`text-white border-[2px] rounded-lg p-2  flex items-center justify-center transition duration-150
                            ${isInWishlist
                                ? "border-primary  "
                                : "border-primary/60 hover:border-primary "
                            }`}
                        disabled={loading}
                    >
                        {
                            isInWishlist ? (
                                <>
                                    <IoMdHeart size={30} className="text-primary" />
                                </>
                            ) : (
                                <>
                                    <IoMdHeartEmpty size={30} className="text-primary/60 hover:text-primary" />
                                </>
                            )
                        }
                    </button>
                </div>
            </div>
        </>
    );
};

export default SkuCards;
