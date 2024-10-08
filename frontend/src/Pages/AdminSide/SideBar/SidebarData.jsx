
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { UserManagement } from "../../../Components/Icons/Icon";


export const asideLinks = [
  {
    id: 1,
    icon: UserManagement(24, "#000000"),
    title: "Dashboard",
    // hasChild: true,
    link: '/admin-dashboard',
   
  },
//   {
//     id: 2,
//     icon: (
//       <div className="pr-2">
//         {" "}
//         <AssignmentIndIcon size={21} sx={{ color: "#00000" }} />
//       </div>
//     ),
//     title: "Site Management",
//     hasChild: true,
//     child: [
//       {
//         icon: (
//           <div className="pr-2">
//             {" "}
//             <AssignmentIndIcon size={21} sx={{ color: "#00000" }} />
//           </div>
//         ),
//         title: "Sites",
//         link: "/admin-sites",
//       },
//     ],
//   },
//   {
//     id: 3,
//     icon: (
//       <div className="pr-2">
//         {" "}
//         <ConnectedTvIcon size={21} sx={{ color: "#00000" }} />
//       </div>
//     ),
//     title: "Process Management",
//     hasChild: true,
//     child: [
//       {
//         icon: (
//           <div className="pr-2">
//             {" "}
//             <ConnectedTvIcon size={21} sx={{ color: "#00000" }} />
//           </div>
//         ),
//         title: "Processes",
//         link: "/admin-processes",
//       },
//     ],
//   },

  // {
  //     id: 2,
  //     icon: <TbDeviceDesktopStar size={22} style={{color:"#000000"}}/>,
  //     title: 'Configuration Setup',
  //     hasChild: true,
  //     child: [
  //         {

  //             icon:<div className="pr-2">  <DoorBackIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Clusters',
  //             link: '/clusters/manage'
  //         }, {
  //             icon: <div className="pr-2"> <ViewInArIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Process Sets',
  //             link: '/process-sets/manage'
  //         }, {
  //             icon: <div className="pr-2"> <DoubleArrowIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Project',
  //             link: '/process/manage'
  //         }, {
  //             icon:<div className="pr-2">  <Person4Icon sx={{color:"#00000"}}/></div>,
  //             title: 'User Clusters',
  //             link: '/user-clusters/manage'
  //         }, {
  //             icon:<div className="pr-2">  <Groups3Icon sx={{color:"#00000"}}/></div>,
  //             title: 'Audience',
  //             link: '/audience/manage'
  //         }, {
  //             icon: <div className="pr-2"> <PlaylistAddCheckCircleIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Record Stages',
  //             link: '/record-stages/manage'
  //         }, {
  //             icon: <div className="pr-2"> <TransferWithinAStationIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Actions',
  //             link: '/actions/manage'
  //         }, {
  //             icon:<div className="pr-2">  <MoveUpIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Multi Actions',
  //             link: '/multi-actions/manage'
  //         }, {
  //             icon:<div className="pr-2"> <ManageHistoryIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Ancestors',
  //             link: '/ancestors/manage'
  //         }, {
  //             icon: <div className="pr-2"> <PinDropIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Site/Location',
  //             link: '/site-location/manage'
  //         }
  //     ]
  // },

  // {
  //     id: 3,
  //     icon: <StorageIcon sx={{color:"#000000"}}/>,
  //     title: 'Data Fields',
  //     hasChild: true,
  //     child: [
  //         {
  //             icon:<div className="pr-2">  <StackedBarChartIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Data Fields',
  //             link: '/data-fields/manage'
  //         }, {

  //             icon:<div className="pr-2">  <DynamicFeedIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Dependent Elements',
  //             link: '/dependent-elements/manage'
  //         }, {
  //             icon:<div className="pr-2">  <ReportIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Mandatory Fields',
  //             link: '/mandatory-fields/manage'
  //         }, {
  //             icon:<div className="pr-2">  <DeveloperModeIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Conditionally Mandatory',
  //             link: '/conditionally-mandatory/manage'
  //         }, {
  //             icon:<div className="pr-2">  <RateReviewIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Conditionally View',
  //             link: '/conditionally-view/manage'
  //         },
  //     ]
  // },

  // {
  //     id: 4,
  //     icon: <SummarizeIcon/>,
  //     title: 'Template Manager',
  //     hasChild: true,
  //     child: [
  //         {
  //             icon: <LibraryBooksIcon sx={{color:"#00000"}}/>,
  //             title: 'Template Designer',
  //             link: '/template-designer/manage'
  //         }
  //     ]
  // },
  //   {
  //     id: 5,
  //     icon: <ReportIcon />,
  //     title: "Report Manager",
  //     hasChild: true,
  //     child: [
  //       {
  //         icon: (
  //           <div className="pr-2">
  //             {" "}
  //             <SummarizeIcon sx={{ color: "#00000" }} />
  //           </div>
  //         ),
  //         title: "Report Manager",
  //         // link: '/report-manager/manage'
  //       },
  //     ],
  //   },
  //  {
  //     id: 6,
  //     icon: <NotificationImportantIcon/>,
  //     title: 'Notification Manager',
  //     hasChild: true,
  //     child: [
  //         {
  //             icon: <div className="pr-2"> <NotificationsActiveIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Notification Templates',
  //             link: '/notification-templates/manage'
  //         }, {
  //             icon: <div className="pr-2"> <GppMaybeIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Notification Rules',
  //             link: '/notification-rules/manage'
  //         },
  //     ]
  // }, {
  //     id: 7,
  //     icon: <AssistantIcon />,
  //     title: 'Automation Manager',
  //     hasChild: true,
  //     child: [
  //         {
  //             icon:<div className="pr-2">  <ChildCareIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Child Restrictions Automation',
  //             link: '/child-restrictions-automations/manage'
  //         }, {
  //             icon:<div className="pr-2">  <DataSaverOffIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Date Update Automation',
  //             link: '/date-update-automation/manage'
  //         }, {
  //             icon:<div className="pr-2">  <CalendarMonthIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Child Date Automation',
  //             link: '/child-date-automation/manage'
  //         }, {
  //             icon:<div className="pr-2">  <ChildFriendlyIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Child Auto Creation Automation',
  //             link: '/child-auto-creation-automation/manage'
  //         },
  //     ]
  // }, {
  //     id: 8,
  //     icon: <AdminPanelSettingsIcon/>,
  //     title: 'Panel Flex',
  //     hasChild: true,
  //     child: [
  //         {
  //             icon:<div className="pr-2">  <AdminPanelSettingsIcon sx={{color:"#00000"}}/></div>,
  //             title: 'Panel Matrix',
  //             link: '/panel-matrix/manage'
  //         },
  //     ]
  // }, {
  //     id: 9,
  //     icon: AuditTrailIcon(20, '#000000'),
  //     title: 'Audit Trail',
  //     hasChild: false,
  //     link: '/audit-trail'
  // }
];
