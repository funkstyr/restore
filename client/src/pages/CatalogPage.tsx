import { useEffect } from 'react';
import { Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchProducts, productSelectors } from 'features/product/productSlice';
import ProductCard from 'features/product/ProductCard';

function CatalogPage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => productSelectors.selectIds(state));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container spacing={4}>
      {products.map((id) => (
        <Grid item xs={4} key={id}>
          <ProductCard productId={id} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CatalogPage;
