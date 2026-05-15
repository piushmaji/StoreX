import supabase from "./src/lib/Supabase/Supabase.jsx";

async function checkCategories() {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
        console.error(error);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
}

checkCategories();
