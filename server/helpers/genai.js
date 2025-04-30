require("dotenv").config();
const { GoogleGenAI, Modality } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateBookRecommendations(ownedBooks) {
  try {
    // Format owned books data for the prompt
    const booksInfo = ownedBooks.map((book) => ({
      name: book.Book.name,
      synopsis: book.Book.synopsis,
      category: book.Book.Category?.name,
    }));

    console.log(booksInfo, "<<<<<<< books info");
    const prompt = `Based on the following books that the user has in their library:
${JSON.stringify(booksInfo, null, 2)}

Please recommend at least 5 similar books that the user might enjoy. Consider:
1. The genres/categories of their current books
2. The themes present in their current books' synopses
3. The overall reading preferences shown by their collection

Format your response as a JSON array of book recommendations, where each recommendation includes:
- title: The book title
- author: The author's name (if you think it's relevant)
- reason: A brief explanation of why you're recommending this book based on their current collection

Be specific about why each recommendation matches their interests based on their current books.`;

    // const model = ai.getGenerativeModel({ model: "gemini-pro" });
    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    
    const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
              });
            let cleanResponse = response.text.replace(/```json|```/g, "").trim();
            let result = JSON.parse(cleanResponse);
              console.log(response, "<<<<<<<<< ayam here")
            return result
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
}

module.exports = {
  generateBookRecommendations,
};
