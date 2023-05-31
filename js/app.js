// Get the form element
const dreamForm = document.getElementById('dream-form');

// OPENAI API key
const OPENAI_API_KEY = "";

// Check if the API key is provided
if (OPENAI_API_KEY === "") {
    document.getElementById('dream').innerHTML = "<span style='color: #f00;'>Por favor, configure a chave da API OpenAI no arquivo js/app.js</span>";
}

// Proceed if the dream form element exists on the page
if (dreamForm) {
    // Wait for the user to submit the dream
    dreamForm.addEventListener("submit", async (e) => {
        // Prevent page reload
        e.preventDefault();

        // Replace the submit button text with "Interpreting..."
        document.getElementById('dream-submit-btn').value = "Interpretando...";

        // Get the value of the dream field
        let dream = document.getElementById('dream-field').value;
        let prompt = "Atue como um psicoanalista e interprete o sonho abaixo:\n\n" + dream + "\n\nEu preciso que você interprete o sonho de forma detalhada, com base na psicanálise. Por favor";

        // Display the entered dream
        document.getElementById('dream').innerHTML = dream;

        // Clear the interpretation
        document.getElementById('interpretation').innerHTML = "<span></span>";

        // Send a request to the dream interpretation API
        await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + OPENAI_API_KEY,
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Model
                prompt: prompt, // Dream text
                max_tokens: 2048, // Response length
                temperature: 0.5 // Creativity of the response
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Display the interpretation
                document.getElementById('interpretation').innerHTML = data.choices[0].text;
            })
            .catch(() => {
                // Display "No response" if there's an error
                document.getElementById('interpretation').innerHTML = "No interpretation available";
            });

        // Replace the submit button text with "Interpret"
        document.getElementById('dream-submit-btn').value = "Interpret";
    });
}
