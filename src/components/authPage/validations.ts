
// Проверяет никнейм на то что он содержит только латинсике буквы, цифры и разрешенные символы 
// В случае наличия других символов выводит false
export function isValidNick(input: string): boolean {
  const pattern = /^[a-zA-Z0-9_\-/]*$/
  return pattern.test(input)
}


// Проверяет пароль на то что он не содержит пробела
// В случае наличия пробелов выводит false
export function isValidPassword(input: string): boolean {
  const pattern = /^[a-zA-Z0-9]+$/;
  const noSpacesPattern = /^[^\s]+$/
  return pattern.test(input) && noSpacesPattern.test(input)
}
  
// Проверка на то, что в поле нет цифры
// Если цифра имеется выводит false
export function isValidName(input: string): boolean {
  const pattern = /[0-9\s]/
  return !pattern.test(input)
}
