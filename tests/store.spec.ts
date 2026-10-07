// tests/store.spec.ts
// Starter tests for the demo. Each one asserts something the README's
// "break it" edits will change, so a 1-line change to the store turns exactly
// 1 or 2 of these red.
import { test, expect } from '@playwright/test';

const PRODUCT = 'JBL Charge 4 Bluetooth Speaker';

test.describe('Mini Store @smoke', () => {
  test('home lists all 6 products', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('page-title')).toHaveText('Mini Store');
    await expect(page.getByTestId('product-card')).toHaveCount(6);
    await expect(page.getByTestId('results-count')).toHaveText('Showing 6 products');
  });

  test('search narrows the list to 1 product', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('search').fill('JBL');
    await expect(page.getByTestId('results-count')).toHaveText('Showing 1 products');
    await expect(page.getByTestId('product-name')).toHaveText(PRODUCT);
  });

  test('product page shows the listed price', async ({ page }) => {
    await page.goto('/product/jbl-charge-4-bluetooth-speaker');
    await expect(page.getByTestId('product-name')).toHaveText(PRODUCT);
    await expect(page.getByTestId('product-price')).toHaveText('$145');
  });

  test('add to cart updates the header badge', async ({ page }) => {
    await page.goto('/product/jbl-charge-4-bluetooth-speaker');
    await expect(page.getByTestId('cart-count')).toHaveText('0');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByTestId('added-toast')).toBeVisible();
    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });

  test('checkout places an order at the listed price', async ({ page }) => {
    await page.goto('/product/jbl-charge-4-bluetooth-speaker');
    await page.getByTestId('add-to-cart').click();
    await page.getByTestId('nav-cart').click();

    await expect(page.getByTestId('line-name')).toHaveText(PRODUCT);
    await expect(page.getByTestId('total')).toHaveText('$145');
    await page.getByTestId('checkout').click();

    await page.getByTestId('name').fill('Ada Lovelace');
    await page.getByTestId('email').fill('ada@example.com');
    await page.getByTestId('address').fill('1 Market St, San Francisco');
    await page.getByRole('button', { name: 'Place order' }).click();

    await expect(page).toHaveURL(/\/order\?id=[0-9a-f]{24}$/);
    await expect(page.getByTestId('confirmation-title')).toHaveText('Your order was placed successfully');
    await expect(page.getByTestId('amount-charged')).toHaveText('$145');
    await expect(page.getByTestId('cart-count')).toHaveText('0');
  });
});
