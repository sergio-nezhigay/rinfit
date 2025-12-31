theme.SearchAjax = function() {

    function SearchAjax() {
        this.selectors = {
            search: '.js-search-ajax'
        };

        this.load();
    };

    SearchAjax.prototype = $.extend({}, SearchAjax.prototype, {
        load: function() {
            var _ = this,
                q = '',
                ajax;

            function resultToHTML($search, $results, data) {
                if(data.count > 0) {
                    var $template = $($('#template-search-ajax')[0].content),
                        $fragment = $(document.createDocumentFragment()),
                        limit = +$search.attr('data-js-max-products') - 1;

                    $.each(data.results, function(i) {
                        var $item = $template.clone(),
                            $image = $item.find('.product-search-2__image img'),
                            $title = $item.find('.product-search-2__title a'),
                            $price = $item.find('.product-search-2__price .price'),
                            $links = $item.find('a');

                        $links.attr('href', this.url);
                        $title.html(this.title);
                        $image.attr('srcset', this.thumbnail + ' 1x, ' + this.thumbnail2x + ' 2x');

                        if(this.price) {
                            theme.ProductCurrency.setPrice($price, this.price, this.compare_at_price);
                        } else {
                            $price.remove();
                        }

                        $fragment.append($item);

                        return i < limit;
                    });

                    $results.html('');
                    $results.append($fragment);

                    theme.ImagesLazyLoad.update();
                    theme.ProductCurrency.update();
                } else {
                    $results.html('');
                }

                $results[data.count > 0 ? 'removeClass' : 'addClass']('d-none-important');
            };

            function processResult($search, $content, q, data) {
                var $results = $search.find('.search-ajax__result'),
                    $view_all = $search.find('.search-ajax__view-all'),
                    $button_view_all = $view_all.find('a'),
                    $empty_result = $search.find('.search-ajax__empty');

                $button_view_all.attr('href', '/search?q=' + q);
                $view_all[data.count > 0 ? 'removeClass' : 'addClass']('d-none-important');
                $empty_result[q === '' || data.count > 0 ? 'addClass' : 'removeClass']('d-none-important');

                $results.addClass('invisible');

                resultToHTML($search, $results, data);

                $results.removeClass('invisible');

                theme.Loader.unset($content);
                $search.find('button[type="submit"]').removeClass('disabled');

                $search.addClass('open');

                $body.unbind('click.search-ajax');
                $window.unbind('scroll.search-ajax');

                $body.on('click.search-ajax', function (e) {
                    if(!$(e.target).parents('.js-search-ajax').length) {
                        clear();
                        $body.unbind('click.search-ajax');
                    }
                });

                $window.on('scroll.search-ajax', function () {
                    clear();
                    $window.unbind('scroll.search-ajax');
                });
            };

            function clear($target) {
                var $search = $target || $(_.selectors.search),
                    $content = $search.find('.search-ajax__content');

                q = '';

                $search.find('input').val('');
                processResult($search, $content, q, { count: 0 });

                $search.removeClass('open');
            };

            $body.on('keyup', this.selectors.search + ' input', $.debounce(500, function (e) {
                var $search = $(this).parents(_.selectors.search);

                if(e.keyCode !== 27) {
                    var $this = $(this),
                        value = $this.val(),
                        $content = $search.find('.search-ajax__content');

                    if(value !== q) {
                        q = value;

                        if(q === '') {
                            processResult($search, $content, q, { count: 0 });
                        } else {
                            if (ajax) {
                                ajax.abort();
                            }

                            theme.Loader.set($content);
                            $search.find('button[type="submit"]').addClass('disabled');

                            ajax = $.getJSON({
                                url: '/search',
                                type: 'POST',
                                data: { q: q, view: 'json-2'},
                                success: function (data) {
                                    processResult($search, $content, q, data);
                                }
                            });
                        }
                    }
                }
            }));

            $body.on('keyup', this.selectors.search + ' input', function(e) {
                if(e.keyCode === 27) {
                    var $search = $(this).parents(_.selectors.search),
                        $content = $search.find('.search-ajax__content');

                    q = '';

                    processResult($search, $content, q, { count: 0 });
                }
            });

            $body.on('clear', this.selectors.search, function () {
                clear($(this));
            });
        },
        closeAll: function () {
            $(this.selectors.search + '.open').trigger('clear');
        }
    });

    theme.SearchAjax = new SearchAjax;
};

$(function() {
    theme.SearchAjax();
});