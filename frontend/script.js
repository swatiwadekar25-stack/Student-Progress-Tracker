const progressForm =
    document.getElementById("progressForm");

const responseMessage =
    document.getElementById("responseMessage");

const progressList =
    document.getElementById("progressList");


// POST - Add progress

progressForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentName =
        document.getElementById("studentName").value;

    const courseName =
        document.getElementById("courseName").value;

    const completionPercentage =
        document.getElementById("completionPercentage").value;


    try {

        const response = await fetch(
            "https://student-progress-tracker-api-cg0x.onrender.com/progress.html",
            // "http://localhost:5000/progress",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    studentName: studentName,
                    courseName: courseName,
                    completionPercentage: completionPercentage
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            responseMessage.textContent =
                data.message;

            responseMessage.className = "success";

            progressForm.reset();

            getProgress();

        } else {

            responseMessage.textContent =
                data.message;

        }

    } catch (error) {

        console.log(error);

        responseMessage.textContent =
            "Something went wrong.";
    }

});


// GET - Get all progress

async function getProgress() {

    try {

        const response = await fetch(
            "http://localhost:5000/progress"
        );

        const progress = await response.json();


        progressList.innerHTML = "";


        if (progress.length === 0) {

            progressList.innerHTML =
                "<p>No progress records found.</p>";

            return;
        }


        progress.forEach((item) => {

            const card =
                document.createElement("div");

            card.classList.add("progress-card");


            card.innerHTML = `

                <h3>👤 ${item.studentName}</h3>

                <p>
                    <strong>Course:</strong>
                    ${item.courseName}
                </p>

                <p>
                    <strong>Progress:</strong>
                    ${item.completionPercentage}%
                </p>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width: ${item.completionPercentage}%">
                    </div>

                </div>

                <p class="date">
                    Last Updated:
                    ${new Date(item.lastUpdated).toLocaleString()}
                </p>

            `;


            progressList.appendChild(card);

        });


    } catch (error) {

        console.log(error);

        progressList.innerHTML =
            "<p>Unable to load progress.</p>";
    }
}


// Load progress when page opens

getProgress();