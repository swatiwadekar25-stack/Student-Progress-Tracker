const progressList =
    document.getElementById("progressList");


async function getProgress() {

    try {

        const response = await fetch(
            "http://localhost:5000/progress"
        );

        const progress = await response.json();

        progressList.innerHTML = "";


        if (progress.length === 0) {

            progressList.innerHTML =
                "<p class='empty'>No student progress found.</p>";

            return;
        }


        progress.forEach((item) => {

            const card =
                document.createElement("div");

            card.classList.add("progress-card");


            card.innerHTML = `

                <h2>👤 ${item.studentName}</h2>

                <p>
                    <strong>Course:</strong>
                    ${item.courseName}
                </p>

                <p>
                    <strong>Completion:</strong>
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
            "<p class='error'>Unable to load student progress.</p>";
    }
}


getProgress();