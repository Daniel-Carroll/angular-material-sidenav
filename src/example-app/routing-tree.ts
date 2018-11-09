export class SidenavRoutingTree{

public static navLinks = [
    {
      label: "Photos",
      path: "/driver",
      icon: "camera",
      module: "menuItem1",
    },
    {
      label: "Map",
      path: "/driver",
      icon: "language",
      module: "menuItem2",
      subnavExpanded: false,
        subnavState: 'collapsed',
        subnav: [{
            label: "Zone",
            path: "/zones",
            icon: "location_on"
          },{
            label: "City",
            path: "/city"
          }]
    },
    {
      label: "Travel",
      path: "/driver",
      icon: "work_outline",
      module: "menuItem3",
    }
  ] 
}