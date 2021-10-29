from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Plans)
admin.site.register(Tags)
admin.site.register(RelatedTags)
admin.site.register(Asset)
admin.site.register(Review)
admin.site.register(SearchHistory)
admin.site.register(Order)
admin.site.register(Thumbnail)
admin.site.register(Downloads)
