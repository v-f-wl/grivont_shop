export const colorsPallet: Colors = {
  "Black": { value: "Черный", color: "#000000" },
  "White": { value: "Белый", color: "#FFFFFF" },
  "Red": { value: "Красный", color: "#FF0000" },
  "Blue": { value: "Синий", color: "#0000FF" },
  "Green": { value: "Зеленый", color: "#008000" },
  "Pink": { value: "Розовый", color: "#FF69B4" },
  "Purple": { value: "Фиолетовый", color: "#800080" },
  "Gold": { value: "Золотой", color: "#FFD700" },
  "Silver": { value: "Серебряный", color: "#C0C0C0" },
  "Teal": { value: "Бирюзовый", color: "#008080" },
  "Orange": { value: "Оранжевый", color: "#FFA500" },
  "Magenta": { value: "Пурпурный", color: "#FF00FF" },
  "Lime": { value: "Лаймовый", color: "#00FF00" },
  "Cyan": { value: "Циан", color: "#00FFFF" },
  "NavyBlue": { value: "Темно-синий", color: "#000080" }
};

export const colorsPalletReverce: { [key: string]: string } = {
  "Черный": "Black",
  "Белый": "White",
  "Красный": "Red",
  "Синий": "Blue",
  "Зеленый": "Green",
  "Розовый": "Pink",
  "Фиолетовый": "Purple",
  "Золотой": "Gold",
  "Серебряный": "Silver",
  "Бирюзовый": "Teal",
  "Оранжевый": "Orange",
  "Пурпурный": "Magenta",
  "Лаймовый": "Lime",
  "Циан": "Cyan",
  "Темно-синий": "NavyBlue"
};

export interface ColorInfo {
  value: string;
  color: string;
}

export interface Colors {
  [key: string]: ColorInfo;
}