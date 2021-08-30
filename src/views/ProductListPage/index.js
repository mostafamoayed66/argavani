import React from "react";
import { Redirect } from 'react-router-dom';
import Layout from '../../containers/TheLayout';
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductTotal from "./TotalProduct";
import "./style.css";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
    const renderProduct = () => {
        const params = getParams(props.location.search);
        let content = null;
        switch (params.type) {
            case "product":
                content = <ClothingAndAccessories {...props} />;
                break;
            case "total":
                content = <ProductTotal {...props} />;
                break;
            default:
                content = <Redirect to="/" />
        }
        return content;
    };

    return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
