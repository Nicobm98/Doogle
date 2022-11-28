const blankspace = /\S+/
const validString = /^[a-z]+$/i;
const validNumber = /^[0-9]+$/;
const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;

export default function validations(creationForm) {
  let errors = {};

  // Name validation
  if (!blankspace.test(creationForm.name) || !validString.test(creationForm.name)
    || creationForm.name.length < 4 || creationForm.name.length > 25) {
    
     errors.name = "Field required. Numbers and special characters are not allowed."
  }
//___________________________________________________________________________

// Weight and height validation
else if (!validNumber.test(creationForm.minWeight) || parseInt(creationForm.minWeight) < 0 || parseInt(creationForm.minWeight) > 100) {
    
     errors.minWeight = "Field required. Must be between 0 and 100."
  }

  else if (!validNumber.test(creationForm.maxWeight) || parseInt(creationForm.maxWeight) < 0 || parseInt(creationForm.maxWeight) > 100) {
    
     errors.maxWeight = "Field required. Must be between 0 and 100."
  }

  else if (+creationForm.minWeight >= +creationForm.maxWeight) {
    
     errors.minWeight = "The minimum weight cannot be greater or equal than the maximum weight";
  }

  else if (+creationForm.maxWeight <= +creationForm.minWeight) {
    
     errors.maxWeight = "The máximum weight cannot be less or equal than the minimum weight";
  }
  
  else if (!validNumber.test(creationForm.minHeight) || parseInt(creationForm.minHeight) < 0 || parseInt(creationForm.minHeight) > 100) {
    
     errors.minHeight = "Field required. Must be between 0 and 100."
  }

  else if (!validNumber.test(creationForm.maxHeight) || parseInt(creationForm.maxHeight) < 0 || parseInt(creationForm.maxHeight) > 100) {
    
     errors.maxHeight = "Field required. Must be between 0 and 100."
  }

  else if (+creationForm.minHeight >= +creationForm.maxHeight) {
    
     errors.minHeight = "The minimum height cannot be greater or equal than the maximum height";
  }

  else if (+creationForm.maxHeight <= +creationForm.minHeight) {
    
     errors.maxHeight = "The maximum height cannot be less or equal than the minimum height";
  }
//_______________________________________________________________________

//Life span validation
  else if (!validNumber.test(creationForm.minLifeSpan) || parseInt(creationForm.minLifeSpan) < 0 || parseInt(creationForm.minLifeSpan) > 100) {
    
     errors.minLifeSpan = "Field required. Must be between 0 and 100."
  }

  else if (!validNumber.test(creationForm.maxLifeSpan) || parseInt(creationForm.maxLifeSpan) < 0 || parseInt(creationForm.maxLifeSpan) > 100) {
    
     errors.maxLifeSpan = "Field required. Must be between 0 and 100."
  }

 else  if (+creationForm.minLifeSpan >= +creationForm.maxLifeSpan) {
    
     errors.minLifeSpan = "The minimum life span cannot be greater or equal than the maximum life span.";
  }

  else if (+creationForm.maxLifeSpan <= +creationForm.minLifeSpan) {
    
     errors.maxLifeSpan = "The maximum life span cannot be less or equal than the minimum life span";
  }
//___________________________________________________________________________

// Image validation
  else if (!validUrl.test(creationForm.image) || creationForm.image.length <= 0) {
    
     errors.image = "Image is required. Must be a valid URL.";
  }
//_____________________________________________________________________
return errors
}
