import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";

const settings = ["Profile", "Account", "Dashboard"];

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),

  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 50,
    minWidth: 450,
  },
}));

function Appbar() {
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();
  const socket=React.useRef()
  const {userData}=useSelector((state)=>state.user)

 React.useEffect(() => {
    socket.current = io("http://localhost:4000", { secure: true })
  }, [])
  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <StyledToolbar>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <Button
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    textAlign: "center",
                    ml: 1,
                  }}
                  onClick={() => {
                    
                    localStorage.removeItem("token");
                    localStorage.removeItem("userData");
                    setState(true);
                    navigate("/login");
                    socket.current.emit("logOut", userData._id)

                    
                  }}
                >
                  Logout
                </Button>
              </Menu>
            </Box>
            <Box>
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                sx={{ marginLeft: 40 }}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;
