theme.SortingCollections = (function() {

    function SortingCollections(container) {
        this.$container = $(container);

        //var sectionId = this.$container.attr('data-section-id');

        //this.settings = {};

        this.namespace = '.sorting-collections';

        this.onLoad();
    };

    SortingCollections.prototype = $.extend({}, Section.prototype, SortingCollections.prototype, {
        onLoad: function() {
            var $control = this.$container.find('[data-sorting-collections-control]'),
                $products = this.$container.find('[data-sorting-collections-items]'),
                xhr = null;

            this.$control = $control;

            $control.on('click', 'a', function (e) {
                var $this = $(this);

                if(!$this.hasClass('active')) {
                    if(xhr) {
                        xhr.abort();
                    }

                    theme.Loader.set($products);

                    var collection = $this.attr('data-collection');

                    xhr = $.ajax({
                        type: 'GET',
                        url: '/collections/' + collection,
                        cache: false,
                        data: {
                            view: 'sorting',
                            constraint: 'limit=' + $products.attr('data-limit') + '+grid=' + encodeURIComponent($products.attr('data-grid'))
                        },
                        dataType: 'html',
                        success: function (data) {
                            $products.html(data);

                            theme.ImagesLazyLoad.update();
                            theme.ProductReview.update();

                            $control.find('a').removeClass('active');
                            $this.addClass('active');

                            theme.Loader.unset($products);

                            xhr = null;
                        }
                    });
                }

                e.preventDefault();
                return false;
            });

            if(theme.is_loaded) {
                theme.ImagesLazyLoad.update();
                theme.ProductReview.update();
            }
        },
        onUnload: function() {
            this.$container.off(this.namespace);

            this.$control.off();
        }
    });

    return SortingCollections;
})();

$(function() {
    theme.sections.register('sorting-collections', theme.SortingCollections);
});