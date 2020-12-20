import os, sys

f = open(os.path.join(os.sys.path[0], 'books.csv'))
f.readline()


# INSERT INTO book VALUES ($ISBNCode,$Title,$Publisher,$Year,$NumPage),...;
query = "INSERT INTO `library`.`book` VALUES\n"
w = open('res.txt', 'w')
w.write(query)  

i = 0
while i < 7000:
  i += 1
  l = [''] * 12
  try :
    l = f.readline().replace('\'', '\\\'').split(',')
  except:
    print(i, f.readline())

  query = "(\'" + l[5] + "\',\'" + l[1] + "\',\'" + l[11][:-1] + "\'," + l[10][-4:] + "," + l[7] + "),\n"
  if i == 7000:
    query = query[:-2] + '\n;'
  if l[0] != '' and len(l[1]) <= 100 and len(l[11]) <= 30 and l[7].isdigit() and l[10][-4:].isdigit(): w.write(query)

w.close()

  