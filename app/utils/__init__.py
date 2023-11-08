import re

def ensure_https(url):
    if url.startswith("https://") or url.startswith("http://"):
        return url
    return "https://" + url

def embed_video(url):
    return re.sub(r"watch\?v=", "embed/", url)
