import { useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  fetchProducts,
  fetchProductFilters,
  productSelectors,
} from 'features/product/productSlice';
import ProductCard from 'features/product/ProductCard';
import { Box } from '@mui/system';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

function CatalogPage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => productSelectors.selectIds(state));
  const { brands = [], types = [] }: any = useAppSelector(
    (state) => state.product.filters
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductFilters());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField label="Search products" variant="outlined" fullWidth />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort</FormLabel>

            <RadioGroup aria-label="sort" defaultValue="name">
              {sortOptions.map((option) => {
                const { value, label } = option;

                return (
                  <FormControlLabel
                    key={value}
                    label={label}
                    control={<Radio />}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Brands</FormLabel>

            {brands.map((brand: string) => {
              return (
                <FormControlLabel
                  key={brand}
                  label={brand}
                  control={<Checkbox />}
                />
              );
            })}
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Types</FormLabel>

            {types.map((type: string) => {
              return (
                <FormControlLabel
                  key={type}
                  label={type}
                  control={<Checkbox />}
                />
              );
            })}
          </FormControl>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <Grid container spacing={2}>
          {products.map((id) => (
            <Grid item xs={4} key={id}>
              <ProductCard productId={id} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={3} />

      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Displaying 1-6 of 20 items</Typography>

          <Pagination color="secondary" size="large" count={10} page={1} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default CatalogPage;
