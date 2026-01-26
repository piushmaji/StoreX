import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function StarRating({ value, precision = 0.5, size = "small" }) {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" value={Number(value) || 0} precision={precision} size={size} readOnly />
        </Stack>
    );
}
