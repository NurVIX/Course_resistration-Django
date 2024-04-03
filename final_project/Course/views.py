import json
from django.shortcuts import render
from .forms import Sign, CreateAccount
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect
from .models import Courses, Enrollment
from django.shortcuts import get_object_or_404


def index(request):
    return render(request, 'index.html')


def sign(request):
    if request.method == 'POST':
        post = Sign(request.POST)

        if post.is_valid():
            name, password = post.cleaned_data['name'], post.cleaned_data['password']
            created = authenticate(username=name, password=password)

            if created:
                login(request, created)
                return JsonResponse({'found': True})
            else:
                return JsonResponse({'found': False}, status=401)

        else:
            return JsonResponse({'found': False}, status=401)
    else:
        get = Sign()
        return render(request, 'login.html', {'form': get})


def account(request):
    ids = Enrollment.objects.filter(student_id=request.user.id)
    courses = [Courses.objects.get(id=id.course_id).name for id in ids]

    if request.user.is_authenticated:
        username = request.user.username
        return render(request, "account.html", {'user': username, 'courses': courses})


def create(request):
    if request.method == "POST":
        current_account = CreateAccount(request.POST)

        if current_account.is_valid():
            name, password = current_account.cleaned_data['user'], current_account.cleaned_data['password']
            email = current_account.cleaned_data['email']
            exists = User.objects.filter(username=name).exists()

            if exists:
                return JsonResponse({"exist": True}, status=409)
            else:
                user = User(username=name, email=email)
                user.set_password(password)
                user.save()
                user = authenticate(username=name, password=password)
                login(request, user)
                return JsonResponse({"exist": False})

    current_account = CreateAccount()

    return render(request, "create.html", {"current_account": current_account})


def out(request):
    logout(request)
    return redirect('sign')


def register(request):
    if request.user.is_authenticated:
        courses_objects = Courses.objects.all()
        courses_list = [course.name for course in courses_objects]

        return render(request, 'register.html', {'courses': courses_list})


def courses(request):
    if request.method == "POST":
        data = json.loads(request.body)
        selected = data['courses']

        for course in selected:
            course = get_object_or_404(Courses, name=course)
            is_enrolled = Enrollment.objects.filter(student_id=request.user.id, course_id=course.id).exists()

            if not is_enrolled:
                Enrollment.objects.create(student_id=request.user.id, course_id=course.id)

        return JsonResponse({'registered': True})