"""Build dist/otto.embed.css and single-file examples.

The embed build is for dropping Otto UI into someone else's page (a portfolio, a CMS):
it adds an isolation reset and raises every component selector under .otto-theme so the
host page's CSS can't restyle the components and the components can't leak out.

Usage: python3 scripts/build-embed.py
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = ROOT / "css"
DIST = ROOT / "dist"

ISOLATE = """/* Isolation: undo whatever the host page styles inside .otto-theme (SVG keeps its own attributes) */
.otto-theme, .otto-theme *:not(svg, svg *) { all: revert; }
"""


def split_top(sel):
    out, depth, cur = [], 0, ""
    for ch in sel:
        depth += ch == "("
        depth -= ch == ")"
        if ch == "," and depth == 0:
            out.append(cur.strip()); cur = ""
        else:
            cur += ch
    out.append(cur.strip())
    return out


def scope(selector):
    parts = []
    for p in split_top(selector):
        if p.startswith(".otto-theme :where(") or p == ".otto-theme":
            # base resets: beat the isolation rule (0,1,1) but stay below components (0,2,0)
            parts.append(".otto-theme.otto-theme" + p[len(".otto-theme"):])
        elif p.startswith(".otto-theme"):
            parts.append(p)
        elif p.startswith("."):
            parts.append(".otto-theme " + p)
        else:
            parts.append(p)
    return ", ".join(parts)


def walk(css):
    """Prefix selectors of style rules; recurse into @container/@media/@supports blocks."""
    out, i = [], 0
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    while i < len(css):
        j = css.find("{", i)
        if j == -1:
            out.append(css[i:]); break
        head = css[i:j].strip()
        depth, k = 1, j + 1
        while depth:
            depth += css[k] == "{"
            depth -= css[k] == "}"
            k += 1
        body = css[j + 1:k - 1]
        if head.startswith("@"):
            out.append(f"{head} {{\n{walk(body)}}}\n")
        elif head:
            out.append(f"{scope(head)} {{{body}}}\n")
        i = k
    return "".join(out)


def build_embed():
    tokens = (CSS / "tokens.css").read_text()
    comps = (CSS / "components.css").read_text()
    DIST.mkdir(exist_ok=True)
    css = ISOLATE + re.sub(r"/\*.*?\*/", "", tokens, flags=re.S) + walk(comps)
    (DIST / "otto.embed.css").write_text(css)
    return css


def single_file(example, out, embed_css):
    """Inline the embed CSS into an example page and keep only the .otto-theme part of <body>."""
    html = (ROOT / "examples" / example).read_text()
    page_css = re.search(r"<style>(.*?)</style>", html, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)
    page_css = walk(page_css)
    font = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');\n"
    doc = (f"<!-- {example}: Otto design system, plain HTML + CSS, no JavaScript.\n"
           f"     Everything is scoped under .otto-theme so it won't touch the rest of your page. -->\n"
           f"<style>\n{font}{embed_css}{page_css}</style>\n"
           f'<div class="otto-theme" style="border-radius: 8px; overflow: hidden">{body}</div>\n')
    pathlib.Path(out).write_text(doc)


if __name__ == "__main__":
    css = build_embed()
    single_file("ats-new-activity.html", DIST / "ats-new-activity.single.html", css)
    print("built", DIST)
