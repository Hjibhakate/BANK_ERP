document.addEventListener("DOMContentLoaded", function() {
    loadDashboardData();
    renderCharts();
});

let employeeData = {
    totalEmployees: 150,
    activeEmployees: 140,
    pendingPayroll: 5000,
    disbursedPayroll: 45000,
    presentToday: 130,
    absentToday: 20,
    departments: {
        "HR": 30,
        "Finance": 25,
        "IT": 40,
        "Sales": 35,
        "Operations": 20
    },
    payrollTrends: [40000, 42000, 43000, 45000, 47000, 48000]
};

// Function to load initial data
function loadDashboardData() {
    document.getElementById("totalEmployees").innerText = employeeData.totalEmployees;
    document.getElementById("activeEmployees").innerText = employeeData.activeEmployees;
    document.getElementById("pendingPayroll").innerText = `$${employeeData.pendingPayroll}`;
    document.getElementById("disbursedPayroll").innerText = `$${employeeData.disbursedPayroll}`;
    document.getElementById("presentToday").innerText = employeeData.presentToday;
    document.getElementById("absentToday").innerText = employeeData.absentToday;
}

// Function to update charts dynamically
function renderCharts() {
    const ctx1 = document.getElementById("employeeChart").getContext("2d");
    window.employeeChart = new Chart(ctx1, {
        type: "pie",
        data: {
            labels: Object.keys(employeeData.departments),
            datasets: [{
                label: "Employees",
                data: Object.values(employeeData.departments),
                backgroundColor: ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"]
            }]
        }
    });

    const ctx2 = document.getElementById("payrollChart").getContext("2d");
    window.payrollChart = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Payroll Disbursed",
                data: employeeData.payrollTrends,
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                fill: true
            }]
        }
    });
}

// Function to add new employee dynamically
function addEmployee() {
    let name = document.getElementById("empName").value;
    let department = document.getElementById("empDepartment").value;

    if (name === "" || department === "") {
        alert("Please enter employee name and department!");
        return;
    }

    // Update employee count
    employeeData.totalEmployees += 1;
    employeeData.activeEmployees += 1;
    document.getElementById("totalEmployees").innerText = employeeData.totalEmployees;
    document.getElementById("activeEmployees").innerText = employeeData.activeEmployees;

    // Update department count
    if (employeeData.departments[department]) {
        employeeData.departments[department] += 1;
    } else {
        employeeData.departments[department] = 1;
    }

    // Update chart
    employeeChart.data.labels = Object.keys(employeeData.departments);
    employeeChart.data.datasets[0].data = Object.values(employeeData.departments);
    employeeChart.update();
}


// Function to switch sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Function to add an employee
function addEmployee() {
    const employeeTable = document.getElementById('employeeTable');
    const row = employeeTable.insertRow();
    row.innerHTML = `
        <td>John Doe</td>
        <td>HR</td>
        <td>$5000</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
}

// Function to delete an employee
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Function to mark attendance
function markAttendance() {
    document.getElementById('attendanceStatus').innerText = "Attendance Marked!";
}

// Function to generate payroll
function generatePayroll() {
    document.getElementById('payrollStatus').innerText = "Payroll Generated Successfully!";
}






