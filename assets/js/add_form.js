
function makeFormForMembership(element, hiddenElementsArray) {

    const formInHtml = `<div class="row mb-3">
        <label class="col-form-label col-sm-3">결제방식</label>
        <div class="col-sm-9">
            <select id="payBy" data-form="payByMembershipWrap" class="form-select" name="payBy">
                <option value="bank">계좌이체</option>
                <option value="card">신용카드</option>
            </select> 
        </div>
    </div>

    <div class="row mb-3">
        <label class="col-form-label col-sm-3">개인/기업</label>
        <div class="col-sm-9">
            <select id="holderType" class="form-select" data-form="holderType" name="holderType">
                <option value="individual">개인</option>
                <option value="company">기업</option>
            </select>  
        </div>
    </div>

    <div class="row mb-3">
        <label class="col-form-label col-sm-3">성명</label>
        <div class="col-sm-9">
            <input type="text" name="memberName" placeholder="통장/카드에 작성된 본명만 기입해주세요"
                class="form-control">
        </div>
    </div>

    <div class="row mb-3">
        <label class="col-form-label col-sm-3">휴대폰 번호</label>
        <div class="col-sm-9">
            <input type="number" name="memberMobile" placeholder="숫자만 적으세요" class="form-control">
        </div>
    </div>

    <div class="row mb-3">
        <label class="col-form-label col-sm-3 fw-bold">금액</label>
        <div class="col-sm-9">
            <input type="number" placeholder="숫자만 적으세요" name="price"
                class="form-control mono fw-bold">
        </div>
    </div>

    <div class="payByBankWrap" data-form="payByBankWrap" style="display: block;">
        <hr />
        <div class="row mb-3">
            <label class="col-form-label col-sm-3">은행</label>
            <div class="col-sm-9">
                <select id="bankName" class="form-select" name="bankName">
                    <option value="" selected="" disabled="">은행을 선택해 주세요</option>
                    <option value="KEB하나은행">KEB하나은행</option>
                    <option value="신한은행">신한은행</option>
                    <option value="기업은행">기업은행</option>
                    <option value="국민은행">국민은행</option>
                    <option value="케이뱅크">케이뱅크</option>
                    <option value="카카오뱅크">카카오뱅크</option>
                    <option value="수협중앙회">수협중앙회</option>
                    <option value="농협은행">농협은행</option>
                    <option value="우리은행">우리은행</option>
                    <option value="SC제일은행">SC제일은행</option>
                    <option value="산업은행">산업은행</option>
                    <option value="한국씨티은행">한국씨티은행</option>
                    <option value="대구은행">대구은행</option>
                    <option value="부산은행">부산은행</option>
                    <option value="광주은행">광주은행</option>
                    <option value="제주은행">제주은행</option>
                    <option value="전북은행">전북은행</option>
                    <option value="경남은행">경남은행</option>
                    <option value="새마을금고">새마을금고</option>
                    <option value="신협중앙회">신협중앙회</option>
                    <option value="우체국">우체국</option>
                    <option value="유안타증권">유안타증권</option>
                    <option value="삼성증권">삼성증권</option>
                </select>
            </div>
        </div>

        <div class="row mb-3">
            <label class="col-form-label col-sm-3">계좌번호</label>
            <div class="col-sm-9">
                <input type="number" name="bankAccountNumber" placeholder="숫자만 적으세요"
                    class="form-control">
            </div>
        </div>
    </div>

    <div class="payByCardWrap" data-form="payByCardWrap" style="display: none;">
        <hr />

        <div class="row mb-3">
            <label class="col-form-label col-sm-3">카드번호</label>
            <div class="col-sm-9">
                <input type="number" name="cardNumber" placeholder="숫자만 적으세요" class="form-control mono">
            </div>
        </div>

        <div class="row mb-3">
            <label class="col-form-label col-sm-3">유효기간 (월/년)</label>
            <div class="col-sm-9">
                <input type="text" name="cardValidThru" data-form="cardValidThru" placeholder="12/29" class="form-control mono">
            </div>
        </div>

        <div data-form="cardPINWrap" class="row mb-3">
            <label class="col-form-label col-sm-3">카드비밀번호 (앞 2자리)</label>
            <div class="col-sm-9">
                <input type="number" name="cardPIN" placeholder="숫자만 적으세요" class="form-control mono">
            </div>
        </div>

    </div>
    <hr />
    <div class="holderRegistrationNumberForIndividual" data-form="holderRegistrationNumberForIndividual">
        <div class="row mb-3">
            <label class="col-form-label col-sm-3">생년월일</label>
            <div class="col-sm-9">
                <input type="text" name="holderRegistrationNumberForIndividual" placeholder="숫자만 적으세요 / 예금주 혹은 카드소지자 기준 [개인]" class="form-control mono">
            </div>
        </div>
    </div>
    <div class="holderRegistrationNumberForCompany" data-form="holderRegistrationNumberForCompany" style="display: none;">
        <div class="row mb-3">
            <label class="col-form-label col-sm-3">사업자등록번호</label>
            <div class="col-sm-9">
                <input type="text" name="holderRegistrationNumberForCompany" placeholder="숫자만 적으세요 / 예금주 혹은 카드소지자 기준 [기업]" class="form-control mono">
            </div>
        </div>
    </div>

    <div class="row mb-3">
        <label class="col-form-label col-sm-3">결제일 (출금일)</label>
        <div class="col-sm-9">
            <select id="payDate" class="form-select" name="payDate" aria-label="일자 선택">
                <option value="5" selected="">5일</option>
                <option value="10">10일</option>
                <option value="15">15일</option>
                <option value="20">20일</option>
            </select>
        </div>
    </div>`

    document.querySelector(element).innerHTML = formInHtml
    document.querySelector('[data-form="payByMembershipWrap"]').onchange = function () {
        const payByValue = document.querySelector('[data-form="payByMembershipWrap"]').value
        if (payByValue == "bank") {
            document.querySelector('[data-form="payByCardWrap"]').style.display = "none";
            document.querySelector('[data-form="payByBankWrap"]').style.display = "block";
        } else {
            document.querySelector('[data-form="payByCardWrap"]').style.display = "block";
            document.querySelector('[data-form="payByBankWrap"]').style.display = "none";
        }
    }
    document.querySelector('[data-form="holderType"]').onchange = function () {
        const holderTypeValue = document.querySelector('[data-form="holderType"]').value
        if (holderTypeValue == "individual") {
            document.querySelector('[data-form="holderRegistrationNumberForCompany"]').style.display = "none";
            document.querySelector('[data-form="holderRegistrationNumberForIndividual"]').style.display = "block";
        } else {
            document.querySelector('[data-form="holderRegistrationNumberForCompany"]').style.display = "block";
            document.querySelector('[data-form="holderRegistrationNumberForIndividual"]').style.display = "none";
        }
    } 

    IMask(document.querySelector('[name="cardValidThru"]'), {
        mask: '00/00'
    });

    IMask(document.querySelector('[name="holderRegistrationNumberForIndividual"]'), {
        mask: '0000-00-00'
    });
    IMask(document.querySelector('[name="holderRegistrationNumberForCompany"]'), {
        mask: '000-00-00000'
    });
    hiddenElementsArray.forEach(el => {
        document.querySelector(el).style.display = "none"
    });
};

