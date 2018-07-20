---
layout: null
---

/* global $, lunr */
$(document).ready(function () {
  var resultdiv = $('#results')
  var readyPromise
  var idx
  $('button.search__toggle').one('click', loadSearch)
  $('input#search').on('keyup', handleSearch)

  function loadSearch () {
    if (readyPromise) return readyPromise
    if (window.store) {
      initIndex()
      readyPromise = $.Deferred().resolve()
    } else {
      resultdiv.empty().prepend('<p class="results__found">Iniciando pesquisa, aguarde...</p>')
      readyPromise = $.getScript('{{ "/assets/js/lunr/lunr-store.js" | absolute_url }}').then(initIndex)
    }

    return readyPromise
  }

  function initIndex () {
    idx = lunr(function () {
      this.field('name')
      this.field('name_pt')
      this.ref('id')

      this.pipeline.remove(lunr.trimmer)

      var store = window.store
      for (var season in store) {
        for (var i = 0; i < store[season].length; i++) {
          this.add({
            name: store[season][i].name,
            name_pt: store[season][i].name_pt,
            id: season + '/' + i
          })
        }
      }
    })
  }

  function handleSearch () {
    if (!idx) return loadSearch().then(handleSearch)
    var query = $(this).val().toLowerCase().trim()
    if (!query) return resultdiv.empty()
    var result =
      idx.query(function (q) {
        query.split(lunr.tokenizer.separator).forEach(function (term) {
          q.term(term, { boost: 100 })
          if (query.lastIndexOf(' ') !== query.length - 1) {
            q.term(term, { usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
          }
          if (term !== '') {
            q.term(term, { usePipeline: false, editDistance: 1, boost: 1 })
          }
        })
      })
    resultdiv.empty().prepend('<p class="results__found">' + result.length + ' {{ site.data.ui-text[site.locale].results_found | default: "Result(s) found" }}</p>')

    for (var itemKey in result) {
      var ref = result[itemKey].ref.split('/')
      var item = window.store[ref[0]][ref[1]]
      var season = ref[0].split('-')
      var details = $('<p class="archive__item-excerpt" itemprop="description">')
        .text('Temporada de ' + (season[1] === 'verao' ? 'verão' : season[1]) + ' de ' + season[0] + ' - ')

      if (item.name_pt) {
        details.prepend($('<em>').text(item.name_pt), '<br>')
      }

      if (item.groups) {
        details.append('Disponível em ')
        var groups = []
        for (var group in item.groups) {
          groups.push([group, item.groups[group]])
        }
        for (var i = 0; i < groups.length; i++) {
          details.append(
            $('<span>').addClass('season-' + groups[i][1]).text(groups[i][0]),
            i === groups.length - 1 ? '.' : i === groups.length - 2 ? ' e ' : ', '
          )
        }
      } else {
        details.append('Nenhuma tradução foi encontrada.')
      }

      $('<div class="list__item">').append(
        $('<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">').append(
          $('<h2 class="archive__item-title" itemprop="headline">').append(
            $('<a rel="permalink">')
              .attr('href', '/' + ref[0] + '#' + item.name.toLowerCase().replace(/\W+/g, '-').replace(/^-+|-+$/g, ''))
              .text(item.name)
          ),
          details
        )
      ).appendTo(resultdiv)
    }
  }
})
