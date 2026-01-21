import { getBlurDataURL, shimmer, toBase64 } from './image-blur';

describe('image-blur utilities', () => {
  describe('shimmer', () => {
    it('should generate SVG shimmer with correct dimensions', () => {
      const result = shimmer(100, 100);
      expect(result).toContain('width="100"');
      expect(result).toContain('height="100"');
      expect(result).toContain('<svg');
      expect(result).toContain('</svg>');
    });

    it('should include animation elements', () => {
      const result = shimmer(200, 150);
      expect(result).toContain('<animate');
      expect(result).toContain('repeatCount="indefinite"');
    });
  });

  describe('toBase64', () => {
    it('should convert string to base64', () => {
      const input = 'test string';
      const result = toBase64(input);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });

  describe('getBlurDataURL', () => {
    it('should generate data URL with correct format', () => {
      const result = getBlurDataURL(100, 100);
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it('should generate different URLs for different dimensions', () => {
      const url1 = getBlurDataURL(100, 100);
      const url2 = getBlurDataURL(200, 200);
      expect(url1).not.toEqual(url2);
    });
  });
});
