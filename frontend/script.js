
const API_URL = "https://student-progress-tracker-api-cg0x.onrender.com/progress";

const progressForm = document.getElementById("progressForm");
const responseMessage = document.getElementById("responseMessage");
const progressList = document.getElementById("progressList");

// POST - Add progress
progressForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const courseName = document.getElementById("courseName").value;
    const completionPercentage = document.getElementById("completionPercentage").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentName,
                courseName,
                completionPercentage
            })
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.textContent = data.message || "Progress added successfully!";
            responseMessage.className = "success";
            progressForm.reset();
            getProgress();
        } else {
            responseMessage.textContent = data.message || "Unable to add progress.";
        }
    } catch (error) {
        console.error("POST error:", error);
        responseMessage.textContent = "Something went wrong. Check the backend.";
    }
});

// GET - Get all progress
async function getProgress() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const progress = await response.json();

        progressList.innerHTML = "";

        if (!Array.isArray(progress) || progress.length === 0) {
            progressList.innerHTML = "<p>No progress records found.</p>";
            return;
        }

        progress.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("progress-card");

            card.innerHTML = `
                <h3>👤 ${item.studentName}</h3>
                <p><strong>Course:</strong> ${item.courseName}</p>
                <p><strong>Progress:</strong> ${item.completionPercentage}%</p>
                <div class="progress-bar">
                    <div class="progress-fill"
                         style="width: ${item.completionPercentage}%">
                    </div>
                </div>
                <p class="date">
                    Last Updated: ${
                        item.lastUpdated
                            ? new Date(item.lastUpdated).toLocaleString()
                            : "Not available"
                    }
                </p>
            `;

            progressList.appendChild(card);
        });

    } catch (error) {
        console.error("GET error:", error);
        progressList.innerHTML = "<p>Unable to load progress. Please try again.</p>";
    }
}

// Load progress when page opens
getProgress();
