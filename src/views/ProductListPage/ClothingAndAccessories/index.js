import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import Posts from './Posts';
import NothingFound from '../../../components/UI/NothingFound';
import './style.css';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix='&#174; '
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    color: '',
    price: '',
  });
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [disabled, setdisabled] = useState(false);

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, [dispatch, props]);

  useEffect(() => {
    setPosts(product.products);
  }, [product]);

  useEffect(() => {
    if (posts.length > 0) {
      if (values.price === '') {
        setdisabled(false);
        setPost(Object.assign([], posts));
      }
      if (values.price && values.price !== '' && disabled) {
        setdisabled(false);
        let p = posts.filter(itm => itm.price <= values.price);
        setPost(Object.assign([], p));
      }
    }
  }, [disabled, posts, values.price]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilter = () => {
    if (values.price && values.price !== '') {
      setdisabled(true);
    }
  };

  return (
    <div className="postContainer">
      <div className="formInput">
        <div>
          <TextField
            label="سقف قیمت"
            variant="outlined"
            value={values.priceMin}
            onChange={handleChange}
            name="price"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            InputLabelProps={{ shrink: true }}
            size="small"
            type="search"
            className="priceRange"
          />
        </div>

        <div className="filerButtonContainer">
          <Button
            variant="contained"
            // size="small"
            color="primary"
            onClick={handleFilter}>
            <span className="filerText">جستجو</span>
          </Button>
        </div>
      </div>
      {
        post.length > 0 ?
          <Posts posts={post} max={values.price} />
          :
          <NothingFound />
      }
    </div>
  );
};

export default ClothingAndAccessories;
