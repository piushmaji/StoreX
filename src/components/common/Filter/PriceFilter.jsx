import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

export default function PriceFilter() {
    const [price, setPrice] = React.useState([2000, 100000]);

    const handleChange = (event, newValue) => {
        setPrice(newValue);
    };

    return (
        <Box sx={{ width: "100%", px: 1 }}>

            {/* Title */}
            <Typography fontWeight="600" mb={1}>
                Price Range
            </Typography>

            {/* Slider */}
            <Slider
                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={200000}
                step={1000}
                getAriaLabel={() => "Price range"}
                valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
            />

            {/* Min - Max Text */}
            <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body2">
                    ₹{price[0].toLocaleString()}
                </Typography>

                <Typography variant="body2">
                    ₹{price[1].toLocaleString()}
                </Typography>
            </Box>

        </Box>
    );
}
