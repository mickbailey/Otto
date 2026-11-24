"""Local server for the audit/playground/showcase site in site/.

Serves the whole project as static files (so the site can fetch css/tokens.css,
docs/**, examples/** etc. by plain path) and adds two small JSON endpoints the
static server doesn't have:

  GET  /api/manifest     -> lists docs/components, docs/styling, examples, dist
                             so the Audit tab reflects the real filesystem, not
                             a hardcoded snapshot.
  POST /api/save-tokens   -> writes the request body to css/tokens.css (used by
                             the Playground's "Save to tokens.css"), after
                             backing up the previous file to css/.backups/.

Usage: python3 scripts/serve.py [port]   (default port 8420)
"""
import datetime
import http.server
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        # the site's CSS/JS change on disk often while it's open; don't let the
        # browser serve a stale cached copy after an edit
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def do_GET(self):
        if self.path == "/api/manifest":
            def names(rel, suffix=None):
                d = ROOT / rel
                if not d.is_dir():
                    return []
                return sorted(
                    f.name for f in d.iterdir()
                    if f.is_file() and (suffix is None or f.name.endswith(suffix))
                )

            self._json(200, {
                "componentDocs": names("docs/components", ".md"),
                "stylingDocs": names("docs/styling", ".md"),
                "examples": names("examples", ".html"),
                "dist": names("dist"),
            })
            return
        super().do_GET()

    def do_POST(self):
        if self.path == "/api/save-tokens":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length).decode("utf-8")
            if ".otto-theme {" not in body[:400] or body.count("--otto-") < 40:
                self._json(400, {"ok": False, "error": "Body doesn't look like tokens.css — refusing to overwrite."})
                return
            tokens_path = ROOT / "css" / "tokens.css"
            backups = ROOT / "css" / ".backups"
            backups.mkdir(exist_ok=True)
            stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
            backup_name = f"tokens.{stamp}.css"
            (backups / backup_name).write_text(tokens_path.read_text(encoding="utf-8"), encoding="utf-8")
            tokens_path.write_text(body, encoding="utf-8")
            self._json(200, {"ok": True, "backup": f"css/.backups/{backup_name}"})
            return
        self._json(404, {"ok": False, "error": "no such endpoint"})

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8420
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler) as httpd:
        print(f"Otto design system site: http://127.0.0.1:{port}/site/")
        print("Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
