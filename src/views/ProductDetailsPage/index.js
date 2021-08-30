import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById, addToCart } from '../../actions';
import { MaterialButton } from '../../components/MaterialUI';
import { generatePublicUrl } from '../../urlConfig';
import Layout from '../../containers/TheLayout';

import Grid from '@material-ui/core/Grid';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined';
import './style.css';

/**
* @author
* @function ProductDetailsPage
**/

const ProductDetailsPage = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {
    const { productId } = props.match.params;
    // console.log(props);
    const payload = {
      params: {
        productId
      }
    }
    dispatch(getProductDetailsById(payload));
  }, [dispatch, props]);


  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      <Grid container className="productDescriptionContainer">
        <Grid item xs={12} sm={5} className="productDetailGridStyle">
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div className="flexRow priceContainer">
              <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
            </div>
            <div className="productDetailtxt">
              <p className="productDetailtxtFirst">
                تخفیف ویژه
              </p>
              <p className="productDetailtxtSecond">
                <span className="spanOne">
                  توضیحات
                </span>
                <span style={{ fontSize: '12px', color: '#212121', }}>
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={7} className="productDetailGridStyle">

          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img src={generatePublicUrl(product.productDetails.productPictures[0].img)} alt={`${product.productDetails.productPictures[0].img}`} />
            </div>

            <div className="verticalImageStack">
              {
                product.productDetails.productPictures.map((thumb, index) =>
                  <div className="thumbnail" key={index.toString()}>
                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                  </div>
                )
              }
            </div>

          


            <Grid container className="productMaterialButton">
              <Grid item xs={12} sm={6} className="productDetailMaterialButton">
                <MaterialButton
                  title="افزودن به سبد خرید"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  icon={<LocalMallOutlinedIcon fontSize="small" />}
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push(`/cart`);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="productDetailMaterialButton">
                <MaterialButton
                  title="هم اکنون خریداری کنید"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  icon={<FlashOnOutlinedIcon fontSize="small" />}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>

      </Grid>
    </Layout>
  )

}

export default ProductDetailsPage