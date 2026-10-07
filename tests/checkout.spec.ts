// tests/checkout.spec.ts
// Module: Checkout. Mirrors the "Checkout" suite in TestDino.
import { test, expect } from '@playwright/test';

const PRODUCT = 'JBL Charge 4 Bluetooth Speaker';
const PRODUCT_URL = '/product/jbl-charge-4-bluetooth-speaker';

async function addSpeakerAndOpenCheckout(page: import('@playwright/test').Page) {
  await page.goto(PRODUCT_URL);
  await page.getByTestId('add-to-cart').click();
  await page.getByTestId('nav-cart').click();
  await page.getByTestId('checkout').click();
}

test.describe('Checkout @checkout', () => {
  test('checkout summary matches the cart', async ({ page }) => {
    await addSpeakerAndOpenCheckout(page);
    await expect(page.getByTestId('page-title')).toHaveText('Checkout');
    await expect(page.getByTestId('order-summary')).toContainText(PRODUCT);
    await expect(page.getByTestId('summary-total')).toHaveText('$145');
  });

  test('placing an order shows the confirmation at the listed price', async ({ page }) => {
    await addSpeakerAndOpenCheckout(page);
    await page.getByTestId('name').fill('Ada Lovelace');
    await page.getByTestId('email').fill('ada@example.com');
    await page.getByTestId('address').fill('1 Market St, San Francisco');
    await page.getByRole('button', { name: 'Place order' }).click();

    await expect(page).toHaveURL(/\/order\?id=[0-9a-f]{24}$/);
    await expect(page.getByTestId('confirmation-title')).toHaveText('Your order was placed successfully');
    await expect(page.getByTestId('amount-charged')).toHaveText('$145');
    await expect(page.getByTestId('cart-count')).toHaveText('0');
  });

  test('checkout with an empty cart asks you to add something first', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page.getByTestId('checkout-empty')).toBeVisible();
    await expect(page.getByTestId('place-order')).toHaveCount(0);
  });
});
