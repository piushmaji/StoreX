import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useWishList } from '../../../context/WishListContext/WishListContext';
const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function WishListIcon({ product }) {

    const { isInWishList, toggleWishList } = useWishList()
    if (!product) {
        console.error("WishListIcon: product is missing");
        return null;
    }
    return (
        <div>
            <Checkbox {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}

                checked={isInWishList(product.id)}
                onChange={() => toggleWishList(product)}
                sx={{
                    color: '#2B7FFF',
                    "&.Mui-checked": {
                        color: "red",
                    },
                }} />
        </div>
    );
}
