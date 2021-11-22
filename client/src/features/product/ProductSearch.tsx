import { debounce, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useState } from 'react';
import { setProductParams } from './productSlice';

const ProductSearch = () => {
  const dispatch = useAppDispatch();

  const searchTerm = useAppSelector(
    (state) => state.product.params.searchTerm || ''
  );

  const [inputTerm, setInputTerm] = useState(searchTerm);

  const debouncedSearch = debounce((evt) => {
    dispatch(setProductParams({ searchTerm: evt.target.value }));
  }, 1000);

  const handleChange = (evt: any) => {
    setInputTerm(evt.target.value);
    debouncedSearch(evt);
  };

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={inputTerm}
      onChange={handleChange}
    />
  );
};

export default ProductSearch;
