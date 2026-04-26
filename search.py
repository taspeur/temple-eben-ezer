import urllib.request
import re

url = "https://html.duckduckgo.com/html/?q=site+officiel+assemblees+de+dieu+burkina+faso"
req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)
html = urllib.request.urlopen(req).read().decode('utf-8')

links = re.findall(r'href="(https?://[^"]+)"', html)
for link in links:
    if "duckduckgo" not in link:
        print(link)
