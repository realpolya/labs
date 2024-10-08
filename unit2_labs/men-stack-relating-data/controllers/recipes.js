import Router from "express";
const router = Router();
import User from "../models/user.js";
import Recipe from "../models/recipe.js";
import Ingredient from "../models/ingredient.js";
import ingredient from "../models/ingredient.js";

// RECIPE ROUTES
// GET all recipes
router.get('/', async (req, res) => {
    
    try {
        const user = await User.findById(req.session.user._id);
        const allRecipes = await Recipe.find({ owner: user._id });
        const allIngredients = await Ingredient.find();
        res.render('recipes/list.ejs', { user, allRecipes, allIngredients })
    } catch (err) {
        console.error(err);
    }
    
})

// GET new recipe page
router.get('/new', async (req, res) => {
    const user = req.session.user;
    console.log(user);

    // load ingredients
    const allIngredients = await Ingredient.find();
    res.render('recipes/new.ejs', { user, allIngredients })
})

// POST new recipe
router.post('/', async (req, res) => {
    
    try {
        const user = await User.findById(req.session.user._id);
        req.body.owner = user._id;
        req.body.ingredients = req.body["ingredients[]"];
        
        const recipe = await Recipe.create(req.body);
        console.log(recipe);

        // update ingredients (many-to-many)
        const usedIngredients = await Ingredient.find({ _id: {$in: recipe.ingredients} })

        usedIngredients.forEach( async (ingredient) => {
            ingredient.recipes.push(recipe._id);
            await ingredient.save();
        })

        console.log(usedIngredients);

        const allRecipes = await Recipe.find({ owner: user._id });

        // ingredients are needed to be displayed in the recipe table
        const allIngredients = await Ingredient.find()

        res.render('recipes/list.ejs', { allRecipes, allIngredients })
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
    
})

// GET individual recipe page
router.get("/:recipeId", async (req, res) => {

    try {
        const id = req.params.recipeId;
        const recipe = await Recipe.findById(id);
        const ingredients = await Ingredient.find({ _id: { $in: recipe.ingredients }});
        res.render('recipes/item.ejs', { recipe, ingredients })
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }

});

// DELETE page for recipe
router.delete("/:recipeId", async (req, res) => {
    
    try {
        const id = req.params.recipeId;
        const recipe = await Recipe.findByIdAndDelete(id);
        res.render('recipes/deleted.ejs', { recipe });
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }

})

// PUT page for recipe
router.put("/:recipeId", async (req, res) => {
    
    try {
        const user = await User.findById(req.session.user._id);
        req.body.owner = user._id;
        req.body.ingredients = req.body["ingredients[]"];

        const id = req.params.recipeId;
        let recipe = await Recipe.findByIdAndUpdate(id, req.body);
        recipe = await Recipe.findById(id);

        // update ingredients (many-to-many)
        const usedIngredients = await Ingredient.find({ _id: {$in: recipe.ingredients} })

        usedIngredients.forEach( async (ingredient) => {
            if (!ingredient.recipes.includes(recipe._id)) {
                ingredient.recipes.push(recipe._id);
            }
            await ingredient.save();
        })

        console.log(usedIngredients);

        const ingredients = await Ingredient.find({ _id: { $in: recipe.ingredients }});
        res.render('recipes/item.ejs', { recipe, ingredients });
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }

})

// GET edit page for recipe
router.get("/:recipeId/edit", async (req, res) => {

    try {
        const id = req.params.recipeId;
        const recipe = await Recipe.findById(id);
        const ingredients = await Ingredient.find({ _id: { $in: recipe.ingredients }});
        const allIngredients = await Ingredient.find();
        res.render('recipes/edit.ejs', { recipe, allIngredients, ingredients })
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
})



export default router;
