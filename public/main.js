let courses = [
    'Anthropology', 'Applied Physics', 'Applied Psychology', 'Araling Pilipino', 'Architecture', 'Art Education', 'Art History',
    'Art Studies (Art History)', 'Art Studies (Interdisciplinary)', 'Art Studies (Philippine Art)','Biology', 
    'Broadcast Communication', 'Building Technology', 'Business Administration', 'Business Administration and Accountancy', 
    'Business Economics', 'Business Economics (UPEPP)', 'Business Management (UPEPP)','Chemical Engineering', 'Chemistry', 
    'Civil Engineering', 'Clothing Technology', 'Community Development', 'Communication Research', 'Community Nutrition', 
    'Comparative Literature', 'Computer Engineering', 'Computer Science', 'Creative Writing', 'Economics',
    'Electrical Engineering', 'Electronics and Communications Engineering', 'Elementary Education',
    'English Studies: Language', 'English Studies: Literature', 'European Languages', 'Family Life and Child Development', 
    'Filipino', 'Film', 'Food Technology', 'Geodetic Engineering', 'Geography', 'Geology', 'History', 'Home Economics',
    'Hotel, Restaurant and Institutional Management', 'Industrial Design', 'Industrial Engineering', 'Interior Design',
    'Journalism', 'Juris Doctor', 'Landscape Architecture', 'Library and Information Studies', 'Linguistics',
    'Malikhaing Pagsulat', 'Materials Engineering', 'Mechanical Engineering', 'Mathematics', 'Metallurgical Engineering', 
    'Mining Engineering', 'Molecular Biology and Biotechnology', 'Music', 'Painting', 'Philippine Studies', 
    'Philosophy', 'Physical Education', 'Physics', 'Political Science', 'Psychology', 'Public Administration',
    'Sculpture', 'Secondary Education', 'Social Work', 'Sociology', 'Speech Communication', 'Sports Science', 
    'Sports Studies', 'Statistics', 'Theatre Arts', 'Tourism', 'Visual Communication'
]

$("#add-course").click(function(e) {
    e.preventDefault()
    let options = '<select name="exclusive_courses" class="form-control mx-sm-1"><option value=""></option>'
    for(let course of courses) {
        options += '<option value="'+ course + '">' + course + '</option>';
    }
    options += '</select>'
    $("#scholarship-course-list").append(options)
})

$('#scholarshipInputFile').on('change', function() {
    //get the file name
    const fileName = $(this).val()
    console.log(fileName)
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(fileName)
    
    // const files = document.getElementById('scholarshipInputFile').files
    const files = $(this).prop('files')
    const scholarshipFile = files[0]
    console.log(scholarshipFile)
    
    if (scholarshipFile == null) {
        alert('No file selected')
    }

    getSignedRequest(scholarshipFile)
    // console.log(files)
})

function getSignedRequest(scholarshipFile) {
    console.log('in getSignedRequest')
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `/sign-s3?file-name=${scholarshipFile.name}&file-type=${scholarshipFile.type}`)
    xhr.onreadystatechange = () => {
        console.log(xhr)
        console.log(xhr.responseText)
        console.log(xhr.readyState)
        console.log(xhr.status)
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                console.log(response)
                uploadFile(scholarshipFile, response.signedRequest, response.url)
            } else {
                alert('Could not get signed URL')
            }
        }
    }
    xhr.send()
}

function uploadFile(scholarshipFile, signedRequest, url) {
    console.log('in uploadFile')
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', signedRequest)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('put good')
            }
        }
    }
    xhr.send(scholarshipFile)
}