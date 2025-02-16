import { useCartStore } from "@/store";
import useStore from "@/store/use-store";

export const useCartTotal = () => {
  const checkoutTotal = useStore(useCartStore, (state) =>
    state.checkoutTotal()
  );

  return checkoutTotal ?? 0;
};
