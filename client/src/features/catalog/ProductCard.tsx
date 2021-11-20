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
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'app/hooks';
import { FC } from 'react';
import { productSelectors } from 'slices/product';

interface Props {
  productId: EntityId;
}

const ProductCard: FC<Props> = (props) => {
  const { productId } = props;

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, productId!)
  );

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
        <Button size="small">Add to cart</Button>

        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
