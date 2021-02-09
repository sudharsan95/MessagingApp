
    loadData();
    var newToken = "";
    function loadData(nextToken){
        $.ajax({
            url: 'http://message-list.appspot.com/messages?pageToken='+nextToken,
            type: "GET",
            dataType: "json",
            success: function (data) {
                    newToken = data.pageToken;
                    $.each(data.messages, function(index, element) {
                        var _template = $(`
                        <div class="card border-0 shadow-sm mb-3 msgBox" id="message`+ element.id +`" data-swipe-threshold="20"
                        data-swipe-timeout="500"
                        data-swipe-ignore="false">
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="align-items-center mr-3 deleteMsg d-none message`+ element.id +`" onclick="deleteMessage('message`+ element.id +`')">
                                    <span><i class="material-icons" style="font-size:36px">delete</i></span>
                                </div>
                                <div>
                                    <div class="media mb-2">
                                        <img class="mr-3 userImg" src="assets/`+ element.author.photoUrl +`" alt="william-shakespeare.jpg">
                                        <div class="media-body">
                                        <h5 class="mt-0 mb-0">`+ element.author.name +`</h5>
                                        <p class="mb-0 text-secondary">` + element.updated + `</p>
                                        </div>
                                    </div>
                                    <p class="card-text">`+ element.content +`</p>
                                </div>
                            </div>
                                    

                        </div>
                        </div>
                        `)
                        $("#message_body").append(_template);
                    });
                    $( ".msgBox" ).on( "swiperight", swiperightHandler );
    
                    // Callback function references the event target and adds the 'swiperight' class to it
                    function swiperightHandler( event ){
                        var _getCardId = $(this).attr( "id" );
                        $("."+_getCardId).removeClass("d-none").addClass("d-flex");
                    }
                    }
        });
    }

    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            loadData(newToken)
    }
    });


    function deleteMessage(msgId){
        $("#"+msgId).remove();
    }






  




