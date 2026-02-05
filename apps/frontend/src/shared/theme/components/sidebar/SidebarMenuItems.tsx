import { GridIcon, DocsIcon, PieChartIcon } from "@shared/theme/icons";

export const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Sentinel", path: "/" }],
  },
  {
    icon: <DocsIcon />,
    name: "Seguridad",
    subItems: [{ name: "Usuarios", path: "/user" }],
  }
];

export const othersItems = [
  {
    icon: <PieChartIcon />,
    name: "Analítica",
    subItems: [
      { name: "Consumo de Tokens", path: "/tokens" },
      { name: "Logs de Sesión", path: "/logs" },
    ],
  }
];