



type quoteObject = {quote: string, character: string};

// hämta 10 slumpmässiga South Park-citat från API:n
const quotes = async (): Promise<quoteObject[]> => {
    const response = await fetch ("https://southparkquotes.onrender.com/v1/quotes/10");
    const quotesArray: quoteObject[] = await response.json();
    return quotesArray;
};

// skapa array av objekten
const quotesArray: quoteObject[] = (await quotes());
console.log(quotesArray);
const app = document.querySelector("#app") as HTMLBodyElement;
const line1 = document.createElement("p") as HTMLParagraphElement;
line1.innerHTML = "This is a quote from South Park, what character said it?";
app.appendChild(line1);

// plocka ut slumpmässigt citat
const randomNumber: number = Math.floor(Math.random() * 10);
const quoteInQuestion: quoteObject = quotesArray[randomNumber];
const line2 = document.createElement("p") as HTMLParagraphElement;
line2.innerHTML = `"${quoteInQuestion.quote}"`;
app.appendChild(line2);

// skapa array av alla unika karaktärsnamn
const names: string[] = [];
quotesArray.forEach((q) => {
    names.push(q.character);
});
const uniqueNames: string[] = Array.from(new Set(names));

// gör formuläret
const form = document.createElement("form") as HTMLFormElement;
app.appendChild(form);
const dropdownLabel = document.createElement("label") as HTMLLabelElement;
dropdownLabel.setAttribute("for", "dropdown");
dropdownLabel.innerHTML = "character: ";
form.appendChild(dropdownLabel);
const dropdown = document.createElement("select") as HTMLSelectElement;
dropdown.setAttribute("id", "dropdown");
form.appendChild(dropdown);

uniqueNames.forEach((u) => {
    let option = document.createElement("option") as HTMLOptionElement;
    option.innerHTML = u;
    dropdown.appendChild(option);
});

const submitButton = document.createElement("button") as HTMLButtonElement;
submitButton.setAttribute("type", "submit");
submitButton.innerHTML = "Submit";
form.appendChild(submitButton);

const result = document.createElement("p") as HTMLParagraphElement;
app.appendChild(result);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (dropdown.value === quoteInQuestion.character) {
        result.innerHTML = "Absolutely correct!!";
    }
    else {
        result.innerHTML = "Dead wrong!!";
    }
});



