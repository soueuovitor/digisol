
function openNav() {
    document.getElementById("mySidenav").style.width = "70%";
    // document.getElementById("flipkart-navbar").style.width = "50%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
}

$(function () {

    var $formRegisterVol = $('#register-vol');
    var $formRegisterPago = $('#registar-pago');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch (this.id) {

            case "new-todo":
                

                window.alert("shit")
                    $.ajax({
                        url: '/activities/newToDo',
                        method: "POST",
                        dataType: 'json',
                        data: $("#new-todo").serialize(),
                     
                        success: function (result) {
                            if (result.status == 450) {

                                msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Já existe um workshop com esse título!");



                            } else if (result.status == 400) {
                                msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Já existe uma sessão a decorrer nessa sala no horário escolhido!");




                            } else {

                                window.location = '/sessoes';



                            }
                        }
                    });
                


                return false;
                break;


            case "alter-pago":
                var $pago_username = $('#register_username').val();
                var $pago_email = $('#register_email').val();
                if ($pago_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");

                } else {



                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/alterColab/pago',
                        data: $('#alter-pago').serialize(),
                        success: function (valido) {

                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                window.location = '/colab';




                            } else if (valido.status == 400) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username não disponível");


                            } else {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                            }

                        }


                    });
                }




                return false;
                break;
            default:
                return false;
        }
        return false;
    });





})	



