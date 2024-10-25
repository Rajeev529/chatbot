from django.shortcuts import render
import google.generativeai as genai
import PIL.Image
from io import BytesIO
from django.http import JsonResponse
from PIL import Image
import PyPDF2, tempfile
import io
import json
import gtts
import playsound
import speech_recognition as sr
# from gemini_pro import GeminiClient

# Create your views here.
def index(request):
    return render(request,'index.html')
def login(request):
    return render(request,'login.html')
def signup(request):
    return render(request,'signup1.html')

# myapp/views.py


def ajax(request):
    return render(request, 'ajax.html')
def home(request):
    return render(request, 'home.html')



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class GenerateContentResponse:
    def __init__(self, output_text):
        self.output_text = output_text

    # Optionally add a method to convert to a dict
    def to_dict(self):
        return {'output_text': self.output_text}
    

#    chatAjax doing on it   main app

def play1(request):
    text=request.GET.get('text', '')
    sound = gtts.gTTS(text, lang="en")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
        temp_file_path = temp_file.name
        sound.save(temp_file_path)
    playsound.playsound(temp_file_path)
    return



@csrf_exempt  # Use this only for testing; ideally, keep CSRF protection
def process_input(request):
    if request.method == 'POST':
        try:
            input_text = request.POST.get('input_text')
            image = request.FILES.get('image')
            
            # Process the input and image as needed
            output_text = "Processed: " + input_text  # Example processing
            pic=PIL.Image.open(image)
        
            genai.configure(api_key='AIzaSyACHf116hhK8npHQV1isLpGitEpmREK8RI')
            client = genai.GenerativeModel('gemini-1.5-flash')
            
            # Handle image query (assuming you have a method to process images)
            image_response = client.generate_content([input_text,pic])
            json_response = json.dumps(image_response.to_dict())
            data = json.loads(json_response)
            text_content = data["candidates"][0]["content"]["parts"][0]["text"]
            print(text_content)
            return JsonResponse({'output_text':text_content})
            # return JsonResponse({'output_text': image_response})
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)

def chatAjax(request):
    return render(request,'chatAjax.html')

def gettext(request):
    recognizer = sr.Recognizer()
    with sr.Microphone() as mic:  
        print("Listening...")
        audio = recognizer.listen(mic)

    # Now you can process the captured audio
    try:
        text = recognizer.recognize_google(audio)
        print("You said:", text)
        return JsonResponse({"text": text})
        # return text
    except sr.UnknownValueError:
        print("Could not understand the audio.")
    except sr.RequestError:
        print("Could not request results; check your internet connection.")

