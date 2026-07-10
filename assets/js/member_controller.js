function hyosungCheckPayResult (transactionId, type) {
    Swal.fire({
        title: "이 창을 끄지 마세요",
        icon: 'warning',
        showConfirmButton: false,

    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("transactionId", transactionId);
    urlencoded.append("type", type);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    }; 

    fetch("/check_pay_result_with_hyosung", requestOptions)
        .then((response) => {
            return response.json()
        }).then((res) => { 
            swal.close() 
            console.log(res);
            if (res.status) { 
                kAlert("처리가 성공적으로 진행된 거래건입니다.", "NOPE")
            } else { 
                kAlertWarning("실패 사유", res.msg)  
            }
            
        }).catch((error) => {
            return false
        })

}
function hyosungCheckUserStatus(uniqueId) {
    Swal.fire({
        title: "이 창을 끄지 마세요",
        icon: 'warning',
        showConfirmButton: false,

    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("uniqueId", uniqueId);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    }; 

    fetch("/check_user_status_with_hyosung", requestOptions)
        .then((response) => {
            return response.json()
        }).then((res) => { 
            swal.close() 
            if (res.status) { 
                kAlert("<hr /><b>결제사 기준 멤버십이 유지중인 회원입니다.</b><hr /><div class='fw-bold mb-2'>Q. 해지일수도 있나요?</div>A. 해지의 방식은 2가지 입니다.<br />1. 결제기관해지(민원해지) - 은행이나 CMS업체에 직접 신청한 경우<br />2. 뉴탐사 사이트를 통해 해지한 경우(관리자가 본 사이트에서 해지<small>(삭제)</small>한 경우)<br /><br />1의 경우 같은 통장(카드) 번호로 재가입시 가입이 불허되는 경우가 있고 2의 경우 저희쪽에서 데이터는 가지고 있지만 실제로 출금은 하지 않습니다.<br />그렇기에 시스템은 2를 선호합니다.<br /><br />또한 결제기관에서 해지 신청을 해도 10분 내에 본 시스템에 처리 됩니다.", "NOPE")
            } else { 
                Swal.fire({
                    title: `<h4 class="mb-0 text-danger">연동된 회원데이터가 없음</h4>`,
                    text: res.msg,  
                    confirmButtonText: "확인", 
                    customClass: {
                        confirmButton: 'btn btn-danger',  
                    }
                })

            }
            
        }).catch((error) => {
            return false
        })
}

function deleteMemberData(elem, type="main") {
    const thisTr = elem.parentNode.closest("[data-id]")
    const uniqueId = thisTr.getAttribute('data-id');
    const userStatusTitle = document.querySelectorAll('[data-id="' + uniqueId + '"] .memberNameTitle')[0].textContent; 

    swalInit.fire({
        title: "<h3 class='mb-0'>" + userStatusTitle + "</h3><span class='badge bg-dark bg-opacity-20 text-reset mono'>" + uniqueId + "</span><br />회원 데이터를 삭제합니다.",
        text: '회원고유ID, 결제기록, 그 외 정보 결제방식, 이름, 전화번호 생년월일은 따로 저장합니다.\n유저 데이터는 실제로 삭제되지 않습니다.',
        icon: 'warning',
        input: 'text',
        inputPlaceholder: '삭제사유',
        inputValidator: function (value) {
            return !value && '사유를 작성해주세요.'
        },
        showDenyButton: true,
        confirmButtonText: "삭제 진행",
        denyButtonText: '취소'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "이 창을 끄지 마세요",
                icon: 'warning',
                showConfirmButton: false,

            });

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("uniqueId", uniqueId);
            urlencoded.append("reason", result.value);


            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch("/ed4cf1fba0cb6a4349f4744f0a67c8d9", requestOptions)
                .then((response) => {
                    return response.json()
                }).then((res) => {
                    swal.close();
                    if (res.status) {
                        if (type == "main") {
                            document.querySelectorAll('[data-id="' + uniqueId + '"] .userStatusTitle')[0].innerHTML = "삭제"
                            thisTr.classList.add("memberDeleted")
                        } else if (type == "sms") {
                            related_membership_data_by_sms()
                        } else {
                            location.reload()
                        }
                        new Noty({
                            text: '유저가 삭제 되었습니다. 출금 신청이 진행되지 않습니다. 정산을 위해 기본적인 기록은 남아 있습니다.',
                            type: 'warning'
                        }).show();
                    } else {
                        new Noty({
                            text: "<b>이미 삭제됨</b><br />진행이 불가합니다. ",
                            type: 'error'
                        }).show();
                    }
                }).catch((error) => {
                    console.log(error)
                })


        }
    });
}

function makeItRowSmsStack(row, element) {
    let wrapClass = "media-chat-item hstack align-items-start gap-3 mb-2"
    if (typeof row.admin === "undefined" || row.admin == false) {
        wrapClass = "media-chat-item hstack align-items-start gap-3 mb-2"
    } else if (typeof row.admin !== "undefined" || row.admin == true) {
        wrapClass = "media-chat-item media-chat-item-reverse hstack align-items-start gap-3 me-2"
    }
    
    let image = ''
    if (typeof row.image !== "undefined" && row.image != false) image = '<img src="'+row.image+'" class="chat_image" />' 
    document.querySelector(element).innerHTML += `<div class="` + wrapClass +`">  
                    <div>
                        <div class="media-chat-message">`+ htmlEntities2(row.message) + image +`</div>
                        <div class="fs-sm text-muted mt-0"><span class="mono">`+ row.datetime + `</span> <span class="m-1">/</span> ` + moment(row.datetime).fromNow() + `</div> 
                    </div>
                </div>`;
}



function checkMembershipStatusGlobal(data) { 
    let result = {
        status: true,
        msg: '',
        code: ''
    }
    const { signatureInPng, generatedPDF, sentAgreement, insertedData, sentAgreementLogs, insertedDataStatusErrorBySystemMsg, insertedDataStatus, pg_status } = data
    if (signatureInPng != "Y") {
        result.status = false
        result.msg = '서명 데이터 제어 실패'
        code = 'ERROR 1'
    }
    if (generatedPDF != "Y") {
        result.status = false
        result.msg = '동의자료 생성 실패'
        code = 'ERROR 2'
    }
    if (sentAgreement != "Y") {
        result.status = false
        result.msg = '동의자료 전송 실패'
        code = 'ERROR 3'
    }
    if (insertedData != "Y") {
        result.status = false
        result.msg = '유저데이터 PG사 전송 실패 - '+data.insertedDataStatus,
        code = 'ERROR 4'
    } 

    if (typeof pg_status !== "undefined") { 
        if (pg_status.status == false && pg_status.msg != "정상") { 
            if (pg_status.msg.indexOf('점검시간 입니다') > -1) {
                
            } else {
                result.status = false
                result.msg += '[PG사 에러] - '+pg_status.msg 
                code = 'ERROR 5'
            }

        } 
    } 



    return result
}
