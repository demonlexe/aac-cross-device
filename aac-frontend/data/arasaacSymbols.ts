// ARASAAC symbol URLs - Using their public API
// Format: https://api.arasaac.org/api/pictograms/{id}

export const ARASAAC_BASE_URL = 'https://api.arasaac.org/api/pictograms';

// Core vocabulary with ARASAAC symbol IDs
export const ARASAAC_SYMBOLS = {
  // Core words
  yes: '2671',
  no: '2672',
  want: '2535',
  more: '2136',
  stop: '2621',
  please: '2457',
  thank_you: '2662',
  help: '2019',
  finished: '1786',

  // People
  I: '2094',
  you: '2706',
  he: '2006',
  she: '2572',
  we: '2684',

  // Actions
  go: '1936',
  come: '1583',
  look: '2120',
  listen: '2113',
  eat: '1743',
  drink: '1718',
  play: '2452',
  sleep: '2598',

  // Foods
  water: '2681',
  milk: '2153',
  bread: '1481',
  apple: '1391',
  banana: '1430',

  // Places
  home: '2024',
  school: '2550',
  park: '2421',

  // Feelings
  happy: '1999',
  sad: '2533',
  angry: '1383',

  // Question words
  what: '2686',
  where: '2688',
  when: '2687',
  who: '2689',
  why: '2700',

  // Time
  now: '2323',
  later: '2088',
  today: '2665',

  // Quantities
  all: '1370',
  some: '2609',
  none: '2312',

  // Descriptors
  big: '1459',
  small: '2601',
  hot: '2037',
  cold: '1576',
  good: '1949',
  bad: '1427',
} as const;

export function getArasaacImageUrl(symbolId: string, size: number = 300): string {
  return `${ARASAAC_BASE_URL}/${symbolId}`;
}