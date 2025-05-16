import httpRequest from '~/components/utils/httpRequest';

export const getBlogNews = async () => {
    try {
        const res = await httpRequest.get('blogs-client/blogs-new');
        return res.data;
    } catch (error) {}
};

export const getBlogCategory = async () => {
    try {
        const res = await httpRequest.get('blogs-client/blogs-category');
        return res.data;
    } catch (error) {}
};

export const getBlogCategorySlug = async (slug) => {
    try {
        const res = await httpRequest.get(`blogs-client/blogs/${slug}`);
        return res.data;
    } catch (error) {}
};

export const detailProduct = async (slugProduct) => {
    try {
        const res = await httpRequest.get(`blogs-client/detail/${slugProduct}`);
        console.log(res);
        return res.data;
    } catch (error) {}
};
