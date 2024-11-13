import Home from '~/pages/Home';
import Cart from '~/pages/Cart';

//coffee
import CoffeeAtHome from '~/pages/Coffee/CoffeeAtHome';
import CoffeeDamViCaPhe from '~/pages/Coffee/CoffeeDamViCaPhe';

import Device from '~/pages/Device';

//tea
import TeaAtHome from '~/pages/Tea/TeaAtHome';
import TeaDamViTra from '~/pages/Tea/TeaDamViTra';

//products
import Products from '~/pages/Product/Products';
import Snacks from '~/pages/Product/Snacks';
import Food from '~/pages/Product/Food';
import Detail from '~/pages/Product/Detail';

// store
import Store from '~/pages/Store';

// auth
import Signin from '~/pages/Auth/Signin';
import Signup from '~/pages/Auth/Signup';

// pay
import PaymentInfor from '~/pages/Pay/PaymentInfor';
import PaymentSuccess from '~/pages/Pay/PaymentSuccess';
import ProtectedRoute from '~/components/ProtectedRoute';
// about us

import AboutUs from '~/pages/AboutUs';

//config
import config from '~/config';

import Dashboard from '~/pages/Admin/Dashboard';
import Login from '~/pages/Admin/Login';

// ADMIN Blogs
import BlogsInAdmin from '~/pages/Admin/Blogs';
import AddBlog from '~/pages/Admin/Blogs/Add';
import DetailBlog from '~/pages/Admin/Blogs/Detail';
import EditBlog from '~/pages/Admin/Blogs/Edit';

// ADMIN Blogs-Category
import BlogsCategoryInAdmin from '~/pages/Admin/Blogs-Category';
import AddBlogCategory from '~/pages/Admin/Blogs-Category/Add';
import DetailBlogCategory from '~/pages/Admin/Blogs-Category/Detail';
import EditBlogCategory from '~/pages/Admin/Blogs-Category/Edit';

// ADMIN Products
import ProductInAdmin from '~/pages/Admin/Products';
import AddProducts from '~/pages/Admin/Products/AddProducts';
import DetailProducts from '~/pages/Admin/Products/Detail';
import EditProducts from '~/pages/Admin/Products/Edit';

// ADMIN Products-Category
import ProductsCategory from '~/pages/Admin/Products-Category';
import AddProductsCategory from '~/pages/Admin/Products-Category/AddProducts-Category';
import EditProductsCategory from '~/pages/Admin/Products-Category/Edit';
import DetailProductsCategory from '~/pages/Admin/Products-Category/Detail';

// ADMIN Account
import Accounts from '~/pages/Admin/Accounts';
import AddAccounts from '~/pages/Admin/Accounts/Add';
import EditAccounts from '~/pages/Admin/Accounts/Edit';
import DetailAccounts from '~/pages/Admin/Accounts/Detail';

// ADMIN Auth
import Auth from '~/pages/Admin/Auth';
import AddAuth from '~/pages/Admin/Auth/Add';
import EditAuth from '~/pages/Admin/Auth/Edit';
import DetailAuth from '~/pages/Admin/Auth/Detail';

// ADMIN Order
import Order from '~/pages/Admin/Order';
import DetailOrder from '~/pages/Admin/Order';

//ADMIN Permission-Group
import PermissionGroup from '~/pages/Admin/PermissionGroup';
import AddPermissionGroup from '~/pages/Admin/PermissionGroup/Add';
import EditPermissionGroup from '~/pages/Admin/PermissionGroup/Edit';
import DetailPermissionGroup from '~/pages/Admin/PermissionGroup/Detail';

// ADMIN Role
import Role from '~/pages/Admin/Role';

// ADMIN Settings
import Settings from '~/pages/Admin/Settings';
import Report from '~/pages/Admin/Report';

const publicRoute = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },

    //coffee
    { path: config.routes.coffeeAtHome, component: CoffeeAtHome },
    { path: config.routes.coffeeDamViCaPhe, component: CoffeeDamViCaPhe },

    //device
    { path: config.routes.device, component: Device },

    //tea
    { path: config.routes.teaAtHome, component: TeaAtHome },
    { path: config.routes.teaDamViTra, component: TeaDamViTra },

    //product
    { path: config.routes.categoryProducts, component: Products },
    { path: config.routes.categorySnacks, component: Snacks },
    { path: config.routes.categoryFood, component: Food },
    { path: config.routes.detail, component: Detail },

    // store
    { path: config.routes.store, component: Store },

    { path: config.routes.aboutUs, component: AboutUs },

    // Form
    { path: config.routes.signIn, component: Signin },
    { path: config.routes.signUp, component: Signup },

    { path: config.routes.admin, component: Login, layout: null },
    { path: config.routes.paymentInfor, component: PaymentInfor, layout: null },

    // {path: config.routes.signIn, component: signIn}

    { path: config.routes.paymentSuccess, component: PaymentSuccess, layout: null },
];

const privateRoute = [
    { path: config.routes.adminDashBoard, component: Dashboard, protected: ProtectedRoute },
    // blogs
    {
        path: config.routes.adminBlogs,
        component: BlogsInAdmin,
        protected: ProtectedRoute,
        permission: 'blogs-view',
    },
    {
        path: config.routes.adminAddBlogs,
        component: AddBlog,
        protected: ProtectedRoute,
        permission: 'blogs-create',
    },
    {
        path: config.routes.adminDetailBlogs,
        component: DetailBlog,
        protected: ProtectedRoute,
    },
    {
        path: config.routes.adminEditBlogs,
        component: EditBlog,
        protected: ProtectedRoute,
        permission: 'blogs-edit',
    },

    // blogs-category
    {
        path: config.routes.adminBlogsCategory,
        component: BlogsCategoryInAdmin,
        protected: ProtectedRoute,
        permission: 'blogs-category-view',
    },
    {
        path: config.routes.adminAddBlogsCategory,
        component: AddBlogCategory,
        protected: ProtectedRoute,
        permission: 'blogs-category-create',
    },
    {
        path: config.routes.adminDetailBlogsCategory,
        component: DetailBlogCategory,
        protected: ProtectedRoute,
    },
    {
        path: config.routes.adminEditBlogsCategory,
        component: EditBlogCategory,
        protected: ProtectedRoute,
        permission: 'blogs-category-edit',
    },

    // products
    {
        path: config.routes.adminProducts,
        component: ProductInAdmin,
        protected: ProtectedRoute,
        permission: 'products-view',
    },
    {
        path: config.routes.adminAddProducts,
        component: AddProducts,
        protected: ProtectedRoute,
        permission: 'products-create',
    },
    {
        path: config.routes.adminDetailProducts,
        component: DetailProducts,
        protected: ProtectedRoute,
    },
    {
        path: config.routes.adminEditProducts,
        component: EditProducts,
        protected: ProtectedRoute,
        permission: 'products-edit',
    },

    // products-category
    {
        path: config.routes.adminProductsCategory,
        component: ProductsCategory,
        protected: ProtectedRoute,
        permission: 'products-category-view',
    },
    {
        path: config.routes.adminAddProductsCategory,
        component: AddProductsCategory,
        protected: ProtectedRoute,
        permission: 'products-category-create',
    },
    { path: config.routes.adminDetailProductsCategory, component: DetailProductsCategory, protected: ProtectedRoute },
    {
        path: config.routes.adminEditProductsCategory,
        component: EditProductsCategory,
        protected: ProtectedRoute,
        permission: 'products-category-edit',
    },

    // account
    {
        path: config.routes.adminAccount,
        component: Accounts,
        protected: ProtectedRoute,
        permission: 'accounts-view',
    },
    {
        path: config.routes.adminAddAccount,
        component: AddAccounts,
        protected: ProtectedRoute,
        permission: 'accounts-create',
    },
    { path: config.routes.adminDetailAccount, component: DetailAccounts, protected: ProtectedRoute },
    {
        path: config.routes.adminEditAccount,
        component: EditAccounts,
        protected: ProtectedRoute,
        permission: 'accounts-edit',
    },

    // order
    {
        path: config.routes.adminOrder,
        component: Order,
        protected: ProtectedRoute,
    },
    {
        path: config.routes.adminDetailOrder,
        component: DetailOrder,
        protected: ProtectedRoute,
    },

    // report
    {
        path: config.routes.adminReport,
        component: Report,
        protected: ProtectedRoute,
    },
    // permission-group
    {
        path: config.routes.adminPermissionGroup,
        component: PermissionGroup,
        protected: ProtectedRoute,
        permission: 'role-view',
    },
    {
        path: config.routes.adminAddPermissionGroup,
        component: AddPermissionGroup,
        protected: ProtectedRoute,
        permission: 'role-create',
    },
    { path: config.routes.adminDetailPermissionGroup, component: DetailPermissionGroup, protected: ProtectedRoute },
    {
        path: config.routes.adminEditPermissionGroup,
        component: EditPermissionGroup,
        protected: ProtectedRoute,
        permission: 'role-edit',
    },

    // role
    { path: config.routes.adminRole, component: Role, protected: ProtectedRoute, permission: 'role-view' },

    // auth
    { path: config.routes.adminAuth, component: Auth, protected: ProtectedRoute },
    { path: config.routes.adminAddAuth, component: AddAuth, protected: ProtectedRoute },
    { path: config.routes.adminDetailAuth, component: DetailAuth, protected: ProtectedRoute },
    { path: config.routes.adminEditAuth, component: EditAuth, protected: ProtectedRoute },

    // settings
    { path: config.routes.adminSettings, component: Settings, protected: ProtectedRoute },
];

export { publicRoute, privateRoute };
