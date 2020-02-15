<!-- Só um aviso: apesar da tentativa de organização esse template está uma bagunça -->
<table class="stupidtable">
  <thead><tr>
    <th data-sort="string">Estreia</th>
    <th data-sort="string" data-sort-onload="yes">Nome</th>
    <th data-sort="string">Produção</th>
    <th data-sort="int">Episódios</th>
    <th data-sort="string">Grupos</th>
  </tr></thead>
  <tbody>{% for entry in season %}
    <tr id="{{ entry.name_ja | slugify }}">
      <td data-sort-value="{{ entry.premiere }}">
        {%- if entry.premiere -%}<abbr title="{{ entry.premiere | date: "%D %T" }} JST">{{ entry.premiere | date: "%d/%m/%y" }}</abbr>{%- endif -%}
        {%- if entry.premiere and entry.stations-%}<br>{%- endif -%}{{ entry.stations }}
      </td>
      <td>{%- if entry.url -%}<a href="{{ entry.url }}" target="_blank" rel="nofollow noreferrer noopener">{{ entry.name_ja }}</a>
        {%- else -%}{{ entry.name_ja }}{%- endif -%}
        {%- if entry.name_pt or entry.is_short or entry.season or entry.extra_info -%}<small>{%- endif -%}
        {%- if entry.name_pt -%}<br>({{ entry.name_pt }}){%- endif -%}
        {%- if entry.is_short -%}<br>Anime de episódios curtos{%- endif -%}
        {%- if entry.season -%}<br>{{ entry.season }}ª temporada{%- endif -%}
        {%- if entry.extra_info -%}<br>{{ entry.extra_info }}{%- endif -%}
        {%- if entry.name_pt or entry.is_short or entry.season or entry.extra_info -%}</small>{%- endif -%}
      </td>
      <td>{{ entry.studio }}</td>
      <td>{{ entry.episodes }}</td>
      <td>{%- for group in entry.groups -%}
        {%- assign groupStatus = group[1] -%}
        {%- assign statusExtra = false -%}

        {%- if groupStatus.first -%}
          {%- assign statusExtra = groupStatus[1] -%}
          {%- assign groupStatus = groupStatus[0] -%}
        {%- endif -%}

        {%- if groupStatus.status -%}
          {% assign statusExtra = groupStatus.extra -%}
          {% assign groupStatus = groupStatus.status -%}
        {%- endif -%}

        {%- if groupStatus == 'hidden' -%}<span hidden>{% endif %}
        <span class="season-{{ groupStatus }}">{{ group[0] }}
          {%- if groupStatus == 'rumor' -%}?{%- endif -%}
          {%- if statusExtra %} <span class="season-extra">({{ statusExtra }})</span>{%- endif -%}
        </span>
        {%- if groupStatus == 'hidden' -%}</span>{% endif %}
        {%- unless forloop.last %}, {% endunless -%}
      {%- endfor -%}</td>
    </tr>
  {% endfor %}</tbody>
</table>
