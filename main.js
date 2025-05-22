const fs = require('fs');
const { chromium } = require('playwright');

// Загрузка аккаунтов из файла
const accounts = fs.readFileSync('accounts.txt', 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0 && line.includes(':'));

(async () => {
  for (const account of accounts) {
    const [login, password] = account.split(':');

    console.log(`🔐 Логин под аккаунтом: ${login}`);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // 1. Зайти на сайт
      await page.goto('https://www.adjarabet.am/hy/Promo/spinland');

      // 2. Ввод логина и пароля
      await page.fill('xpath=/html/body/my-app/div/app-header-wrapper/app-header-desktop/div/div/div/div/adj-login/div/div/div/form/div[1]/div[1]/div/input', login);
      await page.fill('xpath=/html/body/my-app/div/app-header-wrapper/app-header-desktop/div/div/div/div/adj-login/div/div/div/form/div[1]/div[2]/div/input', password);
      await page.click('xpath=/html/body/my-app/div/app-header-wrapper/app-header-desktop/div/div/div/div/adj-login/div/div/div/form/div[2]/button');

      // 3. Подождать авторизацию и перейти к iframe
      await page.waitForTimeout(3000); // можно заменить на page.waitForNavigation() если нужно точнее

      await page.goto('https://promos.www.adjarabet.am/spinland/');
      await page.waitForTimeout(2000);

      // 4. Клик на кнопку запуска
      await page.click('xpath=/html/body/div[7]/div[6]/div[4]/div[2]/div/div[2]/div[5]');
      await page.waitForTimeout(1000);
      await page.click('xpath=/html/body/div[7]/div[6]/div[4]/div[2]/div/div[1]/div[8]/div/div[2]/div/div[2]/div[1]');

      await page.waitForTimeout(2000);

      console.log(`✅ Колесо прокручено для: ${login}`);
    } catch (err) {
      console.error(`❌ Ошибка при работе с аккаунтом ${login}:`, err.message);
    } finally {
      await browser.close();
    }
  }
})();
