from django.contrib.auth.decorators import login_required
from splunkdj.decorators.render import render_to

@render_to('sfcrime:home.html')
@login_required
def home(request):
    return {
        "message": "Hello World from San Fran Crime Map!",
        "app_name": "sfcrime"
    }
