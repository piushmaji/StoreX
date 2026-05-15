import supabase from "./src/lib/Supabase/Supabase.js";

async function checkProducts() {
    const { data, error } = await supabase.from("products").select("*").limit(5);
    if (error) {
        console.error(error);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
}

checkProducts();
