document.getElementById('imageInput').onchange = function(event) {
    const [file] = event.target.files;
    if (file) {
        document.getElementById('displayImage').src = URL.createObjectURL(file);
        document.getElementById('displayImage').style.display = 'block';
    }
};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function submitForm() {
    var formData = new FormData();
    formData.append('input_text', $('#input_text').val());
    formData.append('image', $('#image')[0].files[0]);

    $.ajax({
        url: '/process_input',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        success: function(response) {
            $('#output').text(response.output_text);
        },
        error: function(response) {
            $('#output').text('Error: ' + response.responseJSON.error);
        }
    });
}