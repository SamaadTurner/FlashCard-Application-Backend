const request = require('supertest');
const app = require('./app');

describe('Test getting all flashcards', () => {
  test('It should be empty', async () => {
    const response = await request(app).get('/api/flashcards');
    console.log('@response', response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('It should allow creating, fetching, updating, and deleting a flashcard', async () => {
    // Create a new flashcard
    let createResponse = await request(app).post('/api/flashcards').send({
      QuestionText: 'what is 2+2?',
      AnswerText: '4',
      Chapter: 1,
    });
    expect(createResponse.statusCode).toBe(201);
    console.log('create response', createResponse.body);
    const FlashcardID = createResponse.body.FlashcardID;

    // Fetch the created flashcard
    let fetchResponse = await request(app).get(
      `/api/flashcards/${FlashcardID}`
    );
    expect(fetchResponse.statusCode).toBe(200);
    console.log('Fetched flashcard response body:', fetchResponse.body);
    // Before comparing the fetched response, parse the Chapter field to a number if it's not already
    const fetchedFlashcard = fetchResponse.body;
    if (typeof fetchedFlashcard.Chapter === 'string') {
      fetchedFlashcard.Chapter = parseInt(fetchedFlashcard.Chapter, 10);
    }

    // Now perform the comparison with the expected object
    expect(fetchedFlashcard).toEqual({
      QuestionText: 'what is 2+2?',
      AnswerText: '4',
      Chapter: 1, // Expected to be a number
    });

    // Update the flashcard
    let updateResponse = await request(app)
      .put(`/api/flashcards/${FlashcardID}`)
      .send({
        FlashcardID: FlashcardID, // Assuming FlashcardID is expected to be included and is known to be 1
        QuestionText: 'what is 3+3?',
        AnswerText: '6',
        Chapter: '1',
      });
    expect(updateResponse.statusCode).toBe(200); // Assuming 200 is the status code for OK/success
    let updatedFlashcardResponse = await request(app).get(
      `/api/flashcards/${FlashcardID}`
    );
    console.log(updatedFlashcardResponse.body);
    expect(updatedFlashcardResponse.body).toEqual({
      QuestionText: 'what is 3+3?',
      AnswerText: '6',
      Chapter: '1',
    });

    // Delete the flashcard
    let deleteResponse = await request(app).delete(
      `/api/flashcards/${FlashcardID}`
    );
    expect(deleteResponse.statusCode).toBe(204);

    // Assert the flashcards collection is empty again
    let finalResponse = await request(app).get('/api/flashcards');
    expect(finalResponse.statusCode).toBe(200);
    expect(finalResponse.body).toEqual([]);
  });
});
