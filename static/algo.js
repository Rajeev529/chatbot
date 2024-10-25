$(document).ready(function() {
    $('#fetchText').click(function() {
        $.ajax({
            url: '/get-text',  // Django view endpoint
            type: 'GET',
            success: function(response) {
                var message = response.text;
                document.getElementById('input_text').value=message;
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    });
});

function userinput(){
    var val1=document.getElementById('input_text').value;
    document.getElementById('container').innerHTML+=`<p id="input" >${val1}</p>`;
}
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

function Voice(text){
    fetch(`/play1?text=${encodeURIComponent(text)}`)
}

function submitForm() {
    var block1=document.getElementById('container').innerHTML;
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
            // $('#output').text(response.output_text);
            var message = response.output_text;
            document.getElementById('container').innerHTML=document.getElementById('container').innerHTML+`<p id="output">${message}</p>`;;
            // Voice(message);
        },
        error: function(response) {
            $('#output').text('Error: ' + response.responseJSON.error);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('image').onchange = function(event) {
        const [file] = event.target.files;
        if (file) {
        document.getElementById('displayImage').src = URL.createObjectURL(file);
        document.getElementById('displayImage').style.display = 'block';
        } else {
        console.log("No file selected");
        }
    };
});    