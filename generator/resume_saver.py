from django.core.files.storage import FileSystemStorage
from generator.models import LinkedInPDF
from collections import namedtuple
import generator.resume_parser as resume_parser
import uuid

Resume = namedtuple('Resume', ['guid', 'json'])

def save(myfile):
  fs = FileSystemStorage()
  extension = myfile.name.split('.')[-1]
  random_name = uuid.uuid4()
  filename ="%s.%s" % (random_name, extension)
  fs.save(filename, myfile)
  uploaded_file_json = resume_parser.convert(filename)
  pdf = LinkedInPDF(guid=random_name, json=uploaded_file_json)
  pdf.save()
  return Resume(guid=random_name, json=uploaded_file_json)
