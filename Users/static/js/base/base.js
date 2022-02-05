$(document).ready(function () {
    var Full = {
        Init: function (config) {
            this.config = config;
            this.BindEvents();
        },
        BindEvents: function () {
            var $this = this.config;

            $this.btn_submit.on('click', { param: 1 }, this.Submit)

        },
        Submit: (e, data) => {
            var $route = (typeof e == 'object') ? e.data.param : e,
                $self = Full.config;

            $data = $self.form1.serializeArray();
            $data.push(
                { name: 'Flag', value: 1 }
            )

            $firstname = $self.in_fname.val()
            $lastname = $self.in_lname.val()
            $middlename = $self.in_mname.val()
            $age = $self.in_age.val()
            $gender = $('input[name=gender]:checked').val()

            Full.CallAjax('/full/transact/', $data, 1, 'GET')
            console.log($data)
        },
        CallAjax: function (url, data, route, method_type) {
            var $self = Full.config, timer,
                $base_host = $.trim($self.content_wrapper.attr('data-host')),
                $url = $base_host + url;

            $.ajax({
                type: method_type,
                url: $url,
                data: data,
                dataType: 'json',
                beforeSend: function () {
                    timer && clearTimeout(timer);
                    timer = setTimeout(function () {
                        console.log('BeforeSend')
                    },

                        1000);

                    switch (route) {
                        case 1: console.log('b4send: case1')
                    }
                },
                complete: function () {
                    clearTimeout(timer);
                    console.log('Complete');

                    switch (route) {
                        case 1: console.log('complete: case1')
                    }
                },
                success: function (evt) {
                    if (evt) {
                        switch (route) {
                            case 1: console.log(evt); break;
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error: ' + textStatus + ': ' + errorThrown);
                }
            })
        }
    }
    Full.Init({
        btn_submit: $('#btn-submit'),
        in_fname: $('#in-fname'),
        in_mname: $('#in-mname'),
        in_lname: $('#in-lname'),
        in_age: $('#in-age'),
        form1: $('#form1'),
        content_wrapper: $('#content-wrapper')
    })
})