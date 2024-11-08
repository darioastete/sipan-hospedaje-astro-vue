export const Routes = [
	{ href: "/", icon: "iDashboard", text: "Dashboard" },
	{ href: "/rooms", icon: "iRoom", text: "Habitaciones" },
	{
		href: "/maintenance",
		icon: "iSupport",
		text: "Mantenimiento",
		children: [
			{ href: "/maintenance/rooms", icon: "iRoom", text: "Habitaciones" },
			{
				href: "/maintenance/status-room",
				icon: "iRoom",
				text: "Estados de Habitaciones",
			},
			{
				href: "/maintenance/category-room",
				icon: "iRoom",
				text: "Categoria de Habitacion",
			},
			{ href: "/maintenance/floors", icon: "iRoom", text: "Pisos" },
			{ href: "/maintenance/clients", icon: "iClients", text: "Clientes" },
			{ href: "/maintenance/service-room", icon: "iRoom", text: "Servicios" },
		],
	},
	{
		href: "/report",
		icon: "iReport",
		text: "Reportes",
		children: [
			{ href: "/report/room-come", icon: "iCollect", text: "Room Come" },
			{ href: "/report/room-occupancy", icon: "iCollect", text: "Ocupaciones" },
			{
				href: "/report/room-type-occupancy",
				icon: "iRoom",
				text: "Tipo de Ocupaciones",
			},
			{ href: "/report/top-clients", icon: "iClients", text: "Top Clients" },
		],
	},
	{
		href: "/admin",
		icon: "iUser",
		text: "Administrador",
		children: [
			{ href: "/admin/users", icon: "iUser", text: "Usuarios" },
			// { href: "admin/roles", icon:'' ,text: "Roles" },
		],
	},
];
