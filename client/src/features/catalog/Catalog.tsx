import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchProducts, productSelectors } from 'slices/product';

function CatalogPage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => productSelectors.selectIds(state));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <div>Catalog</div>;
}

export default CatalogPage;
