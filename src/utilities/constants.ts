import {
  ContactIcon,
  HomeIcon,
  LeadIcon,
  PipelineIcon,
  UserIcon,
} from "@/chakraConfig/icons";

export const staticDashboards: any = [
  { href: "/dashboard/lead", icon: LeadIcon, label: "Lead", action: "lead" },
  {
    href: "/dashboard/contact",
    icon: ContactIcon,
    label: "Contact",
    action: "contact",
  },
];

export const icons = [PipelineIcon, UserIcon];

//method for updating URL with path /id and set queryparms (page,limit)
export const updateUrl = (id: string, queryParamsObject: any) => {
  const urlParams = new URLSearchParams(window.location.search);
  Object.entries(queryParamsObject).forEach(([key, value]: any) => {
    urlParams.set(key, value);
  });
  const newUrl = `${window.location.pathname}/${id}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
};

//method for handling page dispaly on refresh

export const iconStyles = {
  height: "2rem",
  width: "2rem",
  borderRadius: "50%",
  bg: "bgClr.Grey500",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  flexDirection: ["column", "row"],
};

export const textStyle = {
  color: "bgClr.Grey400",
  textAlign: "center",
  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "130%",
};

export const buttonData = [
  { text: "Filters" },
  { text: "Manage Columns" },
  { text: "Show Metrices" },
  { text: "... More" },
];
