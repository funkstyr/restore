import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { basketItemSelector, fetchBasket } from 'features/basket/basketSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const BasketPage: FC = () => {
  const dispatch = useAppDispatch();

  const basketItems = useAppSelector((state) =>
    basketItemSelector.selectAll(state)
  );

  useEffect(() => {
    dispatch(fetchBasket());
  }, [dispatch]);
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
              const { productId, name, price = 0, quantity = 1 } = item;

              return (
                <TableRow key={productId}>
                  <TableCell>{name}</TableCell>

                  <TableCell>${(price / 100).toFixed(2)}</TableCell>

                  <TableCell>{quantity}</TableCell>

                  <TableCell>
                    ${((price / 100) * quantity).toFixed(2)}
                  </TableCell>

                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BasketPage;
