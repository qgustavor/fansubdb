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
          ,"groups":{
            {%- for group in entry.groups -%}
              {%- assign groupStatus = group[1] -%}

              {%- if groupStatus.first -%}
                {%- assign statusExtra = groupStatus[1] -%}
              {%- endif -%}

              {%- if groupStatus.status -%}
                {% assign statusExtra = groupStatus.extra -%}
              {%- endif -%}

              {%- unless groupStatus == 'hidden' -%}
                "{{group[0]}}":"{{groupStatus}}"
                {%- unless forloop.last %},{% endunless -%}
              {%- endunless -%}
            {%- endfor -%}
          }
        {%- endif -%}
      }{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ]{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}}
