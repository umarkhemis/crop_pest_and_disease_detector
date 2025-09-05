
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem,
  ListItemText, ListItemIcon, Divider, Box, CssBaseline, Menu, MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import ForumIcon from "@mui/icons-material/Forum";
import HelpIcon from "@mui/icons-material/Help";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MicIcon from '@mui/icons-material/Mic';
import ListAltIcon from "@mui/icons-material/ListAlt";
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from "./AuthContext";
import API from "../api";
import logo from '../assets/logo.png';

const drawerWidth = 280;
const navbarHeight = 64;

const Navbar = ({ setSelectedHistory, sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  // Advanced dropdown menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
      };

  useEffect(() => {
    if (user) {
      API.get("/history/")
        .then(response => setHistory(response.data))
        .catch(error => console.error("Error fetching history:", error));
    } else {
      setHistory([]);
      setSelectedHistory(null);
    }
  }, [user, setSelectedHistory]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position='fixed' sx={{ backgroundColor: "black", zIndex: 1300, height: '70px' }}>
        <Toolbar>
          {user && (
            <IconButton color="inherit" onClick={handleSidebarToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }} component={Link} to="/">
            <img src={logo} alt="Logo" style={{ width: 60, height: 60, marginRight: 10, borderRadius: '50px' }} />
          </Box>

          {/* Navigation Links */}
          {user ? (
            <>
              <Button component={Link} to="/" sx={{ color: "#FFD700", marginLeft: '40px' }} startIcon={<HomeIcon />}>
                Home
              </Button>
              <Button component={Link} to="/forum" sx={{ color: "#1E90FF", marginLeft: '40px' }} startIcon={<ForumIcon />}>
                Community
              </Button>
              <Button component={Link} to="/help" sx={{ color: "#32CD32", marginLeft: '40px' }} startIcon={<HelpIcon />}>
                AgriBot
              </Button>

              {/* ADVANCED Dropdown */}
              <Button
                sx={{ color: "#00FFFF", marginLeft: "40px" }}
                onClick={handleMenuOpen}
                endIcon={<ExpandMoreIcon />}
              >
                Advanced
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/voice-query" onClick={handleMenuClose}>
                  <ListItemIcon><MicIcon /></ListItemIcon>
                  <ListItemText primary="Voice Query" />
                </MenuItem>
                <MenuItem component={Link} to="/predict-outbreak" onClick={handleMenuClose}>
                  <ListItemIcon><ListAltIcon /></ListItemIcon>
                  <ListItemText primary="Predict Outbreak" />
                </MenuItem>
                <MenuItem component={Link} to="/object-detection" onClick={handleMenuClose}>
                  <ListItemIcon><SearchIcon /></ListItemIcon>
                  <ListItemText primary="Object Detection" />
                </MenuItem> 
              </Menu>

              <Button
                onClick={() => {
                  logout();
                  setSelectedHistory(null);
                }}
                sx={{ color: "#DC143C", ml: 2, marginLeft: '40px' }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/" sx={{ color: "#FFD700", marginLeft: '80px' }} startIcon={<HomeIcon />}>
                Home
              </Button>
              <Button component={Link} to="/login" sx={{ color: "#FF69B4", marginLeft: '40px' }} startIcon={<LoginIcon />}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ color: "#9400D3", marginLeft: '20px' }} startIcon={<PersonAddIcon />}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <hr />

      {/* Sidebar (Drawer) */}
      {user && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={sidebarOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "#2E2E2E",
              color: "#FFF",
              marginTop: `${navbarHeight}px`,
            }
          }}
        >
          <Typography variant="h6" sx={{ p: 2, textAlign: "center", fontWeight: "bold", color: "#00ADB5" }}>
            📜 My History
          </Typography>
          <Divider />

          <List>
            {history.length > 0 ? (
              history.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => setSelectedHistory(item)}
                  sx={{ "&:hover": { backgroundColor: "#393E46", cursor: "pointer" } }}
                >
                  <ListItemIcon sx={{ color: "#FFD700" }}><HistoryIcon /></ListItemIcon>
                  <ListItemText primary={item.result} />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ p: 2, textAlign: "center", color: "#B0B0B0" }}>No history available</Typography>
            )}
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar;



























// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { 
//   AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, 
//   ListItemText, ListItemIcon, Divider, Box, CssBaseline,
//   Collapse
// } from "@mui/material";
// // import {CssBaseline} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import HomeIcon from "@mui/icons-material/Home";
// import HistoryIcon from "@mui/icons-material/History";
// import ForumIcon from "@mui/icons-material/Forum";
// import HelpIcon from "@mui/icons-material/Help";
// import LoginIcon from "@mui/icons-material/Login";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// // import AuthContext from "../Pages/AuthContext";
// import { AuthContext } from "./AuthContext";
// import API from "../api";
// import logo from '../assets/logo.png'

// const drawerWidth = 280; // Width of Sidebar
// const navbarHeight = 64; // Height of Navbar

// const Navbar = ({ setSelectedHistory, sidebarOpen, setSidebarOpen }) => {
//   const { user, logout } = useContext(AuthContext);
//   const [history, setHistory] = useState([]);

//   // Toggle sidebar visibility
//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // Fetch user-specific history
//   useEffect(() => {
//     if (user) {
//       API.get("/history/")
//         .then(response => setHistory(response.data))
//         .catch(error => console.error("Error fetching history:", error));
//     } else {
//       setHistory([]);
//       setSelectedHistory(null); // Clear history on logout
//     }
//   }, [user, setSelectedHistory]);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* App Bar (Navbar) */}
//       <AppBar position='fixed' sx={{ backgroundColor: "black", zIndex: 1300, height: '70px' }}>
//         <Toolbar>
//           {user && (
//             <IconButton color="inherit" onClick={handleSidebarToggle} sx={{ mr: 2 }}>
//               <MenuIcon />
//             </IconButton>
//           )}

//           {/* <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#00ADB5" }}>
//             AgriTech🌱
//           </Typography> */}

//           <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }} component={Link} to="/">
//             <img src={logo} alt="Logo" style={{width: 60, height: 60, marginRight: 10, borderRadius: '50px' }} />
            
//           </Box>

//           {/* Navigation Links */}
//           {user ? (
//             <>
//               <Button component={Link} to="/" sx={{ color: "#FFD700", marginLeft: '40px' }} startIcon={<HomeIcon />}>
//                 Home
//               </Button>
//               <Button component={Link} to="/forum" sx={{ color: "#1E90FF", marginLeft: '40px' }} startIcon={<ForumIcon />}>
//                 Community
//               </Button>
//               <Button component={Link} to="/help" sx={{ color: "#32CD32", marginLeft: '40px' }} startIcon={<HelpIcon />}>
//                 Help
//               </Button>
//               <Button
//                 onClick={() => {
//                   logout();
//                   setSelectedHistory(null); // Hide history when user logs out
//                 }}
//                 sx={{ color: "#DC143C",  ml: 2, marginLeft: '40px' }}
//                 startIcon={<LogoutIcon />}
//               >
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button component={Link} to="/" sx={{ color: "#FFD700", marginLeft: '80px' }} startIcon={<HomeIcon />}>
//                 Home
//               </Button>
//               <Button component={Link} to="/login" sx={{ color: "#FF69B4", marginLeft: '40px' }} startIcon={<LoginIcon />}>
//                 Login
//               </Button>
//               <Button component={Link} to="/register" sx={{ color: "#9400D3", marginLeft: '20px' }} startIcon={<PersonAddIcon />}>
//                 Register
//               </Button>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>

//       <hr />
//       {/* Sidebar (Drawer) */}
//       {user && (
//         <Drawer
//           variant="persistent"
//           anchor="left"
//           open={sidebarOpen}
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": { 
//               width: drawerWidth, 
//               backgroundColor: "#2E2E2E", 
//               color: "#FFF", 
//               marginTop: `${navbarHeight}px`,
//             }
//           }}
//         >
//           <Typography variant="h6" sx={{ p: 2, textAlign: "center", fontWeight: "bold", color: "#00ADB5" }}>
//             📜 My History
//           </Typography>
//           <Divider />

//           <List>
//             {history.length > 0 ? (
//               history.map((item, index) => (
//                 <ListItem 
//                   button 
//                   key={index} 
//                   onClick={() => setSelectedHistory(item)}
//                   sx={{ "&:hover": { backgroundColor: "#393E46", cursor: "pointer" } }}
//                 >
//                   <ListItemIcon sx={{ color: "#FFD700" }}><HistoryIcon /></ListItemIcon>
//                   <ListItemText primary={item.result} />
//                 </ListItem>
//               ))
//             ) : (
//               <Typography sx={{ p: 2, textAlign: "center", color: "#B0B0B0" }}>No history available</Typography>
//             )}
//           </List>
//         </Drawer>
//       )}
//     </Box>
//   );
// };

// export default Navbar;
