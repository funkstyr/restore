import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  addBasketItem,
  basketItemSelector,
  fetchBasket,
  removeBasketItem,
} from 'features/basket/basketSlice';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Delete, Remove, Add } from '@mui/icons-material';
import BasketSummary from 'features/basket/BasketSummary';
import { Link } from 'react-router-dom';

const BasketPage: FC = () => {
  const dispatch = useAppDispatch();

  const basketItems = useAppSelector((state) =>
    basketItemSelector.selectAll(state)
  );

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);

  const handleAdd = (productId: number) =>
    dispatch(addBasketItem({ productId, quantity: 1 }));

  const handleRemove = (productId: number) =>
    dispatch(removeBasketItem({ productId, quantity: 1 }));

  const handleRemoveAll = (productId: number, quantity: number) =>
    dispatch(removeBasketItem({ productId, quantity }));

  return (
    <div>
      Basket
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>

              <TableCell>Price</TableCell>

              <TableCell>Quantity</TableCell>

              <TableCell>Subtotal</TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketItems.map((item) => {
              const {
                productId = 0,
                name,
                price = 0,
                quantity = 1,
                pictureUrl,
              } = item;

              return (
                <TableRow key={productId}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <img
                        src={pictureUrl || ''}
                        alt={name || ''}
                        style={{ height: 50, marginRight: 20 }}
                      />

                      <span>{name}</span>
                    </Box>
                  </TableCell>

                  <TableCell>${(price / 100).toFixed(2)}</TableCell>

                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemove(productId)}
                    >
                      <Remove />
                    </IconButton>
                    {quantity}
                    <IconButton
                      color="secondary"
                      onClick={() => handleAdd(productId)}
                    >
                      <Add />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    ${((price / 100) * quantity).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveAll(productId, quantity)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <BasketSummary />
      <Button component={Link} to="/checkout" variant="contained" fullWidth>
        Checkout
      </Button>
    </div>
  );
};

export default BasketPage;
