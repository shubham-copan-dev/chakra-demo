import {
    ContactIcon,
    HomeIcon,
    LeadIcon,
    PipelineIcon,
    UserIcon,
  } from "@/chakraConfig/icons";

export const dashboards:any = [
    { href: '/dashboard', icon: HomeIcon, label: 'Home',action: "Home" },
    { href: '/dashboard/Opportunity', icon: PipelineIcon, label: 'Opportunity', action: "Opportunity" },
    { href: '/dashboard/Account', icon: UserIcon, label: 'Account', action: "Account" },
    { href: '/dashboard/lead', icon: LeadIcon, label: 'Lead', action: "lead" },
    { href: '/dashboard/contact', icon: ContactIcon, label: 'Contact', action: "contact" },
  ];

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

export  const textStyle = {
    color: "bgClr.Grey400",
    textAlign: "center",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "130%",
  };

export  const buttonData = [
    { text: 'Filters' },
    { text: 'Manage Columns' },
    { text: 'Show Metrices' },
    { text: '... More' },
  ];