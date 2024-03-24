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

});