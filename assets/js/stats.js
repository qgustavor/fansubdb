;(function renderStats () {
  if (!window.$) return document.addEventListener('DOMContentLoaded', renderStats)
  var container = $('#stat-container')

  // Remove "loading" message
  container.empty()

  // Store key order
  var seasonIndexer = function (seasonKey) {
    var year = parseInt(seasonKey)
    var season = seasonKey.split('-')[1]
    var seasonIndex = ['primavera', 'verao', 'outono', 'inverno'].indexOf(season)
    return year * 4 + seasonIndex
  }
  var seasonSorter = function (a, b) {
    return seasonIndexer(a) - seasonIndexer(b)
  }
  var seasonOrder = []
  $.each(window.store, function (key) { seasonOrder.push(key) })
  seasonOrder.sort(seasonSorter)
  var seasonNames = seasonOrder.map(function (seasonKey) {
    var year = parseInt(seasonKey)
    var season = seasonKey.split('-')[1]
    var seasonIndex = ['primavera', 'verao', 'outono', 'inverno'].indexOf(season)
    var seasonName = ['Primavera', 'Verão', 'Outono', 'Inverno'][seasonIndex]
    return year + '/' + seasonName
  })

  var chart1El = $('<div>').appendTo(container)
  var chart1 = new window.frappe.Chart(chart1El[0], {
    title: 'Quantidade de animes e grupos por temporada',
    type: 'line',
    colors: ['#D50000', '#2962FF'],
    height: 500,
    lineOptions: {
      regionFill: 1
    },
    data: {
      labels: seasonNames,
      datasets: [{
        name: 'Animes',
        values: seasonOrder.map(function (seasonKey) {
          return window.store[seasonKey].length
        })
      }, {
        name: 'Fansubs',
        values: seasonOrder.map(function (seasonKey) {
          return window.store[seasonKey].reduce(function (sum, entry) {
            if (!entry.groups) return sum
            for (let group in entry.groups) {
              if (entry.groups[group] !== 'stream') {
                group.split('-').forEach(function (name) {
                  if (sum.indexOf(name) === -1) {
                    sum.push(name)
                  }
                })
              }
            }
            return sum
          }, []).length
        })
      }]
    }
  })

  var chart2El = $('<div>').appendTo(container)
  var distributionDataset = [{
    name: 'Não traduzidos',
    values: seasonOrder.map(function (seasonKey) {
      return window.store[seasonKey].filter(function (entry) {
        if (!entry.groups) return true
        for (var group in entry.groups) {
          if (entry.groups[group] === 'stream' || entry.groups[group] === 'active') {
            return false
          }
        }
        return true
      }).length * 100 / window.store[seasonKey].length
    })
  }, {
    name: 'Só em fansubs',
    values: seasonOrder.map(function (seasonKey) {
      return window.store[seasonKey].filter(function (entry) {
        if (!entry.groups) return false
        var found = false
        for (var group in entry.groups) {
          if (entry.groups[group] === 'stream') return false
          if (entry.groups[group] === 'active') found = true
        }
        return found
      }).length * 100 / window.store[seasonKey].length
    })
  }, {
    name: 'Em ambos',
    values: seasonOrder.map(function (seasonKey) {
      return window.store[seasonKey].filter(function (entry) {
        if (!entry.groups) return false
        var foundFansub = false
        var foundStream = false
        for (var group in entry.groups) {
          if (entry.groups[group] === 'active') foundFansub = true
          if (entry.groups[group] === 'stream') foundStream = true
          if (foundFansub && foundStream) return true
        }
        return false
      }).length * 100 / window.store[seasonKey].length
    })
  }, {
    name: 'Só em streaming',
    values: seasonOrder.map(function (seasonKey) {
      return window.store[seasonKey].filter(function (entry) {
        if (!entry.groups) return false
        var found = false
        for (var group in entry.groups) {
          if (entry.groups[group] === 'active') return false
          if (entry.groups[group] === 'stream') found = true
        }
        return found
      }).length * 100 / window.store[seasonKey].length
    })
  }]
  var chart2 = new window.frappe.Chart(chart2El[0], {
    title: 'Distribuição de traduções entre fansubs e streamings',
    type: 'bar',
    colors: ['#CFD8DC', '#2196F3', '#8BC34A', '#FF9800'],
    height: 500,
    barOptions: {
      stacked: 1
    },
    tooltipOptions: {
      formatTooltipY: function (value) {
        return value.toFixed(1) + '%'
      }
    },
    data: {
      labels: seasonNames,
      datasets: distributionDataset
    }
  })

  var chart3El = $('<div>').appendTo(container)
  var chart3 = new window.frappe.Chart(chart3El[0], {
    title: 'Distribuição de traduções entre fansubs',
    type: 'line',
    colors: ['#f44336', '#1e88e5'],
    height: 500,
    lineOptions: {
      regionFill: 1
    },
    data: {
      labels: seasonNames,
      datasets: [{
        name: 'Parcerias',
        values: seasonOrder.map(function (seasonKey) {
          return window.store[seasonKey].reduce(function (sum, entry) {
            if (!entry.groups) return sum
            for (var group in entry.groups) {
              if (entry.groups[group] === 'stream') continue
              if (entry.groups[group] === 'rumor') continue
              if (group.indexOf('-') !== -1) sum++
            }
            return sum
          }, 0)
        })
      }, {
        name: 'Oversub máx.',
        values: seasonOrder.map(function (seasonKey) {
          return window.store[seasonKey].reduce(function (sum, entry) {
            if (!entry.groups) return sum
            var groupCount = 0
            for (var group in entry.groups) {
              if (entry.groups[group] === 'stream') continue
              if (entry.groups[group] === 'rumor') continue
              groupCount++
            }
            return Math.max(sum, groupCount)
          }, 0)
        })
      }, {
        name: 'Quant. de oversub',
        values: seasonOrder.map(function (seasonKey) {
          return window.store[seasonKey].reduce(function (sum, entry) {
            if (!entry.groups) return sum
            var groupCount = 0
            for (var group in entry.groups) {
              if (entry.groups[group] === 'stream') continue
              if (entry.groups[group] === 'rumor') continue
              groupCount++
            }
            return groupCount > 1 ? sum + 1 : sum
          }, 0)
        })
      }]
    }
  })

  container.append($('<p>')
    .text('"Oversub máx." é a quantidade máxima de fansubs traduzindo um único anime em uma temporada. ' +
    '"Quant. de oversub" é a quantidade de animes traduzidos por mais de uma fansub em uma temporada')
  )

  var streamingServices = []
  $.each(window.store, function (seasonKey, season) {
    season.forEach(function (entry) {
      if (!entry.groups) return
      for (var group in entry.groups) {
        if (entry.groups[group] !== 'stream') continue
        if (streamingServices.indexOf(group) === -1) {
          streamingServices.push(group)
        }
      }
    })
  }, [])
  var streamingColors = {
    // green from the old logo because blue from the new one mixes with HIDIVE
    'Amazon Prime Video': '#7DAE41',
    'Crunchyroll': '#F78C25',
    'HIDIVE': '#00ADEF',
    'Netflix': '#DC0405'
  }
  var chart3El = $('<div>').appendTo(container)
  var chart3 = new window.frappe.Chart(chart3El[0], {
    title: 'Quantidade de animes por serviço de streaming',
    type: 'line',
    colors: streamingServices.map(function (e) {
      return streamingColors[e] || '#888'
    }),
    height: 500,
    lineOptions: {
      regionFill: 1
    },
    data: {
      labels: seasonNames,
      datasets: streamingServices.map(function (group) {
        return {
          name: group,
          values: seasonOrder.map(function (seasonKey) {
            let sum = 0
            window.store[seasonKey].forEach(function (entry) {
              if (!entry.groups) return
              if (entry.groups[group]) sum++
            })
            return sum
          })
        }
      })
    }
  })

}())
