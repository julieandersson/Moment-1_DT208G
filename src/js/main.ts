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

      courseListEl.appendChild(courseItem);
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

   // Hämta sparade kurser från localStorage och visa dem på webbsidan
    const savedCourses = getSavedCourses();
    displayCourses(savedCourses);
});