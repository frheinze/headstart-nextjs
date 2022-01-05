import shopConfig from '../../shopConfig.json'

export default function formatPrice(amount: number): string {
  return new Intl.NumberFormat(shopConfig.CurrencyFormat.Locale, {
    style: 'currency',
    currency: shopConfig.CurrencyFormat.Currency,
    currencyDisplay: shopConfig.CurrencyFormat.CurrencyDisplay,
  }).format(amount)
}
