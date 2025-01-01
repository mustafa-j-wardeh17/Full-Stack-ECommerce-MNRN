'use client'
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserContext } from "@/context";

interface WishlistItem {
  productName: string;
  productImage: string;
  productId: string;
  skuKey: string;
  skuId: string;
  skuPrice: number;
  skuPriceId: string;
  quantity: number;
}

interface WishlistTableProps {
  wishlist: WishlistItem[];

}

const WishlistTable: React.FC<WishlistTableProps> = ({
  wishlist,
}) => {

  const { user, setUser } = useUserContext()
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<
    { productId: string; skuId: string }[]
  >([]);

  const handleCheckboxChange = (item: { productId: string; skuId: string }) => {
    setSelectedItems((prev) =>
      prev.some(
        (selected) =>
          selected.productId === item.productId && selected.skuId === item.skuId
      )
        ? prev.filter(
          (selected) =>
            selected.productId !== item.productId ||
            selected.skuId !== item.skuId
        )
        : [...prev, item]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === wishlist.length ? [] : wishlist.map(({ productId, skuId }) => ({ productId, skuId }))
    );
  };

  const onRemoveSingle = async (productId: string, skuId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/wishlist?productId=${productId}&skuId=${skuId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to remove wishlist item: ${response.statusText}`);
      }
      toast.success('Wishlist item removed successfully');
      router.refresh()
    } catch (error) {
      toast.error('Failed to remove wishlist item');
    }
  };

  const onAddToCart = (productId: string, skuId: string) => {
    console.log("Add to cart:", productId, skuId);
  };

  const onRemoveSelected = async (selectedItems: { productId: string; skuId: string }[]) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/wishlist/selected-items`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedItems }),
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error(`Failed to remove wishlist item: ${response.statusText}`);
      }
      setUser({
        ...user,
        wishlist: user?.wishlist
          ? user.wishlist.filter(item => !selectedItems.some(selected => selected.productId === item.productId && selected.skuId === item.skuId))
          : []
      })
      toast.success('Wishlist item removed successfully');
      router.refresh()
    } catch (error) {
      toast.error('Failed to remove wishlist item');
    }
  };

  const onAddSelectedToCart = (selectedItems: { productId: string; skuId: string }[]) => {
    console.log("Add selected to cart:", selectedItems);
  };

  return (
    <div>
      <Table>
        <TableCaption>Your wishlist items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >
              <input
                type="checkbox"
                checked={selectedItems.length === wishlist.length}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>SKU Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlist.map((item) => (
            <TableRow key={`${item.productId}-${item.skuId}`}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedItems.some(
                    (selected) =>
                      selected.productId === item.productId &&
                      selected.skuId === item.skuId
                  )}
                  onChange={() =>
                    handleCheckboxChange({
                      productId: item.productId,
                      skuId: item.skuId,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.skuKey}</TableCell>
              <TableCell>${item.skuPrice.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => onAddToCart(item.productId, item.skuId)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => onRemoveSingle(item.productId, item.skuId)}
                  >
                    Remove
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-between items-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  disabled={selectedItems.length === 0}
                  onClick={() => onAddSelectedToCart(selectedItems)}
                >
                  Add Selected to Cart
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  disabled={selectedItems.length === 0}
                  onClick={() => onRemoveSelected(selectedItems)}
                >
                  Remove Selected
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default WishlistTable;
