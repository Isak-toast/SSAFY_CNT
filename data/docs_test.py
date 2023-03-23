from docxtpl import DocxTemplate
import jinja2

def multiply_by(value, by):
   return value * by

doc = DocxTemplate("demo.docx")
context = { 'price_dollars' : 5.00 }
jinja_env = jinja2.Environment()
jinja_env.filters['multiply_by'] = multiply_by
doc.render(context,jinja_env)
doc.save("isakggong.docx")

# from docxtpl import *
# from docx.shared import Mm, Inches, Pt
# import jinja2

# def multiply_by(value, by):
#    return value * by

# doc = DocxTemplate("demo.docx")
# context = { 'price_dollars' : 5.00,
#             'myimage' : InlineImage(doc,'logo.jpg',width=Mm(20)),
#             'myimageratio': InlineImage(doc, 'diagram.png', width=Mm(30), height=Mm(60)),

#             'frameworks' : [{'image' : InlineImage(doc,'maryfarm.png',height=Mm(10)),
#                             'desc' : 'The web framework for perfectionists with deadlines'},

#                             {'image' : InlineImage(doc,'maryfarm.png',height=Mm(10)),
#                             'desc' : 'Zope is a leading Open Source Application Server and Content Management Framework'},

#                             {'image': InlineImage(doc, 'maryfarm.png', height=Mm(10)),
#                             'desc': 'Pyramid is a lightweight Python web framework aimed at taking small web apps into big web apps.'},

#                             {'image' : InlineImage(doc,'logo.jpg',height=Mm(10)),
#                             'desc' : 'Bottle is a fast, simple and lightweight WSGI micro web-framework for Python'},

#                             {'image': InlineImage(doc, 'diagram', height=Mm(10)),
#                             'desc': 'Tornado is a Python web framework and asynchronous networking library.'},
#             ]
# }
# jinja_env = jinja2.Environment(autoescape=True)
# # jinja_env.filters['multiply_by'] = multiply_by

# doc.render(context,jinja_env)
# doc.save("generated_doc.docx")

