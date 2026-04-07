export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
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
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/th06',
		name: 'TH06',
		icon: 'EnvironmentOutlined',
		component: './TH06/layout',
		routes: [
			{
				path: '/th06/trang-chu',
				name: 'TrangChu',
				component: './TH06/TrangChu',
			},
			{
				path: '/th06/lich-trinh',
				name: 'LichTrinh',
				component: './TH06/LichTrinh',
			},
			{
				path: '/th06/ngan-sach',
				name: 'NganSach',
				component: './TH06/NganSach',
			},
			{
				path: '/th06/admin',
				name: 'Admin',
				component: './TH06/Admin',
			},
			{
				path: '/th06',
				redirect: '/th06/trang-chu',
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