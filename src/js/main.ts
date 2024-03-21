// Tilldelning av element till variabeler
let addButtonEl: HTMLButtonElement | null = document.getElementById("addCourse") as HTMLButtonElement;
let courseListEl: HTMLElement | null = document.getElementById("courselist") as HTMLDivElement;
let clearButtonEl: HTMLButtonElement | null = document.getElementById("clearbutton") as HTMLButtonElement;

// Definierar strukturen på kursinformationen med interface
interface courseInfo {
    name: string;
    code: string;
    progression: string;
    url: string;
}

// Händelselyssnare för att lägga till kurs
document.getElementById("addCourse")?.addEventListener("click", () => {
    let codeInput = document.getElementById("code") as HTMLInputElement;
    let nameInput = document.getElementById("name") as HTMLInputElement;
    let progressionInput = document.getElementById("progression") as HTMLInputElement;
    let syllabusInput = document.getElementById("syllabus") as HTMLInputElement;
})
