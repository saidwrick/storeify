import { useEffect, useState } from 'react';

function CategoryDropdown(props) {
    
    const [categories, setCategories] = useState([])
    const [addCat, setAddCat] = useState("");

    async function getCategories(){
        try {
            let res = await fetch("/categories", {
                method: "GET",
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setCategories(resJson);
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                //navigate 404
            }
        } 
        catch (err) {
            console.log(err);
            // navigate("/404", { state: {err: err}});
        }
    }

    function handleCatClick(e){
        props.categoryChange(e.target.getAttribute("data-key"), e.target.textContent)
    }

    function handleAddCatClick(e){
        e.stopPropagation();
    }

    async function handleAddCatSubmit(e){
        if (e.key === "Enter"){
            try {
                let res = await fetch("/categories", {
                    method: "POST",
                    headers:{
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": addCat
                    })
                });
                
                let resJson = await res.json();
                
                if (res.status === 200) {
                    console.log("success");
                    console.log(resJson);
                    getCategories();
                    setAddCat("");
                } 
                else {
                    console.log(res.status);
                    console.log(resJson);
                    //navigate 404
                }
            } 
            catch (err) {
                console.log(err);
                // navigate("/404", { state: {err: err}});
            }
        }
    }

    useEffect(() => {
        getCategories();
    },[])

    if (!props) {
        return null;
    }

    return (
        <div className = "category-dropdown">
            <input type="text" minLength="3" 
                placeholder={"-add new category-"} 
                onClick={handleAddCatClick}
                onChange={(e)=> setAddCat(e.target.value)}
                onKeyDown={handleAddCatSubmit}
                value={addCat}>
            </input>
            {categories.map(e => <div className="option" onClick={handleCatClick} key={e.category_id} data-key={e.category_id}>{e.name}</div>)}
        </div>
    );
}

export default CategoryDropdown;
