theme.Collections = function() {

    function Collections() {
        this.dom = {
            $collections: $('.js-collections')
        };

        if(this.dom.$collections.length) {
            this.load(); 
        }
    };

    Collections.prototype = $.extend({}, Collections.prototype, {
        current: {
            url: null,
            ajax: null
        },
        url: {
            collection: null,
            params: null
        },
        controls: {
            collection: null,
            params: null
        },
        content: {
            collection: null
        },
        _parseUrl: function() {
            var _ = this;

            this.current.url = decodeURIComponent(window.location.href);
            this.current.ajax = this.current.url;

            if(this.current.ajax.indexOf('view=') != -1) {
                $.each([6, 12, 18, 24, 48], function() {
                    _.current.ajax.replace('view=' + this, 'view=' + this + '-ajax');
                });
            } else {
                this.current.ajax += this.current.ajax.indexOf('?') != -1 ? '&' : '?';
                this.current.ajax += 'view=ajax';
            }

            var search = this.current.url.split('collections/')[1].split('/');

            this.url.collection = search[0].split('?')[0];
            this.url.params = null;

            var is_custom_filter = this.current.url.indexOf('custom-filter') != -1 ? true : false;

            function parseParams(values) {
                $.each(values, function() {
                    if(this === 'custom-filter') {
                        return;
                    }

                    if(!_.url.params) {
                        _.url.params = {};
                    }

                    var param = this.split('='),
                        prop = param[0],
                        val = param[1];

                    if(prop === 'tag') {
                        prop = 'constraint';
                    }

                    if(!_.url.params[prop]) {
                        _.url.params[prop] = [];
                    }

                    _.url.params[prop].push(val);
                });
            };

            this.current.url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, k, v) {
                var values = v.split('+');

                if(is_custom_filter && k === 'constraint') {
                    parseParams(values);
                } else {
                    if(!_.url.params) {
                        _.url.params = {};
                    }

                    _.url.params[k] = values;
                }
            });

            if(search[1] && search[1].split('?')[0].length) {
                var values = search[1].split('?')[0].split('+');

                if(!_.url.params) {
                    _.url.params = {};
                }

                if(!_.url.params.constraint) {
                    _.url.params.constraint = [];
                }

                $.each(values, function () {
                    _.url.params.constraint.push(this);
                });
            }
        },
        _buildUrl: function(unset_url_params) {
            var _ = this,
                params = {},
                params_ajax = {},
                collection = this.controls.collection ? this.controls.collection : this.url.collection;

            this.current.url = '/collections/' + collection;

            if(this.controls.params) {
                if(this.controls.params.vendor || this.controls.params.type || this.controls.params.title || this.controls.params.price || this.controls.params.only_available || window.page.default.only_available || window.page.default.logic_or) {
                    params.constraint = 'custom-filter';
                    params_ajax.constraint = 'custom-filter';
                    
                    $.each(['constraint', 'vendor', 'type', 'title', 'price', 'page', 'only_available'], function (i, v) {

                        if(_.controls.params[this]) {
                            var name = v === 'constraint' ? 'tag' : v,
                                is_unset = false;

                            $.each(unset_url_params, function (j, val) {
                                if(name === val) {
                                    is_unset = val;
                                }
                            });

                            name = '+' + name + '=';

                            var value = name + _.controls.params[v].join(v === 'price' ? '-' : name);

                            if(!is_unset) params.constraint += value.replace(/ /gi, '-');
                            params_ajax.constraint += value.replace(/ /gi, '-');
                        }
                    });

                    if(!this.controls.params.only_available && window.page.default.only_available) {
                        params_ajax.constraint += '+only_available=true';
                    }

                    $.each(['sort_by', 'view'], function () {
                        if(_.controls.params[this]) {
                            var value =  _.controls.params[this][0];

                            params[this] = value;
                            params_ajax[this] = value;
                        }
                    });
                } else {
                    $.each(this.controls.params, function(k, v) {
                        var value = v.join('+');

                        params[k] = value;
                        params_ajax[k] = value;
                    });

                    $.each(unset_url_params, function () {
                        delete params[this];
                    });
                }
            }

            params_ajax.view = params_ajax.view ? params_ajax.view + '-ajax' : 'ajax';

            params = $.param(params);
            params_ajax = $.param(params_ajax);

            this.current.ajax = this.current.url;

            if(params) this.current.url += '?' + decodeURIComponent(params);
            if(params_ajax) this.current.ajax += '?' + decodeURIComponent(params_ajax);
        },
        _setUrl: function() {
            history.pushState({foo: 'filters'}, this.current.url, this.current.url);
        },
        _parseControls: function() {
            var _ = this,
                params = {};

            this.controls.collection = null;
            this.controls.params = null;

            $.each(['collection'], function() {
                var value = $('[name="' + this + '"]:checked').val();

                if(value) _.controls[this] = value;
            });

            if(!this.controls.collection) this.controls.collection = this.url.collection;

            $.each({
                'sort_by': 'sort_by',
                'view': 'view_length',
                'only_available': 'only_available'
            }, function(k, v) {
                var value = $('[name="' + v + '"]').val(),
                    default_value = window.page.default[v] + '';

                if(value && value !== default_value) params[k] = [value];
            });

            $.each({
                'constraint': [ 'collection_with_tag', 'filter_by_tag', 'filter_by_color' ],
                'vendor': 'filter_by_vendor',
                'type': 'filter_by_type'
            }, function(k, v) {
                var arr = [];

                $.each($.isArray(v) ? v : [ v ], function() {
                    $('[name="' + this + '"]:checked').each(function() {
                        var value = $(this).val();

                        for(var i = 0; i < arr.length; i++) {
                            if(arr[i] === value) return;
                        }

                        arr.push(value);
                    });
                });

                if(arr.length) {
                    params[k] = arr;
                }
            });

            $(['filter_by_title']).each(function() {
                var value = $('[name="' + this + '"]').val();

                if(value) params.title = [value];
            });

            $(['filter_by_price']).each(function() {
                var $this = $('[name="' + this + '"]'),
                    value = $this.val();

                if(value) {
                    var values = value ? value.split(';') : null,
                        from = values ? +values[0] : +$this.attr('data-from'),
                        to = values ? +values[1] : +$this.attr('data-to');

                    if(from !== +$this.attr('data-min') || to !== +$this.attr('data-max')) {
                        params['price'] = [from * 100, to * 100];
                    }
                }
            });

            $(['filter_by_title']).each(function() {
                var value = $('[name="' + this + '"]').val();

                if(value) params.title = [value];
            });

            $(['page']).each(function () {
                var value = $('[name="' + this + '"]').val();

                if(value && +value !== 1) params[this] = [value];
            });
            
            if(Object.keys(params).length) {
                this.controls.params = params;
            }
        },
        _setControls: function() {
            var _ = this;

            $.each({
                'sort_by': 'sort_by',
                'view': 'view_length'
            }, function(k, v) {
                var value = _.url.params && _.url.params[k] ? _.url.params[k] : window.page.default[v];

                $('[name="' + v + '"]').val(value).trigger('update');
            });

            $('[name="collection"]').removeAttr('checked');
            $('[name="collection"][value="' + this.url.collection + '"]').prop('checked', 'checked');

            $('[name="collection_with_tag"], [name="filter_by_tag"], [name="filter_by_color"], [name="filter_by_vendor"], [name="filter_by_type"], [name="only_available"]').removeAttr('checked');
            $.each({
                'constraint': [ 'collection_with_tag', 'filter_by_tag', 'filter_by_color' ],
                'vendor': 'filter_by_vendor',
                'type': 'filter_by_type',
                'only_available': 'only_available'
            }, function(k, v) {
                if(_.url.params && _.url.params[k]) {
                    $.each(_.url.params[k], function() {
                        var value = this;

                        $.each($.isArray(v) ? v : [ v ], function() {
                            var for_collection = this === 'collection_with_tag' ? '[data-section-for-collection="' + _.url.collection + '"] ' : '';

                            $(for_collection + '[name="' + this + '"][value="' + value + '"]').prop('checked', 'checked');
                        });
                    });
                }
            });

            $('[name="filter_by_title"]').val(this.url.params && this.url.params['title'] ? this.url.params['title'] : '');

            if(this.url.params && this.url.params['price']) {
                var price = this.url.params['price'][0].split('-');

                if(theme.RangeOfPrice) {
                    theme.RangeOfPrice.update(price[0] / 100, price[1] / 100);
                }
            } else {
                if(theme.RangeOfPrice) {
                    theme.RangeOfPrice.reset();
                }
            }
        },
        _checkCurrentFilters: function (params) {
            if(params) {
                delete params.page;
                delete params.sort_by;
                delete params.view;
            }

            this.$current_filter[params && Object.keys(params).length ? 'removeClass' : 'addClass']('d-none');
        },
        loadContent: function(current_obj, event_type, callback) {
            var _ = this;

            if(this.xhr) this.xhr.abort();

            theme.Loader.set($('[data-js-collection-replace="products"]').parent(), {
                fixed: true,
                spinner: theme.current.is_mobile ? false : null
            });
            
            this.xhr = $.ajax({
                type: 'GET',
                url: this.current.ajax,
                cache: false,
                dataType: 'html',
                success: function (data) {
                    var $page = $(data);

                    if(theme.ProductsView) {
                        theme.ProductsView.update($page.find('[data-js-products]'));
                    }

                    $('[data-js-collection-replace]').each(function () {
                        var $this = $(this),
                            full_replace = $this[0].hasAttribute('data-js-collection-replace-only-full');

                        if(_.content.collection === current_obj.collection && full_replace) {
                            return;
                        }

                        var name = $this.attr('data-js-collection-replace'),
                            $element = $('[data-js-collection-replace="' + name + '"]'),
                            $page_element = $page.find('[data-js-collection-replace="' + name + '"]'),
                            $section;

                        if(event_type === 'page' && $element.attr('data-js-collection-replace-method') === 'add') {
                            $element.append($page_element.children());

                            if(name === 'products') {
                                theme.Loader.unset($element.parent());
                            }
                        } else {
                            $element.replaceWith($page_element);

                            if($page_element[0].hasAttribute('data-js-collection-manual-visible')) {
                                $page_element.parents('[data-js-collection-manual-visible-section]')[$page_element.attr('data-js-collection-manual-visible') === 'true' ? 'removeClass' : 'addClass']('d-none-important');
                            }

                            if($page_element[0].hasAttribute('data-js-collection-replace-hide-empty')) {
                                $section = $page_element.parents('[data-js-collection-nav-section]');

                                $section[$page_element.find('input').length ? 'removeClass' : 'addClass']('d-none');
                            }

                            if(name === 'fullwidth-head' || name === 'head') {
                                $page_element.parents('[data-section-type]').trigger('section:reload');
                            }

                            if(name === 'products') {
                                theme.Loader.unset($page_element.parent());
                            }

                            $element.remove();
                        }

                        _.$pagination = _.dom.$collections.find('[data-js-collection-pagination]');

                        if(theme.current.is_mobile) {
                            theme.Loader.unset(_.$sidebar);
                        }
                    });

                    theme.ImagesLazyLoad.update();

                    if(_.content.collection !== current_obj.collection) {
                        $.each({
                            'sort_by': 'sort_by',
                            'view': 'view_length'
                        }, function(k, v) {
                            var value = current_obj.params && current_obj.params[k] ? current_obj.params[k] : window.page.default[v];

                            $('[name="' + v + '"]').val(value).trigger('update');
                        });
                    }

                    theme.ProductCurrency.update();
                    theme.StoreLists.checkProductStatus();
                    theme.ProductReview.update();
                    if(theme.Tooltip) {
                        theme.Tooltip.init();
                    }

                    $page.remove();

                    _.xhr = null;

                    _.content.collection = current_obj.collection;

                    if(callback) {
                        callback();
                    }
                }
            });
        },
        removeFilter: function(type, value) {
            switch(type) {
                case 'tag': {
                    $('[name="collection_with_tag"], [name="filter_by_tag"], [name="filter_by_color"]').filter('[value="' + value + '"]').removeAttr('checked').prop('checked', false);
                    break;
                }
                case 'title': {
                    $('[name="filter_by_title"]').val('');
                    break;
                }
                case 'price': {
                    if(theme.RangeOfPrice) {
                        theme.RangeOfPrice.reset();
                    }
                    break;
                }
                case 'vendor': {
                    $('[name="filter_by_vendor"]').filter('[value="' + value + '"]').removeAttr('checked').prop('checked', false);
                    break;
                }
                case 'type': {
                    $('[name="filter_by_type"]').filter('[value="' + value + '"]').removeAttr('checked').prop('checked', false);
                    break;
                }
            }
        },
        onChangeControls: function(event_type, unset_url_params) {
            var _ = this;

            if(theme.current.is_mobile) {
                theme.Loader.set(this.$sidebar, {
                    fixed: true
                });
            }
            
            if(event_type !== 'page') {
                $('[name="page"]').val(1);
            }

            this._parseControls();
            this._buildUrl(unset_url_params);
            this._setUrl();
            this.loadContent(this.controls, event_type, function () {
                _._checkCurrentFilters(_.controls.params);
            });
        },
        onChangeHistory: function() {
            var _ = this;

            if(theme.current.is_mobile) {
                theme.Loader.set(this.$sidebar, {
                    fixed: true
                });
            }
            
            this._parseUrl();
            this._setControls();
            this.loadContent(this.url, null, function () {
                _._checkCurrentFilters(_.url.params);
            });
        },
        load: function() {
            var _ = this,
                $sidebar = $('[data-js-collection-sidebar]');

            this.$collections_body = $('[data-js-collections-body]');
            this.$sidebar = $sidebar;
            this.$current_filter = $sidebar.find('[data-js-collection-nav-section="current_filters"]');
            this.$pagination = this.dom.$collections.find('[data-js-collection-pagination]');
            
            this._parseUrl();
            this.content.collection = _.url.collection;

            $sidebar.on('change', '[data-js-collections-menu] input', function () {
                var $this = $(this),
                    name = $this.attr('name');

                if(name === 'collection') {
                    $('[data-js-collections-menu] [name="collection_with_tag"]:checked').removeAttr('checked');
                    $('[name="filter_by_tag"], [name="filter_by_color"], [name="filter_by_vendor"], [name="filter_by_type"]').removeAttr('checked');
                    $('[name="filter_by_title"]').val('');
                    $('[name="sort_by"]').val(page.default.sort_by);
                    $('[name="view"]').val(page.default.view_length);

                    $.each({
                        'sort_by': 'sort_by',
                        'view': 'view_length'
                    }, function(k, v) {
                        $('[name="' + v + '"]').val(window.page.default[v]).trigger('update');
                    });

                    if(theme.RangeOfPrice) {
                        theme.RangeOfPrice.reset();
                    }
                } else if(name === 'collection_with_tag') {
                    var $current_collection = $this.parents('.collections-menu__item').find('[name="collection"]'),
                        $remove_collections = $('[data-js-collections-menu] [name="collection"]:checked').not($current_collection);

                    $remove_collections.add($remove_collections.parents('.collections-menu__item').find('[name="collection_with_tag"]:checked')).removeAttr('checked');

                    if(!$current_collection.is(':checked')) {
                        if(theme.RangeOfPrice) {
                            theme.RangeOfPrice.reset();
                        }
                    }

                    $current_collection.prop('checked', 'checked');
                }

                _.onChangeControls();
            });

            $sidebar.on('click', '[data-js-collections-menu] [name="collection"]:checked',function() {
                var $this = $(this),
                    $collection_with_tag = $this.parents('.collections-menu__item').find('[name="collection_with_tag"]:checked');

                if($collection_with_tag.length) {
                    $collection_with_tag.removeAttr('checked');

                    $this.change();
                }
            });

            $sidebar.on('change', '[data-js-collection-filters] input', function () {
                _.onChangeControls();
            });

            $sidebar.on('change', '[name="only_available"]', function () {
                var $this = $(this),
                    value = $this.is(':checked') ? true : false;

                $this.attr('value', value);

                _.onChangeControls();
            });

            $sidebar.on('click', '[data-js-collection-filter-by-title] button', function () {
                _.onChangeControls();
            });

            $sidebar.on('keyup', '[data-js-collection-filter-by-title] input', $.debounce(500, function () {
                _.onChangeControls();
            }));

            this.dom.$collections.on('change', '[data-js-collection-sort-by] select, [data-js-collection-view-length] select', function () {
                _.onChangeControls();
            });

            this.dom.$collections.on('click', '[data-js-collection-pagination] a', function (e) {
                var $this = $(this),
                    $pagination = $this.parents('[data-js-collection-pagination]'),
                    value = $this.attr('data-value') || $this.attr('href').split('page=')[1].split('&')[0],
                    type = $pagination.attr('data-pagination-type'),
                    event_type = 'page',
                    unset_url_params,
                    header_h;

                $('[name="page"]').val(value);

                if(type === 'button_load_more' || type === 'infinite_scroll') {
                    unset_url_params = ['page'];
                }

                _.onChangeControls(event_type, unset_url_params);

                if(type !== 'button_load_more' && type !== 'infinite_scroll') {
                    header_h = theme.StickyHeader && theme.StickyHeader.$sticky ? theme.StickyHeader.$sticky.stickyHeader('getStickyHeight') : 0;

                    $('html, body').velocity('stop').velocity('scroll', {
                        offset: _.$collections_body.offset().top - header_h,
                        duration: theme.animations.pagination.scroll_duration * 1000
                    });
                }

                e.preventDefault();
                return false;
            });

            if(this.$pagination.attr('data-pagination-type') === 'infinite_scroll') {
                setTimeout(function () {
                    $window.on('scroll', function () {
                        var pag_pos = _.$pagination[0].getBoundingClientRect();

                        if(pag_pos.top < theme.current.height && !_.$pagination[0].hasAttribute('data-js-loading')) {
                            _.$pagination.attr('data-js-loading', true);

                            _.$pagination.find('a').trigger('click');
                        }
                    });
                }, 500);
            }

            $sidebar.on('click', '[data-js-collection-current-tags] [data-value]', function () {
                var $this = $(this),
                    value = $this.attr('data-value'),
                    type = $this.attr('data-filter-type');

                _.removeFilter(type, value);

                _.onChangeControls();
            });

            $sidebar.on('click', '[data-js-collection-current-tags-clear]', function () {
                $('[data-js-collection-current-tags] [data-value]').each(function() {
                    var $this = $(this),
                        value = $this.attr('data-value'),
                        type = $this.attr('data-filter-type');

                    _.removeFilter(type, value);
                });

                _.onChangeControls();
            });
            
            $(window).on('popstate', function() {
                _.onChangeHistory();
            });
        },
        logs: function() {
            console.log('current', this.current);
            console.log('url', this.url);
            console.log('controls', this.controls);
            console.log('content', this.content);
            console.log(this.logId ? ++this.logId : this.logId = 1);
        }
    });

    theme.Collections = new Collections;
};

$(function() {
    theme.Collections();
});