 const enrollees = [];
    let currentlyEditing = -1;

    const enrolleeForm = document.getElementById("enrolleeForm");
    const enrolleeList = document.getElementById("enrolleeList");
    const submitButton = document.getElementById("submitButton");

    enrolleeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const middleName = document.getElementById("middleName").value;
      const lastName = document.getElementById("lastName").value;
      const age = document.getElementById("age").value;
      const gender = document.getElementById("gender").value;
      const birthday = document.getElementById("birthday").value;
      const course = document.getElementById("course").value;
      const schoolYear = document.getElementById("schoolYear").value;

      if (currentlyEditing === -1) {
        const enrollee = {
          firstName,
          middleName,
          lastName,
          age,
          gender,
          birthday,
          course,
          schoolYear,
        };

        enrollees.push(enrollee);
      } else {
        // Update the existing enrollee when in edit mode
        enrollees[currentlyEditing] = {
          firstName,
          middleName,
          lastName,
          age,
          gender,
          birthday,
          course,
          schoolYear,
        };
        currentlyEditing = -1; // Reset edit mode
        submitButton.value = "Add Enrollee"; // Reset button text
      }

      enrolleeForm.reset();
      displayEnrollees();
    });

    
    function searchEnrollees() {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const filteredEnrollees = enrollees.filter((enrollee) => {
          const fullName = `${enrollee.firstName} ${enrollee.middleName} ${enrollee.lastName}`.toLowerCase();
          return fullName.includes(searchInput);
        });
        displayEnrollees(filteredEnrollees);
      }
      function searchInList() {
        const listSearchInput = document.getElementById("listSearchInput").value.toLowerCase();
        const table = document.getElementById("enrolleeList");
        const rows = table.getElementsByTagName("tr");
      
        for (let i = 1; i < rows.length; i++) {  // Start from index 1 to skip the table headers
          const row = rows[i];
          const fullName = row.cells[0].textContent.toLowerCase();
      
          if (fullName.includes(listSearchInput)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        }
      }
  
      function displayEnrollees(enrolleesToDisplay) {
        const tbody = document.getElementById("enrolleeList");
        tbody.innerHTML = '';
  
        enrolleesToDisplay.forEach((enrollee, index) => {
          const row = tbody.insertRow();
          row.innerHTML = `
            <td>${enrollee.firstName} ${enrollee.middleName} ${enrollee.lastName}</td>
            <td>${enrollee.age}</td>
            <td>${enrollee.gender}</td>
            <td>${enrollee.birthday}</td>
            <td>${enrollee.course}</td>
            <td>${enrollee.schoolYear}</td>
            <td>
              <button onclick="editEnrollee(${index})">Edit</button>
              <button onclick="deleteEnrollee(${index})">Delete</button>
            </td>
          `;
        });
      }
  
  

    function displayEnrollees() {
      const tbody = document.getElementById("enrolleeList");
      tbody.innerHTML = '';

      enrollees.forEach((enrollee, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
          <td>${enrollee.firstName} ${enrollee.middleName} ${enrollee.lastName}</td>
          <td>${enrollee.age}</td>
          <td>${enrollee.gender}</td>
          <td>${enrollee.birthday}</td>
          <td>${enrollee.course}</td>
          <td>${enrollee.schoolYear}</td>
          <td>
            <button onclick="editEnrollee(${index})">Edit</button>
            <button onclick="deleteEnrollee(${index})">Delete</button>
          </td>
        `;
      });
    }

    function editEnrollee(index) {
      currentlyEditing = index;
      const enrollee = enrollees[index];
      // Change the button text to "Update" in edit mode
      submitButton.value = "Update";

      // Populate the form fields with the selected enrollee's data
      document.getElementById("firstName").value = enrollee.firstName;
      document.getElementById("middleName").value = enrollee.middleName;
      document.getElementById("lastName").value = enrollee.lastName;
      document.getElementById("age").value = enrollee.age;
      document.getElementById("gender").value = enrollee.gender;
      document.getElementById("birthday").value = enrollee.birthday;
      document.getElementById("course").value = enrollee.course;
      document.getElementById("schoolYear").value = enrollee.schoolYear;
    }

    function deleteEnrollee(index) {
      enrollees.splice(index, 1);
      displayEnrollees();
    }