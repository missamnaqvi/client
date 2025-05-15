import { useSelector } from 'react-redux'
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
    const token = useSelector()
    
    let isAdmin=false
    let isOwner=false
    let isManager=false
    let status="resident"
    
    if(token)
        {
            const decoded=jwtDecode(token)
            const {username,roles}=decoded.UserInfo

            isAdmin=roles.include("admin")
            isOwner=roles.include("pg_owner")
            isManager=roles.include("manager")

            if(isAdmin) status='admin'
            if(isOwner) status='pg_owner'
            if(isManager) status="manager"
            
            return {username,roles,status,isManager,isAdmin,isOwner}
        }
    return {username:"",roles:[],isManager,isAdmin,isOwner}
}
