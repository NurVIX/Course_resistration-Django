from django import forms


class Sign(forms.Form):
    name = forms.CharField(max_length=100, required=True, label="Name",  widget=forms.TextInput(attrs={'id': 'name'}))
    password = forms.CharField(
        max_length=100,
        required=True,
        label="Password",
        widget=forms.PasswordInput(attrs={'id': 'password'}))


class CreateAccount(forms.Form):
    user = forms.CharField(max_length=100, required=True, label="User", widget=forms.TextInput(attrs={'id': 'name'}))
    password = forms.CharField(
        min_length=8,
        max_length=100,
        required=True,
        label="Password",
        widget=forms.PasswordInput(attrs={'id': 'password'}))

    email = forms.EmailField(
        max_length=254,
        required=True,
        label="Email",
        widget=forms.EmailInput(attrs={'id': 'email'}))

    dob = forms.DateField(required=True, label="Date of Birth", widget=forms.widgets.DateInput(attrs={'type': 'date', 'id': 'date'}))


