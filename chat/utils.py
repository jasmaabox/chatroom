import re

def fix_color(s):
    p = re.search(r'^#(?:[0-9a-fA-F]{3}){1,2}$', s)
    if p:
        h = s.lstrip('#')
        rgbValue = 0
        for i in [0, 2, 4]:
            rgbValue+=int(h[i:i+2], 16)
        if rgbValue > 64:   #Minimum color value
            return s
        else:
            return '#00ff00'
    else:
        return '#00ff00'
