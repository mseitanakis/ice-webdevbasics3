// This is where your JS goes!

fetch('https://cs571api.cs.wisc.edu/rest/f24/ice/chili', {
    headers: {
        "X-CS571-ID": CS571.getBadgerId() // You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);
    console.log("The 5-star ratings are...")
    console.log(data.reviews.filter(r => r.rating ===5).map(r => r.txt))

    console.log("The main instructions are...")
    console.log(data.recipe.map(inst => inst.split(":")[0]))

    console.log("The ingredients are...")
    console.log(Object.keys(data.ingredients).map(name => data.ingredients[name].amount + " " + name))
    
    console.log("Is there some instruction to bake?...")
    console.log(data.recipe.map(inst => inst.split(":")[0]).some(inst => inst.toLowerCase().includes("bake")))

    console.log("Is ever review 4 or 5 stars?")
    console.log(data.reviews.every(r => r.rating >= 4))

    console.log("What are the unique units?")
    console.log(Object.keys(data.ingredients).reduce((acc, curr) => {
        const ingrObj = data.ingredients[curr];
        if (ingrObj.unit && !acc.includes(ingrObj.unit)) {
            acc.push(ingrObj.unit)
        }
        return acc;
        // if it has a unit, have we included it?

        // if not, add it to the list
    }, []))

})
.catch(err => {
    alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
})