var domElem = {},
amount = 50000,
tds_percent = 0,
tds_amount = 0,
selectedFinancialYear,
selectedFinYearData,
selected_nature_of_payment,
recipient_type = 'individual_huf_sole_propetier';

window.addEventListener('load', function() {
    webengageCustomEvent("sv calculator " + calculatorType + " landing", {Source : location.href, Platform : platformType });
    $(document).ready(function() {
        // Question Mark Shake animation
        $('.calculator-form input').on('blur', function() {
            $(this).parent().siblings('.calci-label').removeClass('shake');
        }).on('focus', function() {
            $(this).parent().siblings('.calci-label').addClass('shake');
        });
        selectedFinancialYear = current_year;
        selectedFinYearData = tds_Data[current_year];
        selected_nature_of_payment = selectedFinYearData[0].content;
        $(document).on("click", ".financial_year_item", function(e) {
            let year = $(this).attr("data-year");
            if(selectedFinancialYear !== year) {
                selectedFinYearData = tds_Data[year];
                $("#nature_payment_list").empty();
                var fragment = document.createDocumentFragment();
                selectedFinYearData.forEach((payment) => {
                    li = document.createElement('li');
                    li.appendChild(document.createTextNode(payment.content.nature_of_payment_name));
                    li.setAttribute("class", "nature_of_payment_item");
                    li.setAttribute("data-value", payment.content.nature_of_payment_name);
                    li.setAttribute("value", payment.content.nature_of_payment_name);
                    fragment.appendChild(li);
                })
                $("#nature_payment_list").append(fragment);
                resetNatureOfPayment();
                selectedFinancialYear = year;
            }
            trackCustomGa4Event('dropdown', { click_text: e.target.innerText });
        });
    })
})

$(document).on('click', '.nature_of_payment_item', function(e) {
    let payment_name = $(this).attr('data-value');
    selected_nature_of_payment = selectedFinYearData.filter((payment_type) => payment_type.content.nature_of_payment_name === payment_name)[0].content;
    var inputField = $(e.currentTarget.parentElement).siblings('.selected_input');
    inputField.attr("data-value", $(this).attr('data-value'));
    inputField.attr("value", $(this).attr('value'));
    updateOutput();
    updateRule();
    trackCustomGa4Event('dropdown', { click_text: e.target.innerText });
})

$(document).on('click', '#calculate', function(e) {
    updateOutput(true);
    trackCustomGa4Event('CTA click', { click_text: e.target.innerText });
});

$(document).on('click', '.view-all-funds a', function(e) {
    trackCustomGa4Event('CTA click', { click_text: e.target.innerText, click_link:e.target.href });
});

$(document).on('click', '.related-fund-list li a', function() {
    let fundName = $(this).find('.fn-name').text();
    trackCustomGa4Event('CTA click', { click_text: fundName, click_link:this.href });
});

// $("input[type='text']").on('input', function() {
//     updateOutput();
// })

$("input[name='recepient_type']").on('click', function(e) {
    updateOutput();
    updateRule();
    trackCustomGa4Event('toggle', { click_text: e.target.value });
})
$("input[name$='pan_available']").click(function(e) {
        var test = $(this).val();
        if(test == 'pan_no'){
           $('.tds-applicable').removeClass("hide");
           trackCustomGa4Event('toggle', { click_text: "PAN - No" });
        }
        else{
           $('.tds-applicable').addClass("hide");
           trackCustomGa4Event('toggle', { click_text: "PAN - Yes" });
        }
});
function updateOutput(calculateClicked){
    domElem = {
        amount: document.querySelector('input[name="amount"]'),
    }
    let tds_percent, amount;
    recipient_type = $("input[name='recepient_type']:checked").val();
    if(allInputvalid()) {
        tds_percent = (recipient_type == 'others')? selected_nature_of_payment.recepient_type_other : selected_nature_of_payment.recepient_type_individual;
        amount = domElem.amount.dataset.value.replace(/[^0-9]/g, "");
        if(calculateClicked) {
            $(".calculation-second-step").removeClass("calci-hide");
        }
        if(parseInt(amount) >= parseInt(selected_nature_of_payment.limit || 0))
            tds_amount = (tds_percent * amount) / 100;
        else
            tds_amount = 0;
        $('.center-aligned-result .result-amount span').attr('data-value', tds_amount);
        animateOutput(300);
        outputContainer && outputContainer.classList.remove("overlay");
    } else {
        tds_amount = 0;
        $('.center-aligned-result .result-amount span').attr('data-value', tds_amount);
        animateOutput(300);
    }
}

function allInputvalid() {
    return inputValidator($("#amount")[0]) && inputValidator($("#nature_payment")[0]);
}

document.querySelectorAll("input[type='tel']").forEach((function(e) {
    e.addEventListener("blur", (function(t) {
        if(!e.value || e.value=='' || e.value <= 0) {
            $('.amt-error-msg').text('Please enter the amount to calculate the TDS');
            $('.amt-error-msg').removeClass('hide');
            e.parentElement.nextElementSibling.classList.add('hide');
        } else {
            $('.amt-error-msg').addClass('hide');
            e.parentElement.nextElementSibling.classList.remove('hide');
        }
        updateOutput();
    }))
}))

function inputValidator(inputElement) {
// Validate if required
    if (!$(inputElement).attr('data-optional')) {
        // we can add field name for custom error here
        if ($(inputElement).attr('data-value') === '' || $(inputElement).attr('data-value') == '0') {
            showError(inputElement, "This field is required");
            // errorElem.text('This field is required.').removeClass('hidden');
            return false;
        } else {
            removeError(inputElement);
            return true;
        }
    }
}

function resetNatureOfPayment(){
    let nature_of_payment = $("input[name='nature_payment");
    nature_of_payment.attr("data-value", "");
    nature_of_payment.attr("data-type-other", "");
    nature_of_payment.attr("data-type-individual", "");
    nature_of_payment.attr("rule-individual", "");
    nature_of_payment.attr("rule-others", "");
    nature_of_payment.attr("limit", "");
    nature_of_payment.val("");
    updateOutput();
}

function updateRule() {
    var modalContent = $("#calculationRules .modal-body p");
    let rule = (recipient_type == 'others')? selected_nature_of_payment.recepient_type_other_rule : selected_nature_of_payment.recepient_type_individual_rule;
    modalContent.text(rule);
}
