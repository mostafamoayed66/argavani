import React from 'react';
import Paginations from '@material-ui/lab/Pagination';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = Math.ceil(totalPosts / postsPerPage);

    const handleChange = (event, value) => {
        paginate(value)
    };

    return (
        <nav>
            <Paginations
                count={pageNumbers}
                variant="outlined"
                color="secondary"
                onChange={handleChange}
                className="pagination"
            />
        </nav>
    );
};

export default Pagination;