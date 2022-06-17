Since the legacy chat API exposes all types of messages filtering `HIDDEN`, `WHISPER`, etc. on client side

1. Chat provided by `supply.*` subdomain has to be loaded as a page (and not an iframe)
2. `content_script` (having DOM access) mounts `web_accessible` script (accessing window scope)
3. `web_accessible` script overrides global function responsible for message filtering

Browser supporting `Manifest v3` required
