import { ON_LINE } from "@/components/shop/cart/notebook";
import { Skeleton } from "@/components/ui/skeleton";

/** Carregamento do carrinho: linhas de item falsas apoiadas nas pautas (3 pautas cada, 1 entre elas). */
export function CartSkeleton() {
  return (
    <div role="status" className="flex flex-col gap-8">
      <span className="sr-only">Carregando o carrinho…</span>
      {[0, 1].map((row) => (
        <div key={row} className="flex h-24 gap-3">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className={ON_LINE}>
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className={ON_LINE}>
              <Skeleton className="h-3 w-1/2" />
            </div>
            <div className={ON_LINE}>
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end">
            <div className={ON_LINE}>
              <Skeleton className="size-5" />
            </div>
            <div className="flex h-16 items-end">
              <Skeleton className="mb-px h-11 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
