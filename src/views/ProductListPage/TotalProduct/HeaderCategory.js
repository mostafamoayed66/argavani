import React, { useEffect, useState } from 'react';
import { Chip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LinkIcon from '@material-ui/icons/Link';
import './totalStyle.css';



const HeaderCategory = ({ category }) => {
    const [categorys, setCategory] = useState([]);

    useEffect(() => {
        setCategory(category);
    }, [category]);

    return (
        <div className="totalCategory">
            <span className="headerTitleCategories"> : دسته بندی ها</span>
            <div className="horizontal_slider">
                <div className="slider_container">
                    {
                        categorys.map((itemCategory, index) => {
                            return (
                                <Chip
                                    key={index}
                                    className="item"
                                    avatar={<Avatar><LinkIcon/></Avatar>}
                                    label={itemCategory.name}
                                    color="secondary"
                                    component="a"
                                    href={`/product/${itemCategory.slug}?type=product`}
                                    clickable
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default HeaderCategory;
