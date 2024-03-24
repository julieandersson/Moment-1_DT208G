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

   // Hämta sparade kurser från localStorage och visa dem på webbsidan
const savedCourses = getSavedCourses();
displayCourses(savedCourses);
});