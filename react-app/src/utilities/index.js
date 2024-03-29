const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
  currencyDisplay: "symbol",
});

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}

// returns currency symbol e.g. USD, EUR, etc.
export function formatCurrencySymbol() {
  return CURRENCY_FORMATTER.resolvedOptions().currency;
}

export function isObjectEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function checkNumeric(input) {
  return /^\d+$/.test(input);
}

export function invalidImage({ target }) {
  target.onerror = null;
  target.src =
    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
}

// random line I need to run
// export NODE_OPTIONS=--openssl-legacy-provider
