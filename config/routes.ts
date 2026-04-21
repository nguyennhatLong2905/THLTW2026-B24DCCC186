export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user/login',
                layout: false,
                name: 'Đăng nhập',
                component: './user/Login',
            },
            {
                path: '/user',
                redirect: '/user/login',
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'Bảng điều khiển',
        component: './TrangChu',
        icon: 'HomeOutlined',
    },
    {
        path: '/gioi-thieu',
        name: 'Giới thiệu',
        component: './TienIch/GioiThieu',
        hideInMenu: true,
    },
    {
        path: '/random-user',
        name: 'Người dùng ngẫu nhiên',
        component: './RandomUser',
        icon: 'ArrowsAltOutlined',
    },
    {
        path: '/todo-list',
        name: 'Danh sách công việc',
        icon: 'OrderedListOutlined',
        component: './TodoList',
    },
    {
        name: 'Blog Cá Nhân',
        path: '/blog',
        icon: 'ReadOutlined',
        routes: [
            {
                name: 'Trang chủ Blog',
                path: '/blog/home',
                component: './blog/Home',
            },
            {
                name: 'Giới thiệu Tác giả',
                path: '/blog/about',
                component: './blog/About',
            },
            {
                name: 'Quản lý Bài viết',
                path: '/blog/admin/posts',
                component: './blog/Admin/Posts',
            },
            {
                name: 'Quản lý Thẻ',
                path: '/blog/admin/tags',
                component: './blog/Admin/Tag',
            },
            {
                path: '/blog/detail/:id',
                component: './blog/Details',
                hideInMenu: true,
            },
            {
                path: '/blog',
                redirect: '/blog/home',
            },
        ],
    },
    {
        path: '/notification',
        routes: [
            {
                path: '/notification/subscribe',
                exact: true,
                component: './ThongBao/Subscribe',
            },
            {
                path: '/notification/check',
                exact: true,
                component: './ThongBao/Check',
            },
            {
                path: '/notification',
                exact: true,
                component: './ThongBao/NotifOneSignal',
            },
        ],
        layout: false,
        hideInMenu: true,
    },
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/403',
        component: './exception/403/403Page',
        layout: false,
    },
    {
        path: '/hold-on',
        component: './exception/DangCapNhat',
        layout: false,
    },
    {
        component: './exception/404',
    },
];