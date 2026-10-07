// tests/catalog.spec.ts
// Module: Catalog. Mirrors the "Catalog" suite in TestDino test management.
import { test, expect } from '@playwright/test';

test.describe('Catalog', { tag: '@catalog' }, () => {
  test('Home lists all 6 products', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('page-title')).toHaveText('Mini Store');
    await expect(page.getByTestId('product-card')).toHaveCount(6);
    await expect(page.getByTestId('results-count')).toHaveText('Showing 6 products');
  });

  test('Search narrows the list to 1 product', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('search').fill('JBL');
    await expect(page.getByTestId('results-count')).toHaveText('Showing 1 products');
    await expect(page.getByTestId('product-name')).toHaveText('JBL Charge 4 Bluetooth Speaker');
  });

  test('Search with no match shows 0 products', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('search').fill('toaster');
    await expect(page.getByTestId('results-count')).toHaveText('Showing 0 products');
    await expect(page.getByTestId('product-card')).toHaveCount(0);
  });
});
