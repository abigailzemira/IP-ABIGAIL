const { generateBookRecommendations } = require('../helpers/genai');
const { GoogleGenAI } = require('@google/genai');

// Mock GoogleGenAI
jest.mock('@google/genai');

describe('Genai Helper Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear console mocks
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('generateBookRecommendations', () => {
    const mockOwnedBooks = [
      {
        Book: {
          name: 'Test Book',
          synopsis: 'Test synopsis',
          Category: {
            name: 'Fiction'
          }
        }
      }
    ];

    const mockRecommendations = [
      {
        title: 'Recommended Book',
        author: 'Test Author',
        reason: 'Similar genre',
        cover: 'test-cover.jpg',
        id: 1
      }
    ];

    test('should successfully generate recommendations', async () => {
      const mockGenerateContent = jest.fn().mockResolvedValue({
        text: JSON.stringify(mockRecommendations)
      });

      const mockModels = {
        generateContent: mockGenerateContent
      };

      GoogleGenAI.mockImplementation(() => ({
        models: mockModels
      }));

      const result = await generateBookRecommendations(mockOwnedBooks);

      expect(result).toEqual(mockRecommendations);
      expect(mockGenerateContent).toHaveBeenCalled();
      expect(mockGenerateContent.mock.calls[0][0]).toHaveProperty('model', 'gemini-2.0-flash');
      expect(console.log).toHaveBeenCalledWith(expect.anything(), '<<<<<<< books info');
    });

    test('should handle API response with markdown code blocks', async () => {
      const mockGenerateContent = jest.fn().mockResolvedValue({
        text: '```json\n' + JSON.stringify(mockRecommendations) + '\n```'
      });

      const mockModels = {
        generateContent: mockGenerateContent
      };

      GoogleGenAI.mockImplementation(() => ({
        models: mockModels
      }));

      const result = await generateBookRecommendations(mockOwnedBooks);
      expect(result).toEqual(mockRecommendations);
    });

    test('should handle response with multiple code block markers', async () => {
      const mockGenerateContent = jest.fn().mockResolvedValue({
        text: '```json\n```json\n' + JSON.stringify(mockRecommendations) + '\n```\n```'
      });

      const mockModels = {
        generateContent: mockGenerateContent
      };

      GoogleGenAI.mockImplementation(() => ({
        models: mockModels
      }));

      const result = await generateBookRecommendations(mockOwnedBooks);
      expect(result).toEqual(mockRecommendations);
    });

    test('should handle AI service error', async () => {
      const mockError = new Error('AI service error');
      const mockGenerateContent = jest.fn().mockRejectedValue(mockError);

      const mockModels = {
        generateContent: mockGenerateContent
      };

      GoogleGenAI.mockImplementation(() => ({
        models: mockModels
      }));

      await expect(generateBookRecommendations(mockOwnedBooks))
        .rejects
        .toThrow('AI service error');
      expect(console.error).toHaveBeenCalledWith('Error generating recommendations:', mockError);
    });

    test('should handle invalid JSON response', async () => {
      const mockGenerateContent = jest.fn().mockResolvedValue({
        text: 'Invalid JSON'
      });

      const mockModels = {
        generateContent: mockGenerateContent
      };

      GoogleGenAI.mockImplementation(() => ({
        models: mockModels
      }));

      await expect(generateBookRecommendations(mockOwnedBooks))
        .rejects
        .toThrow(SyntaxError);
      expect(console.error).toHaveBeenCalled();
    });

    test('should handle undefined response text', async () => {
      const mockGenerateContent = jest.fn().mockResolvedValue({});

      const mockModels = {
        generateContent: mockGenerateContent
      };

      GoogleGenAI.mockImplementation(() => ({
        models: mockModels
      }));

      await expect(generateBookRecommendations(mockOwnedBooks))
        .rejects
        .toThrow();
      expect(console.error).toHaveBeenCalled();
    });

    test('should handle null response', async () => {
      const mockGenerateContent = jest.fn().mockResolvedValue(null);

      const mockModels = {
        generateContent: mockGenerateContent
      };

      GoogleGenAI.mockImplementation(() => ({
        models: mockModels
      }));

      await expect(generateBookRecommendations(mockOwnedBooks))
        .rejects
        .toThrow();
      expect(console.error).toHaveBeenCalled();
    });

    test('should handle missing text property in response', async () => {
      const mockGenerateContent = jest.fn().mockResolvedValue({});

      GoogleGenAI.mockImplementation(() => ({
        models: { generateContent: mockGenerateContent }
      }));

      await expect(generateBookRecommendations(mockOwnedBooks))
        .rejects
        .toThrow();
    });

    test('should handle response with code blocks', async () => {
      const mockResponse = [{ title: 'Test Book' }];
      const mockGenerateContent = jest.fn().mockResolvedValue({
        text: '```json\n' + JSON.stringify(mockResponse) + '\n```'
      });

      GoogleGenAI.mockImplementation(() => ({
        models: { generateContent: mockGenerateContent }
      }));

      const result = await generateBookRecommendations(mockOwnedBooks);
      expect(result).toEqual(mockResponse);
    });

    test('should handle multiple code block markers', async () => {
      const mockResponse = [{ title: 'Test Book' }];
      const mockGenerateContent = jest.fn().mockResolvedValue({
        text: '```json\n```\n' + JSON.stringify(mockResponse) + '\n```\n```'
      });

      GoogleGenAI.mockImplementation(() => ({
        models: { generateContent: mockGenerateContent }
      }));

      const result = await generateBookRecommendations(mockOwnedBooks);
      expect(result).toEqual(mockResponse);
    });
  });
});