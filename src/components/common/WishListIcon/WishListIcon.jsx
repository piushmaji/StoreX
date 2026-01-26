import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function WishListIcon() {
    return (
        <div>
            <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{
                color: '#2B7FFF',
                "&.Mui-checked": {
                    color: "red",
                },
            }} />
        </div>
    );
}
