import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTotalProductBySlug } from '../../../actions';
import getParams from '../../../utils/getParams';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import HeaderCategory from './HeaderCategory';

import NothingFound from '../../../components/UI/NothingFound';
import TotalPost from './TotalPost';
/**
* @author
* @function ProductPage
**/
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

const ProductPage = (props) => {
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const [categorys, setCategory] = useState([]);

    const [products, setProduct] = useState([]);
    const [prodct, setProdct] = useState([]);
    const [disabled, setdisabled] = useState(false);
    
    const [values, setValues] = useState({
        color: '',
        price: '',
    });

    useEffect(() => {
        const params = getParams(props.location.search);
        dispatch(getTotalProductBySlug(params.cid));
    }, [dispatch, props]);

    useEffect(() => {
        setProduct(product.totalProduct);
        setCategory(product.totalCategory);
    }, [product.totalCategory, product.totalProduct]);

    useEffect(() => {
        if (products.length > 0) {
            if (values.price === '') {
                setdisabled(false);
                setProdct(Object.assign([], products));
            }
            if (values.price && values.price !== '' && disabled) {
                setdisabled(false);
                let p = products.filter(itm => itm.price <= values.price);
                setProdct(Object.assign([], p));
            }
        }
    }, [disabled, products, values.price]);

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
        <div>
            <HeaderCategory category={categorys} />

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
                prodct.length > 0 ?
                    <TotalPost posts={prodct} max={values.price} />
                    :
                    <NothingFound />
            }
        </div>
    )
}
export default ProductPage
