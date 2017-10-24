import re

def fix_color(s):
    p = re.search(r'^#(?:[0-9a-fA-F]{3}){1,2}$', s)
    if p:
        return s
    else:
        return '#00ff00'
