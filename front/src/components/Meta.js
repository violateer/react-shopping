import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keyword}/>
        </Helmet>
    );
};

Meta.defaultProps = {
    title: '欢迎来到V商城',
    description: '购好物，上V商城',
    keyword: '电商，手机，便宜手机'
};

export default Meta;