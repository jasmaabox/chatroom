import re

def fix_color(s):
    p = re.search(r'^#(?:[0-9a-fA-F]{3}){1,2}$', s)
    if p and get_rgb_value(s) > 192:
        return s
    else:
        return '#00ff00'
    
def get_rgb_value(s):
    h = s.lstrip('#')
    rgb_value = 0
    for i in [0, 2, 4]:
        rgb_value+=int(h[i:i+2], 16)
    return rgb_value
