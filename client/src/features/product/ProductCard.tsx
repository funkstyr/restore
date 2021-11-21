import { FC } from 'react';
import { Link } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { productSelectors } from 'features/product/productSlice';
import { addBasketItem } from 'features/basket/basketSlice';
import { LoadingButton } from '@mui/lab';

interface Props {
  productId: EntityId;
}

const ProductCard: FC<Props> = (props) => {
  const { productId } = props;
  const dispatch = useAppDispatch();

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, productId!)
  );

  const isLoading = useAppSelector((state) => state.basket.addLoading);

  const handleAddItem = () =>
    dispatch(addBasketItem({ productId, quantity: 1 }));

  if (!product) return null;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'secondary.main' }}>
            {product.name?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: 'bold',
            color: 'primary.main',
          },
        }}
      />

      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contained',
          backgroundColor: 'primary.light',
        }}
        image={product.pictureUrl!}
        title={product.name!}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          ${((product.price || 0) / 100).toFixed(2)}
        </Typography>

        <Typography gutterBottom variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>

      <CardActions>
        <LoadingButton size="small" onClick={handleAddItem} loading={isLoading}>
          Add to cart
        </LoadingButton>

        <Button size="small" component={Link} to={`/product/${productId}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
