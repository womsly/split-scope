import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';
import classes from './Sidebar.module.scss'
// icons
import { AiOutlineClockCircle , AiOutlineFile } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { HiOutlineLockOpen } from "react-icons/hi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlinePayments, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight  } from "react-icons/md";
import { PiStack } from "react-icons/pi";
import { RiUserSettingsLine  } from "react-icons/ri";
import { TbArrowLoopRight2 } from "react-icons/tb";
import { Axios } from 'axios';

const actions = [
  {
    id: 1,
    action: "Hours",
    icon: <AiOutlineClockCircle  />,
    path: "/home",
    authLevel: 1,
  },
  {
    id: 2,
    action: "Projects",
    icon: <AiOutlineFile />,
    path: "/project",
    authLevel: 1,
  }
]


const team = [
  {
    id: 1,
    action: "Chats",
    icon: <IoChatboxEllipsesOutline />,
    path: "/chat",
    authLevel: 1,
  },
  {
    id: 2,
    action: "Sprints",
    icon: <TbArrowLoopRight2 />,
    path: "/sprint",
    authLevel: 1,
  },
  {
    id: 2,
    action: "Performance",
    icon: <PiStack />,
    path: "/performance",
    authLevel: 2,
  },
]

const manage = [
  {
    id: 1,
    action: "Employees",
    icon: <FiUsers />,
    path: "/employees",
    authLevel: 2,
  },
  {
    id: 2,
    action: "Clients",
    icon: <RiUserSettingsLine />,
    path: "/client",
    authLevel: 2,
  },
  {
    id: 3,
    action: "Authorize",
    icon: <HiOutlineLockOpen />,
    path: "/authorize",
    authLevel: 2,
  },
  {
    id: 4,
    action: "Payments",
    icon: <MdOutlinePayments />,
    path: "/payment",
    authLevel: 2,
  },
]




function Sidebar() {
  const [admin, setAdmin] = useState(false);
  const [small, setSmall] = useState(false);
  const {user, logout} = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
    } catch (e) {
      appConsole.log(e)
    }
  }

  const handleSidebarShrink = () => {
    setSmall(!small);
  }

  useEffect(() => {
    if (user.authLevel >= 5) { setAdmin(true) } else { setAdmin(false) }
  }, [user])

  return (
    <div className={small ? classes.shrunk : classes.sidebar_container}>
      <div className={classes.sidebar_group}>
        <div className={classes.sidebar_header}>
          {!small ? <Link to="/account"><h2>{!user.displayName ? user.email : user.displayName}</h2></Link> : "" }
          <span onClick={handleSidebarShrink}>
            {!small ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight /> }
          </span>
        </div>
        <div className={classes.sidebar_actions}>
          {/* <p>Action</p> */}
          <div className={classes.sidebar_actions_details}>

            {actions.map((action) => {  
              if (
                (admin && action.authLevel > 1) ||
                (action.authLevel === 1)
                ) {
                return(
                  <Link to={action.path}
                    key={`${action.id}_${action.path}`}>
                      <div className={classes.actions_group}>
                        <div className={classes.action_type}>

                          {action.icon}
                          {small ? "": action.action} 
                        </div>
                      </div>
                  </Link>
                )
              }
            })
              
            }
          </div>
        </div>
        <div className={classes.sidebar_actions}>
          {/* <p>Team</p> */}
          <div className={classes.sidebar_actions_details}>
            {team.map((team) => {  
              if (
                (admin && team.authLevel > 1) ||
                (team.authLevel === 1)
                ) {
                return(
                  <Link to={team.path}
                    key={`${team.id}_${team.path}`}>
                      <div className={classes.actions_group}>
                        <div className={classes.action_type}>

                          {team.icon}
                          {small ? "": team.action} 
                        </div>
                      </div>
                  </Link>
                )
              }
            })}
          </div>
        </div>
        <div className={classes.sidebar_actions}>
          {admin ? 
            <>
              {/* <p>Admin</p> */}
              <div className={classes.sidebar_actions_details}>
                {manage.map((admin) => {  
                  return(
                    <Link to={admin.path}
                    key={`${admin.id}_${admin.path}`}>
                        <div className={classes.actions_group}>
                          <div className={classes.action_type}>

                            {admin.icon}
                            {small ? "": admin.action} 
                          </div>
                        </div>
                    </Link>
                  )
                })}
              </div>
            </>
            :
            <></>
            
          }
        </div>
        <div className={classes.sidebar_actions}>
          <div>
            <a onClick={handleLogout}>
              <div className={classes.actions_group}>
                <div className={classes.action_type}>
                  <CiLogout />
                  {small ? "": "Log out"} 
                </div>

              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar