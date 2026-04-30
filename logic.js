// Helper to update counters
function updateCounter(status, change) {
    let counterElement;
    switch(status) {
        case 'Applied':   counterElement = document.querySelector("#applied-card p:last-child"); break;
        case 'Interview': counterElement = document.querySelector("#interview-card p:last-child"); break;
        case 'Offer':     counterElement = document.querySelector("#offers-card p:last-child"); break;
        case 'Rejected':  counterElement = document.querySelector("#rejected-card p:last-child"); break;
    }
    if (counterElement) {
        counterElement.textContent = parseInt(counterElement.textContent) + change;
    }
}

const divs = document.querySelectorAll(".choice-btn div");
const overlay = document.querySelector("#form-over");
const incTot = document.querySelector("#total-card p:last-child");

divs.forEach(div => {
    if (div.id == "application") {
        div.addEventListener("click", () => {
            overlay.classList.add("active");
        });

        const addJob = document.getElementById("AddJob");
        addJob.addEventListener('click', function() {
            const jobTitle = document.getElementById('job-title').value;
            const job_url = document.getElementById('job-url').value;
            const company_name = document.getElementById('company-name').value;

            if (jobTitle === "" || job_url === "" || company_name === "") {
                alert("Please fill in all fields!");
                return;
            }

            const job_card = document.createElement('div');
            job_card.classList.add("Job-card");
            job_card.setAttribute('data-status', 'Applied');

            job_card.innerHTML = `
                <p class="status-display">Status: Applied</p>
                <p> ${jobTitle} </p>
                <p> ${company_name} </p>
                <div class="status-controls">
                    <button class="status-btn" data-target="Interview">Interview</button>
                    <button class="status-btn" data-target="Offer">Offer</button>
                    <button class="status-btn" data-target="Rejected">Reject</button>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;

            // Status Pipeline Logic
            const statusBtns = job_card.querySelectorAll('.status-btn');
            statusBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const newStatus = btn.getAttribute('data-target');
                    const oldStatus = job_card.getAttribute('data-status');

                    if (oldStatus === newStatus) return;

                    updateCounter(oldStatus, -1);
                    updateCounter(newStatus, 1);

                    job_card.setAttribute('data-status', newStatus);
                    job_card.querySelector('.status-display').textContent = `Status: ${newStatus}`;
                });
            });

            // Remove Logic
            job_card.querySelector(".remove-btn").addEventListener("click", function() {
                const currentStatus = job_card.getAttribute('data-status');
                job_card.remove();
                
                incTot.textContent = parseInt(incTot.textContent) - 1;
                updateCounter(currentStatus, -1);
            });

            document.getElementById('job-container').appendChild(job_card);

            // Update Global Counters
            incTot.textContent = parseInt(incTot.textContent) + 1;
            updateCounter('Applied', 1);

            document.getElementById("job-form").reset();
            overlay.classList.remove("active");
        });

        const exit = document.getElementById("Exit");
        exit.addEventListener('click', function() {
            document.getElementById("job-form").reset();
            overlay.classList.remove("active");
        });
    }
});