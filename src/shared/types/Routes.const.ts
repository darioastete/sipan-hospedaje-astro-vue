const path = "/icon/";
export const Routes = [
	{ href: "/", icon: `${path}iDashboard.svg`, text: "Dashboard" },
	{ href: "/rooms", icon: `${path}iRoom.svg`, text: "Habitaciones" },
	{
		href: "/maintenance",
		icon: `${path}iSupport.svg`,
		text: "Mantenimiento",
		children: [
			{
				href: "/maintenance/rooms",
				icon: `${path}iRoom.svg`,
				text: "Habitaciones",
			},
			{
				href: "/maintenance/status-room",
				icon: `${path}iRoom.svg`,
				text: "Estados de Habitaciones",
			},
			{
				href: "/maintenance/category-room",
				icon: `${path}iRoom.svg`,
				text: "Categoria de Habitacion",
			},
			{ href: "/maintenance/floors", icon: `${path}iRoom.svg`, text: "Pisos" },
			{
				href: "/maintenance/clients",
				icon: `${path}iClients.svg`,
				text: "Clientes",
			},
			{
				href: "/maintenance/service-room",
				icon: `${path}iRoom.svg`,
				text: "Servicios",
			},
		],
	},
	{
		href: "/report",
		icon: `${path}iReport.svg`,
		text: "Reportes",
		children: [
			{
				href: "/report/room-come",
				icon: `${path}iCollect.svg`,
				text: "Ingreso por Habitacion",
			},
			{
				href: "/report/room-occupancy",
				icon: `${path}iCollect.svg`,
				text: "Estadias por habitación",
			},
			{
				href: "/report/room-type-occupancy",
				icon: `${path}iRoom.svg`,
				text: "Ingreso por Tipo Habitacion",
			},
			{
				href: "/report/top-clients",
				icon: `${path}iClients.svg`,
				text: "Top Clientes",
			},
		],
	},
	{
		href: "/admin",
		icon: `${path}iUser.svg`,
		text: "Administrador",
		children: [
			{ href: "/admin/users", icon: `${path}iUser.svg`, text: "Usuarios" },
			// { href: "admin/roles", icon:'' ,text: "Roles" },
		],
	},
	{ href: "/login", icon: `${path}iPoweer.svg`, text: "Cerrar Sesion" },
];
