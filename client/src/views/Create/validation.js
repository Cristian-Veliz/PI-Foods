
export default function validation({ name, summary, healthScore, steps, image, diets , recipe}) {
    let error = {};
    let RegExpression = /^https?:\/\/.*\.(jpg|png|gif)$/
    const titleSearch = (name) => recipe.some(recipe => recipe.title === name);

    //NAME
    if (!name) {
        error.name = "A name is required"
    }
    
    if (titleSearch(name)) {
        error.name = "A recipe with that name is already existing"
    }
    if (name.length > 200) {
        error.name = "The name can't be longer than 30 characters"
    }

    //SUMMARY
    if (!summary) {
        error.summary = "A summary is required"
    }
    if (summary.length < 30) {
        error.summary = "The summary cannot be less than 30 characters."
    }
    if (summary.length > 2300) {
        error.summary = "The summary can't be longer than 2300 characters"
    }

    //HEALTH SCORE healthScore
    if (!healthScore) {
        error.healthScore = "A health score is required"
    }
    if(healthScore.length > 3){
        error.healthScore = "The health score can't be longer than 3 characters"
    }
    if(healthScore <= 0 || healthScore > 100){
        error.healthScore = "Health Score must be between 0 and 100"
    }
    //STEPS
    if (!steps) {
        error.steps = "A steps is required"
    }
    if (steps.length > 2300) {
        error.steps = "The steps can't be longer than 4000 characters"
    }
    if (summary.length < 50) {
        error.steps = "The steps cannot be less than 50 characters."
    }
    //IMAGE
    if(!image){
        error.image = "A image is required"
    }
    if (!RegExpression.test(image)) {
        error.image = "Image URL does not meet the requirement (JPG, GIF, PNG)"
    }
    //DIETS
    if (!diets.length) {
        error.diets = 'Must choose a diets'
    }
    
    return error
}

  