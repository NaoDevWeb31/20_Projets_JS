const inputDate = document.querySelector("input[type=date]");

const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // additionner une semaine en ms
// console.log(nextWeek);
let day = ("" + nextWeek).slice(8, 10);
// console.log(day);
let month = ("" + (nextWeek.getMonth() + 1)).slice(-3);
// console.log(month);
let year = today.getFullYear();
inputDate.value = `${year}-${month}-${day}`;
