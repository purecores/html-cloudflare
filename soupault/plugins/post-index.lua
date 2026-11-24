-- Soupault post-index hook (Lua 2.5): publish the KB theme toolbar,
-- mark content for Pagefind, and export page metadata for the reader.

local fields = index_fields
if type(fields) ~= "table" then fields = {} end
local url = page_url or ""
local src = page_file or ""
if not Regex.match(url, "^/kb/") then
  return
end

local title = fields["title"] or ""
local base = Sys.basename(src)
local slug = Sys.basename(Sys.dirname(src))
local id = Sys.strip_extension(base)
local kind = "doc"
if base == "index.html" then kind = "overview" end
local code = ""
if kind == "overview" then
  code = "总"
else
  local digits = Regex.find_all(id, "^[0-9]+")
  if digits[1] then code = digits[1] end
end
local short = title
local parts = Regex.split(title, "·")
if parts[2] then short = parts[2] end
short = String.trim(short)
if kind == "overview" then short = "总览" end

local host_css = [[
.am-export, .am-colophon, .am-reply, .am-reply-bar, .am-remark-hover, .am-remark-pop, .am-comment-btn,
[data-am="reply"], [data-am="remark"], [data-am="copy"], [data-am="export"] { display: none !important; }
]]

local head = HTML.select_one(page, "head")
if head then
  local style = HTML.create_element("style")
  HTML.set_attribute(style, "data-kb-host-style", "")
  HTML.append_child(style, HTML.create_text(host_css))
  HTML.append_child(head, style)
end

local main = HTML.select_one(page, "main")
if main then
  HTML.set_attribute(main, "data-pagefind-body", "")
end

local ignore_selectors = {".am-toc", ".am-colophon", ".am-export", ".am-reply-bar", ".am-remark-pop", ".am-comment-btn", ".am-code-copy", ".am-table-controls", ".am-toolbar", "#am-source"}
local k = 1
while ignore_selectors[k] do
  local els = HTML.select(page, ignore_selectors[k])
  if els then
    local j = 1
    while els[j] do
      HTML.set_attribute(els[j], "data-pagefind-ignore", "")
      j = j + 1
    end
  end
  k = k + 1
end

local images = HTML.select(page, "[data-am-src]")
if images then
  local i = 1
  while images[i] do
    local el = images[i]
    local v = HTML.get_attribute(el, "data-am-src")
    if v then HTML.set_attribute(el, "data-am-src", Regex.replace(v, "^[.][.]/", "")) end
    i = i + 1
  end
end

local csp = HTML.select_one(page, "meta[http-equiv=\"Content-Security-Policy\"]")
if csp then
  local c = HTML.get_attribute(csp, "content")
  if c then HTML.set_attribute(csp, "content", Regex.replace(c, "img-src data:", "img-src data: 'self'")) end
end

local chars = 0
if main then
  local text = HTML.inner_text(main)
  if text then
    text = Regex.replace_all(text, "\\s+", "")
    chars = String.length(text)
  end
end

fields["kb"] = slug
fields["file"] = base
fields["id"] = id
fields["kind"] = kind
fields["code"] = code
fields["short"] = short
fields["chars"] = chars
index_fields = fields
