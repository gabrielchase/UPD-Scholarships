$body = $("body");

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
    const fileName = $(this).val()
    $(this).next('.custom-file-label').html(fileName)
})

$('#scholarship-form').submit((e) => {
    e.preventDefault()
    const files = $('#scholarshipInputFile').prop('files')
    const scholarshipFile = files[0]
    
    if (scholarshipFile == null) {
        alert('No file selected')
    }

    getSignedRequest(scholarshipFile)
    $body.addClass("loading");
})

function getSignedRequest(scholarshipFile) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `/sign-s3?file-name=${scholarshipFile.name}&file-type=${scholarshipFile.type}`)
    xhr.onreadystatechange = async () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                console.log('response: ', response)
                uploadFile(scholarshipFile, response.signedRequest, response.url, response.downloadUrl)
            } else {
                alert('Could not get signed URL')
            }
        }
    }
    xhr.send()
}

function uploadFile(scholarshipFile, signedRequest, url, downloadUrl) {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', signedRequest)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                $('[name=file_link]').val(downloadUrl)
                $('#scholarship-form').unbind('submit').submit()
                $body.removeClass("loading");
            }
        }
    }
    xhr.send(scholarshipFile)
}