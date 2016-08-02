import './common.less';
import './externals.js';

import OrderInit from 'cmp/order/i.order.js';
import GoodInit from 'cmp/product/i.product.js';
import Form from 'cmp/form/i.form.js';
import AuthInit from 'cmp/auth/i.auth';


// old stuff
import { Informer } from 'lib/informer';
import env from 'const/env'
let {connectorsUrl, modxsiteConnectorsUrl, connector} = env;
let informer = new Informer();

!(function(global, $) {

    global.addEventListener('DOMContentLoaded', function() {

        OrderInit(global, $);
        GoodInit(global, $);
        AuthInit(global, $);
        Form.bindEvents(global, $);

        $('[data-smodx-behav="recount"]').remove();

        /*
         Сбрасываем подсветку ошибок
         */
        var clearErrors = function() {
            $(this).parents('.form-group:first').removeClass('has-error');
        };
        $('form').find('input,select,textarea').on('focus', clearErrors).on('select', clearErrors).on('click', clearErrors).on('change', clearErrors);

        /*
         Ajax-формы с аттачем
         p.s.: формы с экшеном data-smx-form обрабатываются компонентом form.js
         */
        $('form[data-action] [type=submit]').on('click', function(el) {
            var $this = $(this);
            var form = $this.parents('form:first');
            var action = form.data('action');

            if (form.data('smxForm')) {
                return;
            }

            var counter = {};
            var goal = '';

            if (action != '') {

                if (!form.data('in_request')) {
                    form.data('in_request', true);

                    if (counter && goal) {
                        counter.reachGoal(goal + '-form-send');
                    }

                    var m_data = new FormData(form[0]);
                    $.ajax({
                        url: modxsiteConnectorsUrl + 'connector.php?action=' + action,
                        data: m_data,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        dataType: 'json',
                        success: function(response) {
                            // console.log(response);
                            try {
                                if (response.success != true) {

                                    $(response.data).each(function(index, value) {
                                        if (value != '') {
                                            informer.failure(value.msg);
                                        }

                                        form.find('[name="' + value.id + '"]').parents('.form-group:first').addClass('has-error');
                                    });

                                    informer.failure(response.message || 'Ошибка выполнения запроса');

                                    return;
                                }

                                if (counter && goal) {
                                    counter.reachGoal(goal + '-success');
                                }

                                // else
                                informer.success(response.message);
                                form[0].reset();
                                $this.parents('.modal:first').modal('hide');
                                switch(action){
                                    case 'order/recall':
                                        window.location.href='/order'
                                        break;
                                }
                            } catch (e) {
                                informer.failure('Ошибка выполнения запроса');
                            }
                        },
                        error: function() {
                            informer.failure('Ошибка выполнения запроса');
                        },
                        complete: function() {
                            form.data('in_request', false);
                        }
                    });

                }
            }

            return false;
        });

    });

})(window, $);
// end of old stuff
