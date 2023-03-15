import xlsx from 'node-xlsx';

const workSheetsFromFile = xlsx.parse(`item_mapping_config_excel.xlsx`);

console.log(workSheetsFromFile);
console.log(JSON.stringify(workSheetsFromFile));