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
    <tr>
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
        {%- if group[1] == 'planned' -%}{{ group[0] }}{%- else -%}
        <span class="season-{{ group[1] }}">{{ group[0] }}
          {%- if group[1] == 'rumor' -%}?{%- endif -%}
        </span>{%- endif -%}{% unless forloop.last %}, {% endunless %}
      {%- endfor -%}</td>
    </tr>
  {% endfor %}</tbody>
</table>

[Algo está errado?](https://xkcd.com/386/) Comente abaixo:
