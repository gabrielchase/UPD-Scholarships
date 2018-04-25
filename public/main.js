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