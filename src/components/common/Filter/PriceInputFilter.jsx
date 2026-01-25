import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function PriceInputFilter({ onApply }) {
    const [minPrice, setMinPrice] = React.useState("");
    const [maxPrice, setMaxPrice] = React.useState("");

    const handleApply = () => {
        const min = Number(minPrice);
        const max = Number(maxPrice);

        if (min < 0 || max < 0 || min > max) {
            alert("Invalid price range");
            return;
        }

        onApply?.({ min, max });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                {/* Min */}
                <TextField
                    type="number"
                    size="small"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    InputProps={{
                        startAdornment: "₹",
                    }}
                    sx={{ width: "100px" }}
                />

                {/* Max */}
                <TextField
                    type="number"
                    size="small"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    InputProps={{
                        startAdornment: "₹",
                    }}
                    sx={{ width: "100px" }}
                />
            </Box>
            {/* Apply */}
            <Box>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleApply}
                >
                    Apply
                </Button>
            </Box>
        </Box>
    );
}
