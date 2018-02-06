/* global $ */

// jQuery plugin settings and other scripts
$(function () {
  // Sticky footer
  var resizeTimer = null
  function bumpIt () {
    $('body').css('margin-bottom', $('.page__footer').outerHeight(true))
  }

  $(window).resize(function () {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(bumpIt, 250)
  })

  bumpIt()

  // FitVids init
  $('#main').fitVids()

  // Sticky sidebar
  var stickySideBar = function () {
    var show = $('.author__urls-wrapper button').length === 0
    ? $(window).width() > 1024 // width should match $large Sass variable
    : !$('.author__urls-wrapper button').is(':visible')

    $('.sidebar').toggleClass('sticky', show)
  }

  stickySideBar()

  $(window).resize(function () {
    stickySideBar()
  })

  // Follow menu drop down
  $('.author__urls-wrapper button').on('click', function () {
    $('.author__urls').toggleClass('is--visible')
    $('.author__urls-wrapper button').toggleClass('open')
  })

  // Search toggle
  $('.search__toggle').on('click', function () {
    $('.search-content').toggleClass('is--visible')
    $('.initial-content').toggleClass('is--hidden')

    // set focus on input
    setTimeout(function () {
      $('#search').focus()
    }, 400)
  })

  // init smooth scroll
  $('a').smoothScroll({ offset: -20 })

  // add lightbox class to all image links
  $(
    'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".JPG"], a[href$=".png"], a[href$=".gif"]'
  ).addClass('image-popup')

  // Magnific-Popup options
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          'mfp-figure',
          'mfp-figure mfp-with-anim'
        )
      }
    },
    closeOnContentClick: true,
    midClick: true
  })

  // Stupid Table
  $('.stupidtable')
  .stupidtable()
  .on('aftertablesort', function (event, data) {
    var th = $(this).find('th')
    var arrow = th.find('.arrow').remove()

    var dir = $.fn.stupidtable.dir
    var arrow = data.direction === dir.ASC ? '&uarr;' : '&darr;'
    th.eq(data.column).append('<span class="arrow">' + arrow +'</span>')
  })

  // Get last commit from GitHub API
  if (!window.localStorage || !window.fetch) return

  function renderGitHubData (data) {
    var lastCommit = data.filter(function (e) {
      // Commits relacionados a código podem ser marcados com o emoji wrench/renchi/レンチ/🔧
      return !e.commit.message.match(/(^|\b)(\uD83D\uDD27|interface|código|script|layout)(\b|$)/i)
    })[0]
    if (!lastCommit) return

    var container = $('#last-commit')
    if (container.length === 0) {
      container = $('<ul>')
      .attr('id', 'last-commit')
      .html('<li><strong>Última atualização:</strong></li><li class="commit-info"></li>')
      .insertBefore('.social-icons')
    }

    var commitAnchor = $('<a>')
    .attr('href', lastCommit.html_url)
    .text(lastCommit.commit.message.split('\n')[0].trim())

    container.find('.commit-info').empty().append(commitAnchor)
  }

  var lsPrefix = 'fansubdb_'
  var lastUpdate = Number(window.localStorage[lsPrefix + 'lastUpdate']) || 0
  var cachedData = window.localStorage[lsPrefix + 'cachedData']
  var minUpdate = Date.now() - 24 * 60 * 60 * 1000

  if (cachedData) renderGitHubData(JSON.parse(cachedData))
  if (lastUpdate > minUpdate) return

  window.fetch('https://api.github.com/repos/qgustavor/fansubdb/commits?per_page=2')
  .then(function (response) {
    return response.json()
  })
  .then(function (result) {
    window.localStorage[lsPrefix + 'lastUpdate'] = Date.now()
    window.localStorage[lsPrefix + 'cachedData'] = JSON.stringify(result)
    renderGitHubData(result)
  })
})
