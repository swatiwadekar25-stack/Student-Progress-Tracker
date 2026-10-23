const API_URL = "https://student-progress-tracker-api-cg0x.onrender.com/progress";

const progressList = document.getElementById("progressList");

async function getProgress() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const students = await response.json();

        if (!Array.isArray(students)) {
            throw new Error("Unexpected response from backend");
        }

        if (students.length === 0) {
            progressList.textContent = "No student progress found.";
            return;
        }

        progressList.innerHTML = students.map(student => `
            <div class="progress-card">
                <h3>${student.studentName}</h3>
                <p>Course: ${student.courseName}</p>
                <p>Completion: ${student.completionPercentage}%</p>
                <progress value="${student.completionPercentage}" max="100"></progress>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error loading progress:", error);
        progressList.textContent =
            "Unable to load student progress. Please try again.";
    }
}

getProgress();