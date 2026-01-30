import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

import { Link } from "react-router-dom";

export default function SideDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    const menuItems = [
        {
            text: "Profile",
            icon: <PersonIcon />,
            path: "/profile",
        },
        {
            text: "Wishlist",
            icon: <FavoriteIcon />,
            path: "/wishlist",
        },
        {
            text: "Cart",
            icon: <ShoppingCartIcon />,
            path: "/cart",
        },
        {
            text: "Store",
            icon: <StoreIcon />,
            path: "/product",
        },
    ];

    const DrawerList = (
        <Box
            sx={{ width: 260 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2,
                    fontSize: 20,
                    fontWeight: "bold",
                    borderBottom: "1px solid #eee",
                    textAlign: "center",
                }}
            >
                StoreX
            </Box>

            {/* Menu */}
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            sx={{
                                py: 1.5,
                                "&:hover": {
                                    backgroundColor: "#e3f2fd",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "#1976d2" }}>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {/* Hamburger Icon */}
            <MenuIcon
                onClick={toggleDrawer(true)}
                sx={{
                    cursor: "pointer",
                    fontSize: 30,
                }}
            />

            {/* Drawer */}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}
