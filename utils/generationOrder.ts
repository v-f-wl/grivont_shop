export function generateOrderNumber(length: number): string {
  const digits = '123456789'; // Возможные цифры для номера, исключая 0
  let orderNumber = '';

  // Генерируем первую цифру случайным образом из допустимых цифр
  const firstDigitIndex = Math.floor(Math.random() * digits.length);
  orderNumber += digits[firstDigitIndex];

  // Генерируем остальные цифры номера
  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    orderNumber += digits[randomIndex];
  }

  return orderNumber;
}