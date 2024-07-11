let students = [];

function showAddForm() {
    hideAllForms();
    document.getElementById('addForm').style.display = 'block';
}

function addStudent() {
    let name = document.getElementById('name').value;
    let rollNumber = parseInt(document.getElementById('rollNumber').value);
    let age = parseInt(document.getElementById('age').value);
    let grade = parseFloat(document.getElementById('grade').value);

    let student = { name, rollNumber, age, grade };
    students.push(student);
    alert('Student added successfully!');
    document.getElementById('name').value = '';
    document.getElementById('rollNumber').value = '';
    document.getElementById('age').value = '';
    document.getElementById('grade').value = '';
}

function displayStudents() {
    hideAllForms();
    let studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach(student => {
        let li = document.createElement('li');
        li.textContent = `Name: ${student.name}, Roll Number: ${student.rollNumber}, Age: ${student.age}, Grade: ${student.grade}`;
        
        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = function() {
            showUpdateForm(student.rollNumber);
        };
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteStudent(student.rollNumber);
        };
        
        li.appendChild(updateButton);
        li.appendChild(deleteButton);
        
        studentList.appendChild(li);
    });
    document.getElementById('displayStudents').style.display = 'block';
}

function showUpdateForm(rollNumber) {
    hideAllForms();
    let student = students.find(s => s.rollNumber === rollNumber);
    if (student) {
        document.getElementById('updateForm').style.display = 'block';
        document.getElementById('updateName').value = student.name;
        document.getElementById('updateAge').value = student.age;
        document.getElementById('updateGrade').value = student.grade;
        
        document.getElementById('updateFormSubmit').onclick = function() {
            updateStudent(rollNumber);
        };
    }
}

function updateStudent(rollNumber) {
    let studentIndex = students.findIndex(s => s.rollNumber === rollNumber);
    if (studentIndex !== -1) {
        let name = document.getElementById('updateName').value;
        let age = parseInt(document.getElementById('updateAge').value);
        let grade = parseFloat(document.getElementById('updateGrade').value);

        students[studentIndex].name = name;
        students[studentIndex].age = age;
        students[studentIndex].grade = grade;

        alert('Student updated successfully!');
        hideAllForms();
        displayStudents();
    }
}

function deleteStudent(rollNumber) {
    let studentIndex = students.findIndex(s => s.rollNumber === rollNumber);
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        alert('Student deleted successfully!');
        displayStudents(); // Refresh the list after deletion
    }
}

function showAverageGrade() {
    hideAllForms();
    if (students.length === 0) {
        alert('No students found.');
        return;
    }
    let totalGrade = students.reduce((acc, student) => acc + student.grade, 0);
    let averageGrade = totalGrade / students.length;
    document.getElementById('avgGradeResult').textContent = `Average Grade: ${averageGrade.toFixed(2)}`;
    document.getElementById('averageGrade').style.display = 'block';
}

function exitApplication() {
    if (confirm('Are you sure you want to exit?')) {
        window.close(); // Close the browser window/tab
    }
}

function hideAllForms() {
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('displayStudents').style.display = 'none';
    document.getElementById('averageGrade').style.display = 'none';
    document.getElementById('updateForm').style.display = 'none';
}
