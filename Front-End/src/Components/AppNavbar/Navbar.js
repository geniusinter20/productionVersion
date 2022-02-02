import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { navItems } from "./NavItems";
import "./Navbar.css";
import "./Buttons.css";
import { Navbar, NavbarBrand, NavbarText, NavItem, NavbarToggler, Collapse, Nav } from 'reactstrap';
import logo1 from "../../Images/Logo1.svg";
import { Avatar, Badge } from 'antd';
import styled from "styled-components";
import { Menu, Dropdown,Button } from 'antd';
import { onlineTrainingMenu, aboutMenu } from "./NavItems";
import { MdLogout } from "react-icons/md"
import { FaUserCog, FaUserPlus } from "react-icons/fa"
import { signOut } from "../../Redux/Actions/UserAuthActions";
import { Typography } from '@mui/material';
import { MdOutlineShoppingCart } from "react-icons/md"
import { DownOutlined } from '@ant-design/icons'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function NavBar() {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenu1, setToggleMenu1] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const userInfo = useSelector(state => state.auth.userData)
  const navigate = useNavigate()
  const products = useSelector(state => state.cart.products)
  const auth = useSelector(state => state.auth)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const location = useLocation();
  //localStorage.removeItem("userToken")
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);
  useEffect(() => {
    setUserLogged(loggedIn)
  }, [loggedIn])
  const toggleHandle = (main, user) => {
    if (main) {
      setToggle1(false)
      setToggle(v => !v)
    }
    else if (user) {
      setToggle(false)
      setToggle1(v => !v)
    }
  };
  // var stringToColour = function (str) {
  //   var hash = 0;
  //   for (var i = 0; i < str.length; i++) {
  //     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   var colour = '#';
  //   for (var i = 0; i < 3; i++) {
  //     var value = (hash >> (i * 8)) & 0xFF;
  //     colour += ('00' + value.toString(16)).substr(-2);
  //   }
  //   return colour;
  // }
  const handleUserMenuClick = (key) => {
    switch (key) {
      case "signOut": {
        setUserLogged(false)
        dispatch(signOut())
        break;
      }
      case "createAccount": {
        dispatch(signOut())
        navigate("/register")
        break;
      }
      case "manageYourAccount": {
        navigate("/profile")
        break;
      }
      default:
        break;
    }
  }
  const menu = (
    <Menu>{
      onlineTrainingMenu.map(item => (
        <MyMenueItem >
          <Link to={item.path} >
            {item.title}
          </Link>
        </MyMenueItem>
      ))}

    </Menu>
  );
  const menuToggled = (
    <div>
      <NavItemD style={{ background: toggleMenu ? `#F8F8F8` : "white" }} onClick={() => setToggleMenu(!toggleMenu)}>
        <div style={{ fontWeight: "600", color: "#6c6c6c" }} >
          Online Training
        </div>
        <DownOutlined style={{ color: "#6c6c6c", fontSize: "15px", cursor: "pointer" }} rotate={toggleMenu ? 180 : 0} />
      </NavItemD>

      <Collapse isOpen={toggleMenu} style={{ background: "#F8F8F8" }}>

        {
          onlineTrainingMenu.map(item => (
            <NavItemD>
              <Link to={item.path}>
                {item.title}
              </Link>
            </NavItemD>
          ))}
      </Collapse ></div>
  );
  const menu1Toggled = (
    <div><NavItemD style={{ background: toggleMenu1 ? `#F8F8F8` : "white" }} onClick={() => setToggleMenu1(!toggleMenu1)}>
      <div style={{ fontWeight: "600", color: "#6c6c6c" }} >
        About
      </div>
      <DownOutlined style={{ color: "#6c6c6c", fontSize: "15px", cursor: "pointer" }} rotate={toggleMenu1 ? 180 : 0} />
    </NavItemD>
      <Collapse isOpen={toggleMenu1} style={{ background: "#F8F8F8" }}>

        {
          aboutMenu.map(item => (
            <NavItemD>
              <Link to={item.path}>
                {item.title}
              </Link>
            </NavItemD>
          ))}
      </Collapse ></div>
  );
  const menu1 = (
    <Menu>{
      aboutMenu.map(item => (
        <MyMenueItem >
          <Link to={item.path} >
            {item.title}
          </Link>
        </MyMenueItem>
      )
      )
    }
    </Menu>
  );
  const userMenu = (
    <UserMenu onClick={({ item, key, keyPath, domEvent }) => handleUserMenuClick(key)}>
      <UserMenueItem key="manageYourAccount">
        <MyCon>
          {userLogged ? auth.userData.imageID ? <Avatar src={`https://exporagenius.com:5000/image/${auth.userData.imageID}`} size={35}
          >

          </Avatar>
            : <MyAvatar style={{ borderStyle: "solid" }} size={35}
            >
              {userInfo.fullName.charAt(0).toUpperCase()}
            </MyAvatar> : <div></div>}
          <Typography style={{ width: "175px", fontSize: "13px", fontWeight: "500" }} component="div" noWrap={true}>
            {loggedIn ? userInfo.email : ""}
          </Typography>
        </MyCon>
      </UserMenueItem>
      <UserMenueItem key="manageYourAccount" icon={<FaUserCog style={{ height: "100%", width: "18px" }} />}>
        Manage your Acccount
      </UserMenueItem>
      <Menu.Divider />
      <UserMenueItem key="createAccount" icon={<FaUserPlus style={{ height: "100%", width: "18px" }} />} >
        Create new Account
      </UserMenueItem>
      <UserMenueItem key="signOut" icon={<MdLogout style={{ height: "100%", width: "18px" }} />} >
        Sign Out
      </UserMenueItem>
    </UserMenu>
  );
  return (
    <div>
      <div className="navbar1">

        <Link to="/" className="navbar-logo">
          <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 491.49 357.65"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="329.75" cy="350.65" r="7" /><path class="cls-1" d="M399.75,290a94.79,94.79,0,0,1-11.74-.58s-5,26.09-31,37.09c-1.5,1.5-5.81-17.82-54.3-24.19-12.4-1.63-27.68-2.41-46.55-1.78q-8.56.29-18.15,1c-16.88,1.41-30.22,1.42-40.71.44-13.08-1.22-31.93-4.36-35.68-19.48-2.79-11.23,5.84-23.09,14.53-29.36,1.49-1.08,17.45-8.63,17.86-6.6-.74-3.69-1.52-7.06-2.38-10.2a95.75,95.75,0,0,0-11.3-25.84c-5.34-8.8-12.07-16.86-17.44-25.57-1-1.56-1.9-3.15-2.76-4.76A65.92,65.92,0,0,1,155,168.82a45.29,45.29,0,0,1-1.79-14.1c.34-31.72,15.65-49.07,37.91-60.38s50.53-9.53,71.37,4.22c19.34,12.76,32,36,29.79,59.09-2.27,24-20.82,42.91-32.23,62.85-5.48,9.36-5,10-12,28,23.55-7.22,47.83-15.17,64.56-34.3,15.14-17.31,23.93-39.69,26.81-63.38a80.12,80.12,0,0,0,.29-16.09c-.34-4.17-.84-6.57-1.13-8.81-1.25-7.62-5.11-17.37-10.47-27.08-.58-1,11.9-4.64,13.07-4.79a27,27,0,0,1,13.92,2c9.7,4,17.41,12.25,28,14.08,14.36,2.47,24.73-9.2,27.45-22.3,5.22-25.24-18.43-38.1-40.52-35-14.66,2-28.95,8.17-41,16.66-4.65,3.28-9,6.91-13.6,10.29a102.29,102.29,0,0,0-7.23-8.28,119,119,0,0,0-192.61,31.85c-.06.13-.12.26-.19.39a97.32,97.32,0,0,0-1.65,79.58c.48,1.15,1,2.3,1.53,3.43a119.47,119.47,0,0,0,46.17,51.16l.08,0A76.45,76.45,0,0,0,104,312a75.67,75.67,0,0,0,.78,10.92c-20.59-7.82-36.88-23.27-44.71-42.51-34-13-58.82-45.5-60-83.93A93,93,0,0,1,75.6,102.13a161,161,0,0,1,250-67.26,68,68,0,0,1,110.52,77.05,93,93,0,0,1,55.4,83.36C492.42,246.57,451,289.32,399.75,290Z" /></g></g></svg>
        </Link>
        <ul className="nav-items">
          {navItems.map((item) => {
            if (item.title === "Online Training") {
              return (

                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <div>{item.title}</div>
                  </Dropdown>
                </li>

              );
            }
            if (item.title === "About") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown1(true)}
                  onMouseLeave={() => setDropdown1(false)}
                >
                  <Dropdown overlay={menu1} placement="bottomCenter">
                    <div ><MyLink to={item.path}>{item.title}</MyLink></div>
                  </Dropdown>
                </li>
              );
            }
            if (item.title === "Dashboard") {
              if (userLogged) {
                return (
                  <li key={item.id} className={item.cName}>
                    <MyLink to={!auth.userData.accountType ? "/mydashboard" : "/dashboard"}>{item.title}</MyLink>
                  </li>
                );
              }
              else return (
                <div></div>
              )
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}

        </ul>
        {
          !userLogged ? <ul className="Nav-batns">
            <li key="1" className="cartIcon">
              <Badge count={JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).productsWithID.length : 0} style={{ backgroundColor: "#5BCAD6", position: "absolute", top: "5px" }}>
                <MdOutlineShoppingCart onClick={() => navigate("/cart")} id="icon" style={{ marginTop: "3px", cursor: "pointer", fontSize: "35px", display: "flex", justifyContent: "space-around", color: "#6C6C6C" }} />
              </Badge>
            </li>
            <li key="2" className="Navbatn">
              <Link to="/login" state={{ previousPage: location.pathname }}>Log in</Link>
            </li>
            <li key="3" className="Navbatn1">
              <Link to="/register">Get started</Link>
            </li>
          </ul> :
            <ul className="Nav-batns-logged">
              <li key="1" className="cartIcon">
                <Badge count={JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).productsWithID.length : 0} style={{ backgroundColor: "#5BCAD6", position: "absolute", top: "5px" }}>
                  <MdOutlineShoppingCart onClick={() => navigate("/cart")} id="icon" style={{ marginTop: "3px", cursor: "pointer", fontSize: "35px", display: "flex", justifyContent: "space-around", color: "#6C6C6C" }} />
                </Badge>
              </li>
              <li key="2" >
                <Dropdown overlay={userMenu} placement="bottomRight">
                  {auth.userData.imageID ? <Avatar style={{cursor:"pointer"}} src={`https://exporagenius.com:5000/image/${auth.userData.imageID}`} size={45}
                  >

                  </Avatar>
                    : <MyAvatar style={{ borderStyle: "solid" }} size={45}
                    >
                      {userInfo.fullName.charAt(0).toUpperCase()}
                    </MyAvatar>}
                </Dropdown>

              </li>
            </ul>
        }
      </div>
      <div className="navbar2">
        <Navbar
          color="faded"
          light
        >
          <NavbarBrand
            className="me-auto"
            href="/"
            style={{ fontWeight: "600", color: "6c6c6c" }}
          >
            Genius
          </NavbarBrand>
          {userLogged ? <div style={{ marginRight: "20px", display: "flex", gap: "5px", alignItems: "center", cursor: "pointer" }}
            onClick={() => toggleHandle(false, true)}>
            {
              auth.userData.imageID ? <Avatar src={`https://exporagenius.com:5000/image/${auth.userData.imageID}`} size={40}
              >

              </Avatar>
                : <MyAvatar style={{ borderStyle: "solid" }} size={40}
                >
                  {userInfo.fullName.charAt(0).toUpperCase()}
                </MyAvatar>}
            <DownOutlined style={{ color: "#6c6c6c", fontSize: "15px", cursor: "pointer" }} rotate={toggle1 ? 180 : 0} />
          </div> : 
          <WButton size="sm" onClick={()=>navigate("/login")} >Sign In</WButton>}
          <NavbarToggler
            className="me-2"
            onClick={() => toggleHandle(true, false)}
          />
          <Collapse navbar isOpen={toggle1} style={{ paddingTop: "15px" }}>
            <Nav navbar >
              <NavItemD>
                <Link to="/profile">Manage Your Account</Link>
              </NavItemD>
              <NavItemD>
              <div style={{ cursor: "pointer" }} onClick={() => {
                  setUserLogged(false)
                  dispatch(signOut())
                  navigate("/register")
                }
                }>Create Account</div>
              </NavItemD>
              <NavItemD>
                <div style={{ cursor: "pointer" }} onClick={() => {
                  setUserLogged(false)
                  dispatch(signOut())
                  setToggle1(false)
                }
                }>Sign Out</div>
              </NavItemD>
            </Nav>
          </Collapse>

          <Collapse navbar isOpen={toggle} style={{ paddingTop: "15px" }}>
            <Nav navbar >
              {navItems.map((item) => {
                if (item.title === "Online Training") {
                  return menuToggled
                }
                if (item.title === "About") {
                  return menu1Toggled
                }
                if (item.title === "Dashboard") {
                  if (userLogged) {
                    return (
                      <NavItemD>
                        <Link to={!auth.userData.accountType ? "/mydashboard" : "/dashboard"}>{item.title}
                        </Link>
                      </NavItemD>
                    );
                  }
                  else return (
                    <div></div>
                  )
                }
                return (
                  <NavItemD>
                    <Link to={item.path}>
                      {item.title}
                    </Link>
                  </NavItemD>
                );
              })}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>

  );
}
const WButton = styled(Button)`
height: 37px;
font-weight: 600;
color: #6c6c6c;
margin-right: 20px;
&:hover{
    animation: mmm1 0.5s;
    animation-fill-mode: forwards;
}
@keyframes mmm1 {
    0% {
        color: #444444;
    background-color: white;
    border-color: white;
   }
     
   100% {
    color: white;
    background-color: #444444;
    border-color: #444444;
   }
}
`
const MyCon = styled.div`
display: flex;
align-items: center;
justify-content:space-between;

`
const NavItemD = styled(NavItem)`
display: flex;
align-items: center;
gap: 5px;
height:40px;
&:hover>*{
  animation: mmm 0.3s;
  animation-fill-mode: forwards;
}
`
const MyAvatar = styled(Avatar)`
 background-color: #6C6C6C;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 list-style-type: none;
 border-color: #6C6C6C
`
const MyLink = styled(Link)`
text-decoration: none;
    color: #303030;
    font-size: 1.1rem;
    border-radius: 5px;
    
`
const MyMenueItem = styled(Menu.Item)`
&>*{
  fill:#6C6C6C;
    color:#6C6C6C;
    font-weight: 400;
    margin: 5px 0 5px 0;
}
&:hover>*{
  animation: mmm 0.3s;
      animation-fill-mode: forwards;
}
@keyframes mmm {
    0% {
      color:#6C6C6C;
   }
     
   100% {
color: #5BCAD6;
   }
}
`
const UserMenueItem = styled(Menu.Item)`
font-size: 14px;
  fill:#6C6C6C;
  color:#6C6C6C;
  font-weight: 400;
  padding: 10px 15px 10px 15px;
`
const UserMenu = styled(Menu)`
width: 250px;
`
export default NavBar;