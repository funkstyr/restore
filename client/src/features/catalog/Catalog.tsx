import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchProducts, productSelectors } from 'slices/product';
import ProductCard from './ProductCard';
import { Grid } from '@mui/material';

function CatalogPage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => productSelectors.selectIds(state));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container spacing={4} sx={{ marginTop: 2 }}>
      {products.map((id) => (
        <Grid item xs={4} key={id}>
          <ProductCard productId={id} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CatalogPage;
