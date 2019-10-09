import { Translate } from 'aws-sdk';

import { handler } from './translator';

jest.mock('aws-sdk');

describe('translator', () => {
  beforeEach(() => {
    Translate.mockRestore && Translate.mockRestore();
  });

  it('should return a 200 http result with the translation', async () => {
    // Given
    const event = {
      queryStringParameters: {
        text: 'Phrase à traduire',
      },
    };

    const mockTranslateText = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        TranslatedText: "I'm a test",
        SourceLanguageCode: 'fr',
        TargetLanguageCode: 'en',
      }),
    });

    Translate.mockImplementation(() => ({
      translateText: mockTranslateText,
    }));

    // When
    const result = await handler(event);

    // Then
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(
      '{"TranslatedText":"I\'m a test","SourceLanguageCode":"fr","TargetLanguageCode":"en"}',
    );
  });
});
