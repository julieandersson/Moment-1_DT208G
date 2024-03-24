document.addEventListener("DOMContentLoaded", function() {
    const addButtonEl: HTMLButtonElement | null = document.getElementById("addCourse") as HTMLButtonElement;
    const courseListEl: HTMLElement = document.getElementById("courseList") as HTMLDivElement;
    const clearButtonEl: HTMLButtonElement | null = document.getElementById("clearbutton") as HTMLButtonElement;

    // Definierar strukturen på kursinformationen med interface
    interface CourseInfo {
        name: string;
        code: string;
        progression: 'A' | 'B' | 'C';
        syllabus: string;
    }

    // Funktion för att hämta sparade kurser från localStorage
    function getSavedCourses(): CourseInfo[] {
        const savedCoursesJSON = localStorage.getItem('courses');
        if (savedCoursesJSON) {
            return JSON.parse(savedCoursesJSON);
        } else {
            return [];
        }
    }

    // Funktion för att spara kurser till localStorage
    function saveCourses(courses: CourseInfo[]): void {
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    // Funktion för att visa kurslistan på webbsidan
    function displayCourses(courses: CourseInfo[]): void {
    courseListEl.innerHTML = ''; // Rensa befintligt innehåll
    
    courses.forEach((course, index) => {
      const courseItem = document.createElement('div');
      courseItem.classList.add('course-item');
      courseItem.innerHTML = `
        <strong>Kurskod:</strong> ${course.code}<br>
        <strong>Kursnamn:</strong> ${course.name}<br>
        <strong>Progression:</strong> ${course.progression}<br>
        <strong>URL till kursplanen:</strong> <a href="${course.syllabus}" target="_blank">${course.syllabus}</a><br>
    `;

    // Skapar och lägger till "Ändra kursinformation"-knappen inuti varje tillagd kurs på webbplatsen
       const editButton = document.createElement('button');
       editButton.classList.add('btn', 'edit-button');
       editButton.textContent = 'Ändra kursinformation';
       editButton.dataset.index = index.toString();
       courseItem.appendChild(editButton);

      courseListEl.appendChild(courseItem);
     });

    // Lägg till händelselyssnare för varje "Ändra kurs"-knapp
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index') || '0', 10);
            const courseToEdit = savedCourses[index];
            
    // Fyll i formuläret med den valda kursens information
    const codeInput = document.getElementById("code") as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const progressionInput = document.getElementById("progression") as HTMLSelectElement;
    const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;

    codeInput.value = courseToEdit.code;
    nameInput.value = courseToEdit.name;
    progressionInput.value = courseToEdit.progression;
    syllabusInput.value = courseToEdit.syllabus;

    // Ändra knappens text till "Spara ändringar"
    const addButton = document.getElementById("addCourse") as HTMLButtonElement;
    addButton.textContent = "Spara ändringar";

    // Byt ut händelselyssnaren för "Lägg till kurs" för att hantera sparandet av ändringar
    addButton.removeEventListener("click", addCourse);
    addButton.addEventListener("click", () => {

        // Uppdaterar kursen i listan efter ändring
        const updatedCourse: CourseInfo = {
            code: codeInput.value.trim(),
            name: nameInput.value.trim(),
            progression: progressionInput.value as 'A' | 'B' | 'C',
            syllabus: syllabusInput.value.trim()
            };

            savedCourses[index] = updatedCourse;
            saveCourses(savedCourses);
            displayCourses(savedCourses);

            // Återställ formuläret och knappens text
            addButton.textContent = "Lägg till kurs";
            addButton.removeEventListener("click", addCourse);
            addButton.addEventListener("click", addCourse);

            codeInput.value = '';
            nameInput.value = '';
            progressionInput.value = '';
            syllabusInput.value = '';
        });
    });
}); 
 
}

   // Funktion för att lägga till en ny kurs
    function addCourse(): void {
    const codeInput = document.getElementById("code") as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const progressionInput = document.getElementById("progression") as HTMLSelectElement;
    const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;

    const code = codeInput.value.trim();
    const name = nameInput.value.trim();
    const progression = progressionInput.value as 'A' | 'B' | 'C';
    const syllabus = syllabusInput.value.trim();

    // Validera att alla fält är ifyllda och att en progression har valts
    if (code === '' || name === '' || progression !== 'A' && progression !== 'B' && progression !== 'C' || syllabus === '') {
        alert("Vänligen fyll i alla fält.");
        return; // Avbryt funktionen om något fält är tomt
    } 

    // Validering för unik kurskod
     const existingCourses = getSavedCourses();
     const isCodeUnique = !existingCourses.some(course => course.code === code);
    
        if (isCodeUnique) {
            const newCourse: CourseInfo = { code, name, progression, syllabus };
            existingCourses.push(newCourse);
            saveCourses(existingCourses);
            displayCourses(existingCourses);
            // Återställ formuläret efter att kursen har lagts till
            codeInput.value = '';
            nameInput.value = '';
            progressionInput.value = '';
            syllabusInput.value = '';
        } else {
            alert("Kurskoden måste vara unik.");
        }
}

   // Händelselyssnare för att lägga till en kurs när knappen klickas
    addButtonEl?.addEventListener("click", addCourse);

    // Funktion för att rensa kurserna från localStorage och från webbsidan
    function clearCourses(): void {
      localStorage.removeItem('courses');
      courseListEl.innerHTML = ''; // Rensa kurslistan från webbsidan
  }

   // Händelselyssnare för att rensa kurserna när knappen klickas
    clearButtonEl?.addEventListener("click", clearCourses);

   // Hämta sparade kurser från localStorage och visa dem på webbsidan
    const savedCourses = getSavedCourses();
    displayCourses(savedCourses);
});