import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBasketItem } from 'features/basket/basketSlice';
import {
  fetchProductById,
  productSelectors,
} from 'features/product/productSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const ProductDetailsPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { productId } = params;

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, productId as string)
  );

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleAddItem = () =>
    dispatch(addBasketItem({ productId, quantity: 1 }));

  if (!product) return <h3>Product not found</h3>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <img
          src={product.pictureUrl!}
          alt={product.name!}
          style={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={8}>
        <Typography variant="h3">{product.name}</Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h4" color="secondary">
          ${((product.price || 0) / 100).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Available</TableCell>
                <TableCell>
                  {product.quantityInStock || 0 > 1 ? 'yes' : 'no'}
                </TableCell>
              </TableRow>

              <TableRow>
                <Button variant="contained" onClick={handleAddItem}>
                  Add to cart
                </Button>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProductDetailsPage;
