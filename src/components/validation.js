const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// функция придания инпуту стиля ошибки и текста ошибки
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

// функция удаления из инпута стиля ошибки и текста ошибки
function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '-';
}

// проверка валидности поля для показа ошибки
function isValid(formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

// проверка валидности одного из полей для активации/дизактивации кнопки
function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    })
}

// активация/дизактивация кнопки
function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    }
    else {
      buttonElement.disabled = false;
    }
  }

// добавление слушателей элементам формы
 function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

// массив форм страницы
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

// очистка валидации при закрытии и повторном открытии попапа
function clearValidation(formElement, validationConfig) {
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
  })

  const errorList = formElement.querySelectorAll(validationConfig.errorSelector);
  errorList.forEach((errorElement) => {
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '-';
  })

  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  buttonElement.disabled = true;
}

export {enableValidation, clearValidation, validationConfig};