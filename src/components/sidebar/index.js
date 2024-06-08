import { userRole } from './userRole';
import { HiOutlineBookOpen } from "react-icons/hi2";
import { PiLockSimpleOpen, PiPersonSimpleWalk, PiCarLight } from "react-icons/pi";
import { BsPersonGear } from "react-icons/bs";
import { VscKey, VscShield, VscHistory, VscDashboard  } from "react-icons/vsc";
import { LiaUserSecretSolid } from "react-icons/lia";
import { IoCreateOutline, IoLockOpenOutline  } from "react-icons/io5";
import { MdManageSearch } from "react-icons/md";
import { AiOutlineQrcode } from "react-icons/ai";


const getLinks = (role) => {
  switch (role) {
    // Usuario administrador de la residencial
    case 'admin':
      return [
        { name: 'Entry History', to: 'dashboard/entryhistory', icon: VscHistory },
        { name: 'Manage Overtime', to: 'dashboard/manageovertime', icon: VscDashboard },
        { name: 'Manage Houses', to: 'dashboard/managehouses', icon: VscKey },
        { name: 'Manage Guards', to: 'dashboard/manageguards', icon: VscShield }
         
      ];
    // Usuario encargado de cada casa
    case 'supervisor':
      return [
        { name: 'Logs of Entries', to: 'dashboard/logofentries', icon: VscHistory },
        { name: 'Create Permission', to: 'dashboard/createpermission', icon: IoCreateOutline},
        { name: 'Manage Permissions', to: 'dashboard/managepermissions', icon: MdManageSearch },
        { name: 'Manage Members', to: 'dashboard/managemembers', icon: BsPersonGear },
        { name: 'Generate Keys', to: 'dashboard/generatekeys', icon: AiOutlineQrcode},
      ];
    // Usuario guardia de seguridad
    case 'guard':
      return [  
        { name: 'Pedestrian Access', to: 'dashboard/pedestrianaccess', icon: PiPersonSimpleWalk },
        { name: 'Vehicular Access', to: 'dashboard/vehicularaccess', icon: PiCarLight },
        { name: 'Anonymous Access', to: 'dashboard/anonymousaccess', icon: LiaUserSecretSolid },
      ];
    // Usuario común
    case 'user':
      return [  
        { name: 'Logs of Entries', to: 'dashboard/logofentries', icon: HiOutlineBookOpen },
        { name: 'Permissions Details', to: 'dashboard/permissiondetails', icon: PiLockSimpleOpen },
        { name: 'Generate Keys', to: 'dashboard/generatekeys', icon: AiOutlineQrcode},
      ];
  
    // Usuario invitado (falta)
    case 'guest':
      return [  
        { name: 'Logs of Entries', to: 'dashboard/logofentries', icon: HiOutlineBookOpen },
        { name: 'Request Permissions', to: 'dashboard/requestpermissions', icon: IoLockOpenOutline },
        { name: 'Generate Keys', to: 'dashboard/generatekeys', icon: AiOutlineQrcode},
      ];
    default:
      return [];
  }   
};

const links = getLinks(userRole);

export default links;