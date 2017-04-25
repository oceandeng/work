(function(G, $){
    /**
     * 左侧菜单
     */
     var leftToolBarDefault = {
         topEle: '.protal-body',
         fEle: '.footer',
         tit: '.l-first-tit',
         con: '.l-sec-content',
         toogle: true
     }

     $.fn.leftToolBar = function(options){
        var options = $.extend({}, leftToolBarDefault, options)

        function LeftToolBar(ele) {
            this.$ele = $(ele)
            this.$parent = this.$ele.parent()
            this.$topele = this.$ele.parents(options.topEle)
            this.$footer = $(options.fEle)
            this.$tit = $(options.tit)
            this.$con = $(options.con)
        }
        LeftToolBar.prototype.init = function(){
            this.fixedFn()
            this.initStyle()
            options.toogle && this.eventsFn()
        }
        LeftToolBar.prototype.initStyle = function(){
            this.$tit.each(function(k, v){
                $(v).hasClass('active') && $(v).next().show()
            })

            this.$parent.height(this.$topele.outerHeight())
        }
        LeftToolBar.prototype.fixedFn = function(){
            var _this = this,
                mTop = this.$topele.position().top,
                fTop = this.$footer.position().top,
                fH = this.$footer.outerHeight();

            $(G).on('scroll', function(e){
                var sTop = $(G).scrollTop(),
                    eleH = _this.$ele.outerHeight(),
                    toF = fTop - sTop - eleH;

                if(sTop > mTop && toF > 0){
                    _this.$ele.removeAttr('style')
                    _this.$ele.css({
                        'position': 'fixed',
                        'top': 0
                    })
                }else if(toF <= 0){
                    _this.$ele.removeAttr('style')
                    _this.$ele.css({
                        'position': 'absolute',
                        'bottom': 0
                    })
                }else{
                    _this.$ele.css({'position': 'absolute'})
                }
            })
        }
        LeftToolBar.prototype.eventsFn = function(){
            this.$tit.on('mouseenter', function(){
                var $_this = $(this)

                // $_this.addClass('active').parent().siblings().find(options.tit).removeClass('active')
                $_this.next().show()
                $_this.parent().siblings().find(options.con).hide()
            })

            this.$con.on('mouseenter', function(){
                var $_this = $(this)

                $_this.show().parent().siblings().find(options.con).hide()
            })
        }

        return this.each(function(){
            var instance = new LeftToolBar(this)
            instance.init()
        })
     }

     /**
      * public tab
      */
     var tabDefault = {
         tit: '.tab-tit',
         con: '.tab-con',
         item: '.tab-con-item'
     }
     $.fn.publicTab = function(options){
         var options = $.extend({}, tabDefault, options)

         var PublicTab = function($ele){
             this.$tit = $ele.find(options.tit).find('ul').find('li')
             this.$item = $ele.find(options.con).find(options.item)
         }
         PublicTab.prototype.init = function(){
             this.eventFn()
         }
         PublicTab.prototype.eventFn = function(){
             var _this = this

             this.$tit.on('mouseenter', function(){
                 var $_this = $(this),
                     index = $_this.index();

                 $_this.find('a').addClass('active').parent().siblings().find('a').removeClass('active')

                 _this.$item.eq(index).addClass('block').siblings().removeClass('block')
             })
         }

         return this.each(function(){
             var $this = $(this)
             var instance = new PublicTab($this)
             instance.init()
         })
     }

})(window, jQuery)

$(function(){
    // 左侧菜单效果调用
    $('#leftToolBar').leftToolBar()

    //industry slide
    $('#industrySlider').industrySlider();

    // tab
    $('#qyxTab').publicTab()

})
