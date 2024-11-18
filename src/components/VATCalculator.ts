export class VATCalculator {
  static calculate(amount: string, vatRate: number, type: 'inclusive' | 'exclusive') {
    const numAmount = parseFloat(amount) || 0;
    
    if (type === 'exclusive') {
      const vat = (numAmount * vatRate) / 100;
      const total = numAmount + vat;
      return { original: numAmount, vat, total };
    } else {
      const original = (numAmount * 100) / (100 + vatRate);
      const vat = numAmount - original;
      return { original, vat, total: numAmount };
    }
  }
}