const request = require("supertest");
const app = require("./app");

describe("Test getting all flashcards", () => {
  test("It should be empty", done => {
      // TODO:
      //   Get all flashcards, it shoud be empty
      //   Create a flashcard
      //   Get that created flashcard, assert the values are correct
      //   Update that flashcard, assert the values are correct
      //   Delete that flashcard, assert it was deleted (meaning fetch all again and make sure it's empty)

    request(app)
      .get("/api/flashcards")
      .then(response => {
        console.log("@response", response.body);
	// TODO: assert response.body is the empty list
        expect(response.statusCode).toBe(200);
        done();
      });

  });
});
