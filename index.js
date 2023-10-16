const fs = require('fs');
const XLSX = require('xlsx');
const workbook = XLSX.readFile('./translate.numbers');

const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

let langs = ['zh-CN', 'zh-TW', 'en-US', 'en-AU', 'ko-KR', 'es-ES', 'ru-RU', 'tr-TR', 'vi-VN', 'pt-BR'];

langs.forEach((lang) => {
  let startStr = `
  import prefix from './prefix'   
  export default {
  `;
  fs.appendFileSync(`./Acticity/${lang}.js`, startStr)
})

jsonData.slice(1).forEach(row => {
  row.slice(1).forEach((cell, index) => {
    let keyValue = `${[row[0]]}: "${cell}",\n`
    fs.appendFileSync(`./Acticity/${langs[index]}.js`, keyValue)
  });
})

langs.forEach((lang) => {
  let endStr = `}`;
  fs.appendFileSync(`./Acticity/${lang}.js`, endStr);
})

console.log(jsonData, "jsonData")