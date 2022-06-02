const input = document.querySelector('#input')
const btn = document.querySelector('#searchBtn')
const output = document.querySelector('#output')
const form = document.querySelector('#form')

const API_Cocktail = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
const API_cocktail_bn = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
const API1 = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
const API_ingredient = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i='

const getCocktail = async()=>{
    const url = API_Cocktail
    const req = await fetch(url)
    const res = await req.json()
    // console.log(res);
    renderCocktail(res)
}
const card = document.createElement('div')
const renderCocktail = (info) => {
    info.drinks.map((el) =>{
      const card = document.createElement('div')
        // card.className = card
        let card_name = document.createElement('h3')
        let card_image = document.createElement('img')
        let card_id = document.createElement('p')
        card_name.innerHTML = el.strDrink
        card_image.src = el.strDrinkThumb
        card_id.innerHTML = el.idDrink
        
        card.style.cssText = 
        `
       text-align: center;
   
        `
      card_image.style.cssText =
        `
        width: 300px;
        `
      card_name.style.cssText =
      `
      text-transform: uppercase;

      `
      card_id.style.cssText = 
      `
      text-transform: uppercase;

      `

      
        card.append(card_name,card_image, card_id)
        output.append(card)
        card.addEventListener('click', ()=>{
          output.innerHTML=''
          const id = el.idDrink
          console.log(id);
          getKocktailById(id)
        })
    })    
    
}
getCocktail()

const cocktail_letter_ing = async(e) =>{
e.preventDefault()
    const url1 = API_cocktail_bn + input.value
    // const url1 = API_cocktail_ing + input.value.toUpperCase()
    const req1 = await fetch(url1)
    const res1 = await req1.json()
    console.log(res1);
    renderCocktail(res1)
}

btn.addEventListener('click', (e) => {
    output.innerHTML = ""
    cocktail_letter_ing(e)
    input.value=''
 
})

card.addEventListener('click',()=>{
  output.innerHTML = ''
  searchById()
})


const getKocktailById = async (id) => {
  let request1 = await fetch(API1 + id)
  let response1 = await request1.json()
  console.log(response1)
  renderIngr(response1.drinks)
 
 }

 const renderIngr = (info) => {
  info.map((el) => {
   const card1 = document.createElement('div')
   const card12 = document.createElement('div')
   const strImage = document.createElement('img')
   strImage.src = el.strDrinkThumb
   const name1 = document.createElement('h3')
   name1.innerHTML = el.strDrink
   const strAlc = document.createElement('h4')
   strAlc.innerHTML = el.strAlcoholic
   const strCat = document.createElement('h4')
   strCat.innerHTML = el.strCategory
   const strDescrip = document.createElement('h5')
   strDescrip.innerHTML = el.strInstructions
   const strIngr = document.createElement('h4')
   strIngr.innerHTML = el.strInstructionsDE
   const strIngr1 = document.createElement('h5')
   strIngr1.innerHTML = el.strIngredient1
   const strIngr2 = document.createElement('h5')
   strIngr2.innerHTML = el.strIngredient2
   const strIngr3 = document.createElement('h5')
   strIngr3.innerHTML = el.strIngredient3
   const strIngr4 = document.createElement('h5')
   strIngr4.innerHTML = el.strIngredient4

   strIngr1.addEventListener('click', ()=>{
    output.innerHTML = ""
    getIngredientByName(el.strIngredient1)
  })
  strIngr2.addEventListener('click', ()=>{
    output.innerHTML = ""
    getIngredientByName(el.strIngredient2)
  })
  strIngr3.addEventListener('click', ()=>{
    output.innerHTML = ""
    getIngredientByName(el.strIngredient3)
  })
  strIngr4.addEventListener('click', ()=>{
    output.innerHTML = ""
    getIngredientByName(el.strIngredient4)
  })


   card1.append(name1, strAlc, strCat, strDescrip, strIngr, strIngr1, strIngr2, strIngr3, strIngr4)
   card12.append(strImage)
   output.append(card12, card1)
  })
}
 


 const getIngredientByName = async (ingredient) => {
  let request2 = await fetch(API_ingredient + ingredient)
  let response2 = await request2.json()
  console.log(response2)
  renderIngredientByName(response2.ingredients)
 
 }


 const renderIngredientByName = (info) => {
  info.map((el) => {
   const card2 = document.createElement('div')
   card2.classList.add ("ingredient_card")

   const alcohol = document.createElement('p')
   alcohol.innerHTML = "Alcohol: "  +  el.strAlcohol

   const description = document.createElement('p')
   description.innerHTML = "Ingredient description: " + el.strDescription

   const ingredientOne = document.createElement('p')
   ingredientOne.innerHTML = "Ingredient : " + el.strIngredient

   const type = document.createElement('p')
   type.innerHTML = "Type : " + el.strType



   card2.append(alcohol, description, ingredientOne, type)
   output.append(card2)
  })
}

