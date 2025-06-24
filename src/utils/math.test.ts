import { describe, it, expect } from 'vitest';
import { sum, multiply } from './math'; // 匯入我們要測試的函式

// 使用 'describe' 將 'math.ts' 的所有測試包裝在一起
describe('math utility functions', () => {
  // 針對 'sum' 函式的測試區塊
  describe('sum', () => {
    // 'it' 描述一個具體的測試案例
    it('應該能正確地將兩個正整數相加', () => {
      // 斷言：期望 sum(2, 3) 的結果會是 5
      expect(sum(2, 3)).toBe(5);
    });

    it('應該能處理負數', () => {
      expect(sum(-5, 10)).toBe(5);
    });

    it('應該能處理零', () => {
      expect(sum(7, 0)).toBe(7);
    });
  });

  // 針對 'multiply' 函式的測試區塊
  describe('multiply', () => {
    it('應該能正確地將兩個數字相乘', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('乘以零應該得到零', () => {
      expect(multiply(9, 0)).toBe(0);
    });
  });
});
