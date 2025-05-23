export const routes = {
    home: '/',
    cart: '/cart',
    myAuth: '/thong-tin-ca-nhan',
    infoOrder: '/danh-gia/:orderId',

    //coffee
    coffeeAtHome: '/coffee-tai-nha',
    coffeeDamViCaPhe: '/hat-ca-phe-chat-luong',

    //device
    device: '/device-coffee',

    //chat
    chat: '/chat',

    //product
    categoryProducts: '/category-products/:slug',
    categorySnacks: '/tat-ca-san-pham',
    categoryFood: '/category-food',

    //store
    store: '/store-coffee',

    //about us
    aboutUs: '/about-us/:slug',
    blogDetail: '/blog/:slug',

    // pay
    paymentInfor: '/checkout',
    paymentSuccess: '/payment-success/:orderId',

    //not thing
    notThing: '/not-thing',

    //form
    signIn: '/dang-nhap',
    forgotPassword: '/quen-mat-khau',
    optPassword: '/xac-thuc-ma-otp',
    resetPassword: '/doi-mat-khau-moi',
    signUp: '/dang-ki',

    // detail product
    detail: '/detail/:slugProduct',

    //

    admin: '/admin', // admin
    // ADMIN dashboard
    adminDashBoard: '/admin/dashboard',

    // ADMIN CHAT
    admin_chat: '/admin/chat',

    // ADMIN Blogs
    adminBlogs: '/admin/blogs',
    adminAddBlogs: '/admin/blogs/add',
    adminDetailBlogs: '/admin/blogs/detail/:id',
    adminEditBlogs: '/admin/blogs/edit/:id',

    // ADMIN Blogs-category
    adminBlogsCategory: '/admin/blogs-category',
    adminAddBlogsCategory: '/admin/blogs-category/add',
    adminDetailBlogsCategory: '/admin/blogs-category/detail/:id',
    adminEditBlogsCategory: '/admin/blogs-category/edit/:id',

    // ADMIN Products
    adminProducts: '/admin/products',
    adminAddProducts: '/admin/products/add',
    adminDetailProducts: '/admin/products/detail/:id',
    adminEditProducts: '/admin/products/edit/:id',

    // ADMIN Products-Category
    adminProductsCategory: '/admin/products-category',
    adminAddProductsCategory: '/admin/products-category/add',
    adminDetailProductsCategory: '/admin/products-category/detail/:id',
    adminEditProductsCategory: '/admin/products-category/edit/:id',

    // ADMIN ListAccounts
    adminAccount: '/admin/account',
    adminAddAccount: '/admin/account/add',
    adminDetailAccount: '/admin/account/detail/:id',
    adminEditAccount: '/admin/account/edit/:id',

    // ADMIN ListAuth
    adminAuth: '/admin/auth',
    adminAddAuth: '/admin/auth/add',
    adminDetailAuth: '/admin/auth/detail/:id',
    adminEditAuth: '/admin/auth/edit/:id',

    // ADMIN Stock
    adminStock: '/admin/stock',
    adminAddIngredient: '/admin/ingredient-create',
    adminAddOrderStock: '/admin/order-stock',

    // ADMIN Supplier
    adminSupplier: '/admin/supplier',
    adminAddSupplier: '/admin/supplier-create',

    // ADMIN ListOrder
    adminOrder: '/admin/order',

    // ADMIN Review
    adminReview: '/admin/review',

    // ADMIN Report
    adminReport: '/admin/report',
    // adminAddAuth: '/admin/auth/add',
    adminDetailOrder: '/admin/order/detail',
    //adminEditAuth: '/admin/auth/edit',

    // ADMIN Permission
    adminPermissionGroup: '/admin/permission-group',
    adminAddPermissionGroup: '/admin/permission-group/add',
    adminDetailPermissionGroup: '/admin/permission-group/detail/:id',
    adminEditPermissionGroup: '/admin/permission-group/edit/:id',

    // ADMIN Role
    adminRole: '/admin/role',

    // ADMIN settings
    adminSettings: '/admin/settings',
    adminInterfaceEditing: '/admin/interface-editing',
};
