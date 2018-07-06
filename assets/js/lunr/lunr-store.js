---
layout: null
---

var store = {
  {%- for season in site.data.seasons -%}
    {{- season[0] | jsonify -}}:[
    {%- for entry in season[1] -%}
      {"name": {{- entry.name_ja | jsonify -}}
        {%- if entry.name_pt -%}
          ,"name_pt": {{- entry.name_pt | jsonify -}}
        {%- endif -%}
        {%- if entry.groups -%}
          ,"groups": {{- entry.groups | jsonify -}}
        {%- endif -%}
      }{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ]{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}}
