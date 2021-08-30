import React, { useEffect, useState } from 'react';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '../../../components/UI/Rating';
import Card from '@material-ui/core/Card';


import Pagination from '../../../components/UI/Pagination';
/**
 * @author
 * @function ProductPage
 **/

const useStyles = makeStyles((theme) => ({
    rootpost: {
        flexGrow: 1,
        padding: '2px 10px',
    },
}));

const Posts = ({ posts, max }) => {
    const classes = useStyles();

    const [currentPosts, setcurrentPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        (posts.length > 0) && setcurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost))
    }, [indexOfFirstPost, indexOfLastPost, posts]);



    return (
        <div className={classes.rootpost}>


            <div className="grides">
                {currentPosts.map(
                    (product, index) => (
                        // (max === '')
                        // ||
                        // (product.price <= max)
                        // ? (
                            <div key={index} className="element-item">
                                <Link
                                    to={`/product/${product.slug}/${product._id}/p`}
                                    style={{
                                        display: 'block',
                                        textDecoration: 'none',
                                        color: '#000'
                                    }}
                                >
                                    <Card>
                                        <div className="productImgContainer">
                                            <img src={generatePublicUrl(product.productPictures[0].img)} alt={product.name} />
                                        </div>
                                        <div className="productInfo">
                                            <div className="productName">{product.name}</div>
                                            <div className="rating">
                                                <Rating value={Math.floor(Math.random() * Math.floor(5))} />
                                                &nbsp;&nbsp;
                                                <span className="productNumber">{product.quantity} :تعداد کالاء موجود</span>
                                            </div>
                                            <span className="productPrice">
                                                <span>قیمت کالا :</span>
                                                <span className="productPriceValue">{product.price} تومان</span>
                                            </span>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        // ) : null
                    ))}
            </div>

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
};

export default Posts;
