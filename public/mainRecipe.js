const addIngredient = document.querySelector("#addIngredient");
const measureType = document.querySelector("#measuretype");
const measureQty = document.querySelector("#measureqty");
const ingredient = document.querySelector("#ingredient");
const formDiv = document.querySelector("#ingredientCollection");
const submitRecipe = document.querySelector('#submitRecipe');
const recipe = document.querySelector('#recipe');
const recipeName = document.querySelector('#name');
const recipeInstruction = document.querySelector('#instruction')


submitRecipe.addEventListener("click", (e)=>{
    recipe.submit();
})

addIngredient.addEventListener("click", (e) => {
  console.log("Hello");
  console.log(measureType.value, measureQty.value, ingredient.value)
if (!((measureType.value === 'none') || (measureQty.value ==='none') || (ingredient.value ==="none"))){
  newmeasuretype = document.createElement("input");
  newmeasuretype.type="text";
  newmeasuretype.id="measuretype"
  newmeasuretype.name="measuretype"
  newmeasuretype.value= measureType.value;
  measureType.selectedIndex = 0;

  newmeasureqty = document.createElement("input");
  newmeasureqty.type="text";
  newmeasureqty.id="measureqty"
  newmeasureqty.name="measureqty"
  newmeasureqty.value = measureQty.value;
  measureQty.selectedIndex = 0;

 

  ingId = document.createElement("input");
  ingId.id= "ingredient";
  ingId.type="hidden"
  ingId.name="ingredient1"
  ingId.value = ingredient.value;
  
  ing = document.createElement("input");
  ing.id= ingredient.value;
  ing.type="text"
  ing.name=ingredient.value
  ing.value = ingredient.options[ingredient.selectedIndex].text;
  ingredient.selectedIndex = 0;

  formDiv.appendChild(newmeasureqty);
  formDiv.appendChild(newmeasuretype);
  formDiv.appendChild(ing);
  formDiv.appendChild(ingId);
  enableRecipeSubmit();
  M.toast({html: 'Ingredient added!', classes: 'rounded'});
 
}
});

function enableRecipeSubmit(){
    console.log(recipeName.value)
 if(!((recipeName.value==="") || (recipeInstruction.value ==="") || (formDiv.childElementCount === 4) )){
    submitRecipe.style.display="block"
 }

    
}

function init(){
    submitRecipe.style.display = "none"
}

init();

