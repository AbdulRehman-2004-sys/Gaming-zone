/**
 * Utility for currency formatting and conversion to PKR (Pakistani Rupee).
 * Using a fixed conversion rate of 1 USD = 280 PKR.
 */

const USD_TO_PKR_RATE = 280;

/**
 * Formats a number or string representing a USD amount into a PKR formatted string.
 * Example: 79.99 -> "Rs. 22,397"
 */
export function formatPKR(amount: number | string | undefined): string {
    if (amount === undefined || amount === null) return 'Check Price';

    // Parse the amount if it's a string (e.g., "$79.99" or "79.99")
    let numericAmount: number;
    if (typeof amount === 'string') {
        const cleanAmount = amount.replace(/[^0-9.]/g, '');
        numericAmount = parseFloat(cleanAmount);
    } else {
        numericAmount = amount;
    }

    if (isNaN(numericAmount)) return 'Check Price';

    // Convert to PKR
    const pkrAmount = Math.round(numericAmount * USD_TO_PKR_RATE);

    // Format with commas
    const formattedAmount = new Intl.NumberFormat('en-PK', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(pkrAmount);

    return `Rs. ${formattedAmount}`;
}

/**
 * Direct string replacement for hardcoded dollar strings.
 * Used for manual conversion of static data.
 * Example: "$79.99" -> "Rs. 22,397"
 */
export function convertStaticUSDToPKR(usdStr: string): string {
    const cleanAmount = usdStr.replace(/[^0-9.]/g, '');
    const numericAmount = parseFloat(cleanAmount);
    if (isNaN(numericAmount)) return usdStr;

    const pkrAmount = Math.round(numericAmount * USD_TO_PKR_RATE);
    const formattedAmount = new Intl.NumberFormat('en-PK', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(pkrAmount);

    return `Rs. ${formattedAmount}`;
}
