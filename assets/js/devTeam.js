
((localStorage.getItem('theme') == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage.getItem('theme') == 'dark') && document.documentElement.setAttribute('data-color-theme', 'dark'); 
 
const layoutTheme = function () {
    var primaryTheme = 'light';
    var secondaryTheme = 'dark';
    var storageKey = 'theme';
    var colorscheme = document.getElementsByName('main-theme');
    var mql = window.matchMedia('(prefers-color-scheme: ' + primaryTheme + ')');

    function indicateTheme(mode) {
        for (var i = colorscheme.length; i--;) {
            if (colorscheme[i].value == mode) {
                colorscheme[i].checked = true;
                // colorscheme[i].closest('.list-group-item').classList.add('bg-primary', 'bg-opacity-10', 'border-primary');
            }
            else {
                // colorscheme[i].closest('.list-group-item').classList.remove('bg-primary', 'bg-opacity-10', 'border-primary');
            }
        }
    };

    function applyTheme(mode) {
        var st = document.documentElement;
        if (mode == primaryTheme) {
            st.removeAttribute('data-color-theme');
        }
        else if (mode == secondaryTheme) {
            st.setAttribute('data-color-theme', 'dark');
        }
        else {
            if (!mql.matches) {
                st.setAttribute('data-color-theme', 'dark');
            }
            else {
                st.removeAttribute('data-color-theme');
            }
        }
    };

    function setTheme(e) {
        var mode = e.target.value;
        document.documentElement.classList.add('no-transitions');
        if ((mode == primaryTheme)) {
            localStorage.removeItem(storageKey);
        }
        else {
            localStorage.setItem(storageKey, mode);
        }
        autoTheme(mql);
    };

    function autoTheme(e) {
        var current = localStorage.getItem(storageKey);
        var mode = primaryTheme;
        var indicate = primaryTheme;
        if (current != null) {
            indicate = mode = current;
        }
        else if (e != null && e.matches) {
            mode = primaryTheme;
        }
        applyTheme(mode);
        indicateTheme(indicate);
        setTimeout(function () {
            document.documentElement.classList.remove('no-transitions');
        }, 100);
    };

    autoTheme(mql);
    mql.addListener(autoTheme);

    for (var i = colorscheme.length; i--;) {
        colorscheme[i].onchange = setTheme;
    }
};



document.addEventListener('DOMContentLoaded', function () {
    layoutTheme();
    Noty.overrideDefaults({
        theme: 'limitless',
        layout: 'topRight',
        type: 'alert',
        timeout: 2500
    });
});


const delay = ms => new Promise(res => setTimeout(res, ms));
var spinArray = [
    'round',
    'pinwheel',
    'balls',
    'bubble',
    'flip',
    'hue',
    'skeleton',
    'eclipse',
    'boxes',
    'morph',
    'heart',
    'meter'
];

moment.updateLocale('en', {
    relativeTime: {
        future: "미래 - %s",
        past: "%s 전",
        s: '몇초',
        ss: '%d초',
        m: "1분",
        mm: "%d분",
        h: "1시간",
        hh: "%d시간",
        d: "하루",
        dd: "%d일",
        w: "1주",
        ww: "%d주",
        M: "한달",
        MM: "%d달",
        y: "1년",
        yy: "%d년"
    }
});

const swalInit = swal.mixin({
    buttonsStyling: false,
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light',
        denyButton: 'btn btn-light',
        input: 'form-control'
    }
});
function hiddenIntlPhoneNumber() {
    
    const hiddenIntlPhoneNumber = localStorage.getItem("hiddenIntlPhoneNumber");
    if (hiddenIntlPhoneNumber == null) {
        localStorage.setItem("hiddenIntlPhoneNumber", "N");
        location.reload()
        return;
    }
    if (hiddenIntlPhoneNumber == "N") {
        localStorage.setItem("hiddenIntlPhoneNumber", "Y");
    } else {
        localStorage.setItem("hiddenIntlPhoneNumber", "N");
    }
    location.reload()
    
}
            
function toggle(idName) {
    var x = document.getElementById(idName);
    if (x.style.display === "none") {
        x.style.display = "inherit";
    } else {
        x.style.display = "none";
    }
}

function downloadFile(url, fileName) {
    fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
        .then(res => res.blob())
        .then(res => {
            const aElement = document.createElement('a');
            aElement.setAttribute('download', fileName);
            const href = URL.createObjectURL(res);
            aElement.href = href;
            // aElement.setAttribute('href', href);
            aElement.setAttribute('target', '_blank');
            aElement.click();
            URL.revokeObjectURL(href);
        });
};
const paginationTemplate = {
    page: '<li class="page-item"> <a href="javascript:;" class="page-link mono" data-id="A">{{page}}</a> </li>',
    currentPage: '<li class="page-item active"> <a href="javascript:;" class="page-link mono" data-id="B">{{page}}</a> </li>',
    moveButton: '<li class="page-item"> <a href="javascript:;" class="page-link" data-id="C"><span class="tui-ico-{{type}}"></span></a> </li>',
    disabledMoveButton: '<li class="page-item disabled"> <a href="javascript:;" class="page-link" data-id="D"><span class="tui-ico-{{type}}"></span></a> </li>',
    moreButton: '<li class="page-item"> <a href="javascript:;" class="page-link" data-id="E">...</a> </li>'
}


function generateRandomString(length = 15) {
    var result = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

    for (var i = 0; i < length; i++) result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

function generateRandomString2(length = 15) {
    var result = "";
    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++) result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

function generateRandomString3(length = 15) {
    var result = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++) result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}
function generateRandomString4(length = 15) {
    var result = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++) result += possible.charAt(Math.floor(Math.random() * possible.length));

    return result;
}

function kAlert(msg) {
    swalInit.fire({
        title: "알림",
        html: `<div class="text-center">` + msg + `</div>`,
        showConfirmButton: true,
        confirmButtonText: "닫기",
    });
}

function kAlertWarning(title, msg) {
    Swal.fire({
        title: `<h5 class="mb-0 text-danger">` + title + `</h5>`,
        text: msg,
        confirmButtonText: "확인",
        customClass: {
            confirmButton: 'btn btn-danger',
        }
    })
}


function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function htmlEntities2(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\n/g, '<br />');
}

function siPasNull(value, returnType) {
    let result = true
    if (value === undefined || value === null || value === 0) {
        result = false
    }


    const resultFinalInBool = result
    const resultFinalInString = result ? value : ""

    return returnType == 'bool' ? resultFinalInBool : resultFinalInString

}
function payByShow(value) {
    let result = ''
    if (value == "bank") result = '<small class="badge bg-success bg-opacity-20 text-success ">계좌이체</small>';
    if (value == "card") result = '<small class="badge bg-primary bg-opacity-20 text-primary ">신용카드</small>';
    return result;
}
function payStatusInBadge(value) {
    const array1 = ["출금성공", "성공", "출금성공", "승인성공"];
    if (array1.includes(value)) {
        result = '<small class="badge bg-success ">' + value + '</small>';
    } else {
        result = '<small class="badge bg-danger">' + value + '</small>';
    }
    return result;

}

function getItemsInAscendingDateOrderAndClosestToNowFirst(arr) {
    const time = Date.now();
    const [closest, ...rest] = Array.from(arr).sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();

        const aDelta = Math.abs(time - aTime);
        const bDelta = Math.abs(time - bTime);

        return (aDelta - bDelta);
    });

    return [closest, ...rest.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())];
}

function makeVirtualListDetailOnList(Ids) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("Ids", JSON.stringify(Ids));

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("/get_sum_virtual_account_deposit", requestOptions)
        .then((response) => {
            return response.json()
        }).then((res) => {
            let resultData = []
            res.results.forEach(row => {
                if (!resultData[row.memberId]) {
                    resultData[row.memberId] = []
                }
                resultData[row.memberId].push(row.actualAmount)
            });

            for (const key in resultData) {
                let totalCount = 0
                let totalAmount = 0
                if (Object.hasOwnProperty.call(resultData, key)) {
                    const element = resultData[key];
                    totalCount = element.length
                    totalAmount = element.reduce((a, b) => a + b, 0)
                }
                document.querySelector('[data-id="' + key + '"].totalPriceEachAccount').textContent = parseInt(totalAmount).toLocaleString()
                document.querySelector('[data-id="' + key + '"].countDeposit').textContent = parseInt(totalCount).toLocaleString()
            }
        }).catch((error) => {
            console.log(error)
        })
}

function base64toFile(base_data) { 
    var arr = base_data.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], generateRandomString(), {type:mime});
}