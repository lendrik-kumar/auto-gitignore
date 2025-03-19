#!/usr/bin/env node

import axios from 'axios';
import fs from 'fs';
import inquirer from 'inquirer';

const GITIGNORE_IO_API = 'https://www.toptal.com/developers/gitignore/api/';

async function fetchGitignoreData(languages) {
  try {
    const response = await axios.get(`${GITIGNORE_IO_API}${languages}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from gitignore.io:', error);
    process.exit(1);
  }
}

async function main() {
  const { languages } = await inquirer.prompt([
    {
      type: 'input',
      name: 'languages',
      message: 'Enter the languages/frameworks (comma-separated):',
    },
  ]);

  const formattedLanguages = languages.replace(/\s+/g, '');
  const gitignoreData = await fetchGitignoreData(formattedLanguages);

  fs.writeFileSync('.gitignore', gitignoreData);
  console.log('.gitignore file has been created successfully.');
}

main();