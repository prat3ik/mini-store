// tests/cart.spec.ts
// Module: Product and cart. Mirrors the "Product and cart" suite in TestDino.
import { test, expect } from '@playwright/test';

const PRODUCT = 'JBL Charge 4 Bluetooth Speaker';
const PRODUCT_URL = '/product/jbl-charge-4-bluetooth-speaker';

test.describe('Product and cart', { tag: '@cart' }, () => {
  test('Product page shows the listed price', async ({ page }) => {
    await page.goto(PRODUCT_URL);
    await expect(page.getByTestId('product-name')).toHaveText(PRODUCT);
    await expect(page.getByTestId('product-price')).toHaveText('$145');
  });

  test('Add to cart updates the header badge', async ({ page }) => {
    await page.goto(PRODUCT_URL);
    await expect(page.getByTestId('cart-count')).toHaveText('0');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByTestId('added-toast')).toBeVisible();
    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });

  test('Cart shows the line, free shipping and the total', async ({ page }) => {
    await page.goto(PRODUCT_URL);
    await page.getByTestId('add-to-cart').click();
    await page.getByTestId('nav-cart').click();
    await expect(page.getByTestId('line-name')).toHaveText(PRODUCT);
    await expect(page.getByTestId('line-quantity')).toHaveText('1');
    await expect(page.getByTestId('shipping')).toHaveText('Free');
    await expect(page.getByTestId('total')).toHaveText('$145');
  });
});
