export default function useLocalStorage(key, value = null) {
  return [
    localStorage.getItem(key) === null ? value : localStorage.getItem(key),
    (saveValue) => {
      localStorage.setItem(key, saveValue);
    },
    (key) => {
      localStorage.removeItem(key);
    },
  ];
}
