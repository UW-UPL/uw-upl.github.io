#!/usr/bin/env python

import csv
import json
import sys

def main(filename):
    books = []
    with open(filename, 'r') as f:
        lines = csv.reader(f, delimiter='\t')
        for l in lines:
            title, authors, isbn, year, subject, lang, topics, num = l
            books.append({
                'title': title,
                'authors': authors,
                'isbn': isbn,
                'year': year,
                'subject': subject,
                'lang': lang,
                'topics': topics,
                'num': num,
            })
    books.sort(key=lambda x: x['title'])
    print json.dumps(books, sort_keys=True, indent=4, separators=(',', ':'))

if __name__ == '__main__':
    main(sys.argv[1])
