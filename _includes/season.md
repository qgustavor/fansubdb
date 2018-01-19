**Legenda:**

* Preto - Planejado
* Preto? - Rumor/não-certo
* <span class="season-trailer">Vermelho</span> - Lançaram vídeo promocional ou trailer
* <span class="season-active">Verde</span> - Lançaram pelo menos um episódio
* <span class="season-stream">Azul</span> - Streaming oficial
* ~~Cortado~~ - Desistiram do projeto ("dropparam" ele)

<!-- Só um aviso: apesar da tentativa de organização esse template está uma bagunça -->
<table>
  <thead><tr><th>Nome</th><th>Produção</th><th>Episódios</th><th>Grupos</th></tr></thead>
  <tbody>{% for entry in season %}
    <tr>
      <td>{{ entry.name_ja }}
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

Algo está errado? Está faltando alguma fansub?  
Leia [as regras](../regras/) e comente abaixo:
