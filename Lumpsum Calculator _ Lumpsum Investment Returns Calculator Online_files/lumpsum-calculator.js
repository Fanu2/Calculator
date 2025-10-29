window.addEventListener("load", windowLoadCallback);

const LUMPSUM_AMOUNT_MAX = 100000000; // 10 Crore
const LUMPSUM_AMOUNT_SLIDER_MAX = 100000000; // 10 Crore
const LUMPSUM_TARGET_MAX = 100000000; // 10 Crore
const LUMPSUM_TARGET_SLIDER_MAX = 100000000; // 10 Crore

var type = 'investmentDetails',
    domElem, period, interest = 12,
    tenure = 10,
    chart,
    principal = 1000,
    selectedPeriod = "Yearly",
    compoundAmount = 88117,
    compoundInterest = 38117,
    compoundInterval = 1,
    additionalAmount = 5000,
    additionalYear = 0,
    isAdditionalAmount = false,
    isInflation = false,
    inflationRate = 4,
    primaryCategory = 'EQUITY';


function windowLoadCallback() {
    domElem = {
        amountElem: document.querySelector('input[name="amount"]'),
        interestElem: document.querySelector('input[name="strategy"]'),
        TimePeriod: document.querySelector('input[name="period"]'),
        invesdtedAmount: document.querySelector("#invesdtedAmount span"),
        InterestGain: document.querySelector("#InterestGain span"),
        maturityAmount: document.querySelector("#maturityAmount span"),
        graphBody: document.querySelector(".graphic-body"),
        postTax: document.querySelector("input[name='post_tax']"),
        seniorCitizen: document.querySelector("input[name='senior_citizen']"),
        extraInterest: document.getElementById("extraInterest"),
        extraInterestProp: document.getElementById("extraInterestProp"),
        postTaxBlock: document.querySelector(".post-tax-block"),
        percentageProp: document.querySelector(".input-prop.percentage"),
        yearProp: document.querySelector(".input-prop.year"),
        resultBlock: document.querySelector("#fd_result"),
        engagementTip: document.querySelector(".helping-info .main"),
        leftLabel: document.querySelector(".graphic-body .left-up-arrow"),
        rightLabel: document.querySelector(".graphic-body .right-up-arrow"),
    },
    setAllSliders();
        DrawChart(),generateAmountLabels(),
        document.getElementById("calculate").addEventListener("click", (function (e) {
            allInputvalid() &&
            (domElem.InterestGain.setAttribute("data-prevalue", Math.round(compoundInterest / 3)),
                domElem.maturityAmount.setAttribute("data-prevalue", Math.round(compoundAmount / 3)),
                updateOutput(),
                window.outerWidth < 991 && $("html, body").animate({
                    scrollTop: $(".calculation-result").offset().top - 60
                }, 500)),

                trackCustomGa4Event('CTA click', { click_text: e.target.innerText});
        }))

    $('#show_earn_more').click(function (e) {
        $('#show_earn_more_parent').addClass('hidden');
        $('#earn_more').removeClass('hidden');
        isAdditionalAmount = true;
        if($('.tenure-label').hasClass('active')) {
            $('#amount_yr_toggle').click();
        }
        updateOutput();
        trackCustomGa4Event('CTA click', { click_text: this.innerText });
    });

    const totalInvestedHtml = $('.table-listing li').first().html();
    const maturityHtml = $('.table-listing li').last().html();
    $('.detailType input[type="radio"]').click(function () {
      if(type === $(this).attr("value")) {
        return;
      }
        type = $(this).attr("value");
        var rangeELem = document.querySelector('input.input-amount[type="range"]');
        if (type == 'investmentDetails') {
            $('.graphic-body').addClass('bar-graphic-body');
            if (window.outerWidth > 991) {
                $('.chart-box').css('height', "80%");
            }
            $("input[name='amount']").val("50,000")
            $("input[name='amount']").attr('data-value', "50,000")
            $('.amount-form-group .calci-amount').text(capitalizeFirstLetter(valueInWords(50000)) + " only");
            $('.calci-amount').removeClass('error-msg');
            $('.calci-input-ctrl').removeClass('error-in');
            outputContainer.classList.remove("overlay");

            $(domElem.amountElem).attr('data-max', LUMPSUM_AMOUNT_MAX),
            $(domElem.amountElem).attr('maxlength', "14")
            $(rangeELem).attr('max', LUMPSUM_AMOUNT_SLIDER_MAX);

            $('#typeLabel').text('Investment amount');
            $('.period-label').text("Period");
            $('#first-label').text('Total invested')
            $('#second-label').text('Gains');
            $('#third-label').text('Future value');
            $('.pie-about').addClass('hide');
            $('.bar-about').removeClass('hide');
            $('.goal-wyg').addClass('hide');
            $('.inv-wyg').removeClass('hide');
            $('.visible-goal').addClass('hide');
            $('.visible-investment').removeClass('hide');
            trackCustomGa4Event('toggle', { click_text: "Investment Amount"});
        } else {
            $('.graphic-body').removeClass('bar-graphic-body');
            if (window.outerWidth > 991) {
                $('.chart-box').css('height', "65%");
            }

            $(domElem.amountElem).val("5 Lacs")
            $(domElem.amountElem).attr('data-value', "5,00,000");
            $(domElem.amountElem).attr('data-max', LUMPSUM_TARGET_MAX),
            $(domElem.amountElem).attr('maxlength', "14")
            $(rangeELem).attr('max', LUMPSUM_TARGET_SLIDER_MAX);
            $('.amount-form-group .calci-amount').text(capitalizeFirstLetter(valueInWords(500000)) + " only")
            $('.calci-amount').removeClass('error-msg');
            $('.calci-input-ctrl').removeClass('error-in');
            outputContainer.classList.remove("overlay");

            $('#typeLabel').text('I want to achieve');
            $('.period-label').text("Period");
            $('#first-label').text('Invest today')

            $('#second-label').text('Interest earned');
            $('#third-label').text('Target amount');
            $('.bar-about').addClass('hide');
            $('.pie-about').removeClass('hide');
            $('.inv-wyg').addClass('hide');
            $('.goal-wyg').removeClass('hide');
            $('.visible-investment').addClass('hide');
            $('.visible-goal').removeClass('hide');
            trackCustomGa4Event('toggle', { click_text: "Goal Amount"});
        }
        reset();
        updateSliderCSS(domElem.amountElem);
        updateOutput(type);
    });

    $('.calci-radio-btn-lumpsum').click(function (e) {
        if (this.previous) {
            this.checked = false;
        }
        this.previous = this.checked;
        if (this.checked) {
            principal = parseInt(domElem.amountElem.dataset.value.replace(/[^0-9]/g, ''));
            additionalYear = e.target.innerText.replace(/[^0-9]/g, "");
            additionalAmount = 0;
            isAdditionalAmount = false;
            $('.amount-values li').removeClass('active');
            $(".year-values li").first().addClass("active");
            $('.tenure-label').addClass('active');
            $('.amount-label').removeClass('active');
            document.querySelector(".year-values").classList.remove("hide");
            document.querySelector(".amount-values").classList.add("hide");
            trackCustomGa4Event('toggle', { click_text: "Tenure"});
        } else {
            console.log("domElem.TimePeriod.value", domElem.TimePeriod.value)
            tenure = domElem.TimePeriod.value;
            additionalYear = 0;
            additionalAmount = e.target.innerText.replace(/[^0-9]/g, "");
            isAdditionalAmount = true;
            $('.year-values li').removeClass('active');
            $(".amount-values li").first().addClass("active");
            $('.tenure-label').removeClass('active');
            $('.amount-label').addClass('active');
            document.querySelector(".year-values").classList.add("hide");
            document.querySelector(".amount-values").classList.remove("hide");
            trackCustomGa4Event('toggle', { click_text: "Amount"});
        }


        updateOutput();
    });

    $('.calci-radio-btn-inflation').click(function (e) {
        if (this.previous) {
            this.checked = false;
        }
        this.previous = this.checked;
        if (this.checked) {

            isInflation = true;
            document.querySelector(".inflation-box").classList.remove("hide");
        } else {
            isInflation = false;
            document.querySelector(".inflation-box").classList.add("hide");

        }

        updateOutput();
    });


    $("input[class*='numbers-only']").keydown(function (event) {

        if (event.shiftKey == true) {
            event.preventDefault();
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
            event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 ||
            event.keyCode == 110) {

        } else {
            event.preventDefault();
        }
        if ($(this).val().indexOf('.') !== -1 && (event.keyCode == 190 || event.keyCode == 110))
            event.preventDefault();
        //if a decimal has been added, disable the "."-button

    });

    $('.add-table table td a').on('click', function(e){
      trackCustomGa4Event('fund name click', { click_text: e.target.innerText, click_link: e.target.href });
    });

    $('.add-table table td span[title="Invest Now"]').on('click', function(e){
      let investURL =  $(this).attr('data-url')
      trackCustomGa4Event('CTA click', { click_text: e.target.innerText, click_link: investURL });
    });

    $('.gns-growth-links').on('click', function(){
      let knowMoreText = $(this).children('.know-more-txt').text();
      trackCustomGa4Event('CTA click', { click_text: knowMoreText, click_link: this.href });
    });

    $('#invest_nps').on('click', function(e) {
      trackCustomGa4Event('CTA click', { click_text: e.target.innerText, click_link: e.target.href });
    });

    $('.calculation-result .cta-primary').on('click', function(e) {
      trackCustomGa4Event('CTA click', { click_text: e.target.innerText, click_link: e.target.href });
    });

    $(".dropdown-wrap .selected_input").on("change paste keyup", function (e) {
        interest = $(this).val();
        callAPI(primaryCategory, tenure);
        updateOutput()
        trackCustomGa4Event('dropdown', { click_text: type});
        // if (val && val != '') {
        //     switch (val) {
        //         case 'Aggressive':
        //             interest = 12;
        //             primaryCategory = 'EQUITY';
        //             $('.strategy-alert').html('This might give you <span class="green-bold">12%</span> returns')
        //             break;
        //         case 'Conservative':
        //             interest = 6;
        //             primaryCategory = 'DEBT';
        //             $('.strategy-alert').html('This might give you <span class="green-bold">6%</span> returns')

        //             break;
        //         case 'Balanced':
        //         case 'Moderate':
        //             interest = 8;
        //             primaryCategory = 'HYBRID';
        //             $('.strategy-alert').html('This might give you <span class="green-bold">8%</span> returns')
        //             break;
        //         case 'Custom':
        //             interest = 8;
        //             primaryCategory = 'EQUITY';
        //             $('.strategy-alert').html('Enter expected rate of returns (%)')
        //             break;
        //         default:
        //             interest = parseFloat(val);
        //             break;
        //     }
        //     // interest = parseFloat(val);
        //     // callAPI(primaryCategory, tenure);
        //     updateOutput();
        // }
    });

    $(".bottom-invest-section .editbtn").on("click", function() {
      $("html, body").animate({ scrollTop: 0}, 300);
      trackCustomGa4Event('CTA click', { click_text: this.innerText});
    });
} //close windowLoadCallback

function generateAmountLabels() {
    try {
        principal = parseInt(domElem.amountElem.dataset.value.replace(/[^0-9]/g, ''));

        let ul = document.querySelector('.amount-values');
        ul.innerHTML = '';
        let principalAmt = principal;
        let firstElement = document.createElement('li');
        firstElement.setAttribute('data-value', principalAmt);
        firstElement.innerText = '₹' + (principalAmt > 99999 ? convertToLacsAndCrores(principalAmt) : kFormatter(principalAmt));
        firstElement.classList.add('active');
        ul.appendChild(firstElement);
        for (i = 0; i < 3; i++) {
            principalAmt = principalAmt + principal;

            let item = document.createElement('li');
            item.setAttribute('data-value', principalAmt);
            let displayAmt = (principalAmt > 99999 ? convertToLacsAndCrores(principalAmt) : kFormatter(principalAmt));
            if (principalAmt > 99999 && window.outerWidth < 991) {
                displayAmt = ((displayAmt.replace(/acs/g, '')).replace(/rs/g, '')).replace(/ac/g, '')
            }
            item.innerHTML = '₹' + displayAmt
            ul.appendChild(item);
        }
        bindClickEventToLi();
    } catch (error) {
        console.log("Error in generateAmountLabels", error);
    }
}

function generateYearLabels() {
    let tenureVAL = parseInt(domElem.TimePeriod.value);
    let ul = document.querySelector('.year-values');
    ul.innerHTML = '';

    let firstElement = document.createElement('li');
    firstElement.innerText = tenureVAL + 'Yr';
    firstElement.classList.add('active');
    ul.appendChild(firstElement);
    let incValue = 1;
    if (parseInt(domElem.TimePeriod.value) >= 5) {
        incValue = 2;
    }

    for (i = 0; i < 3; i++) {
        tenureVAL = tenureVAL + incValue;

        let item = document.createElement('li');
        item.innerText = tenureVAL + 'Yr';
        ul.appendChild(item);
    }
    bindClickEventToLi();
}

function getGraphLabels() {
    var e = parseInt(domElem.TimePeriod.value),
        t = +domElem.TimePeriod.value,
        a = [];
    if (e >= 6) {
        for (var r = e % 2 == 0 ? 0 : 1; r <= e; r += 2)
            if (r != 0) a.push(r + "Y");
        t != e && a.push(t + "Y")
    } else if (e) {
        for (r = 0; r <= e; r += 1)
            if (r != 0) a.push(r + "Y");
        t != e && a.push(t + "Y")
    } else {
        for (var o = parseInt(12 * domElem.TimePeriod.value), n = 0; n <= o; n += 3)
            n ? a.push(n + " mo") : a.push(n);
        o % 3 != 0 && a.push(o + " mo")
    }
    return a
}

function updateInput() {
    reset();
}

function debounceWithContext(func, timeout = 300) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function updateOutput(e) {
    // tenure = domElem.TimePeriod.value;
    // interest = domElem.interestElem.value;
    allInputvalid() && (compoundAmount = type == 'goalDetails' ? calculateGoalInvestmentAmount() : calculateMaturityAmount(),
        compoundInterest = (compoundAmount - principal).toFixed(),
        domElem.invesdtedAmount.innerText = type == 'goalDetails' ? convertToLacsAndCrores(compoundAmount) : convertToLacsAndCrores(principal),
        DrawChart(),
        "function" == typeof debouncedAnimateOutput ? (domElem.InterestGain.setAttribute("data-value", compoundInterest),
            domElem.InterestGain.classList.add("count"),
            domElem.maturityAmount.setAttribute("data-value", type == 'goalDetails' ? principal : compoundAmount),
            domElem.maturityAmount.classList.add("count"),
            debouncedAnimateOutput(300)) : (domElem.InterestGain.innerText = convertToLacsAndCrores(compoundInterest),
                domElem.maturityAmount.innerText = type == 'goalDetails' ? convertToLacsAndCrores(principal) : convertToLacsAndCrores(compoundAmount)));
}

function kFormatter(num) {
    return Math.abs(num) >= 10000 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

function calculateGoalInvestmentAmount() {
    principal = parseInt(domElem.amountElem.dataset.value.replace(/[^0-9]/g, ''));

    var rate = parseFloat(interest / 100);
    var periods = parseInt(tenure);
    var value = parseInt(principal);

    if (isInflation) {
        let inflationValue = inflationRate / 100;
        // The formula for inflation adjusted goal value = present goal * (1+inflation%)^10. So here
        // 50*(1+0.04)^10 = 74,012 so it's lumpsum investment value required is 34,282 & interest=39730
        // console.log("-------",50000 * Math.pow((1 + 0.04),periods));
        value = Math.round(principal * Math.pow((1 + inflationValue), periods))
        principal = value;
    }
    console.log("value", value)
    var term = Math.pow(1 + rate, periods);
    var backwardValue = Math.round(value / term);
    console.log("backwardValue", backwardValue)
    return backwardValue;
}

function calculateMaturityAmount(e) {
    var maturityAmount = 0;
    var r = interest;
    r = parseFloat(r) / 100;
    var n = compoundInterval;
    // maturityAmount = compoundInterest(principal, tenure, r, n)


    $('.extraInvAmt').html(convertToLacsAndCrores(principal));


    const amount = principal * (Math.pow((1 + (r / n)), (n * tenure)));
    let extraInvFuture = ((principal * 2) * (Math.pow((1 + (r / n)), (n * tenure))));
    $('.extraInvFuture').html(convertToLacsAndCrores(Math.ceil(extraInvFuture) - amount));
    //const interest = amount - principal;
    return amount;
}


function bindClickEventToLi() {
    document.querySelectorAll(".percent-inv-values li").forEach((function (e) {
        e.addEventListener("click", (function (e) {
            console.log(e.target.getAttribute('data-value'))
            let innertTextVal = e.target.innerText.replace(/[^0-9]/g, "");
            let val = e.target.getAttribute('data-value') ? e.target.getAttribute('data-value') : innertTextVal;
            if (isAdditionalAmount) {
                //additionalAmount = parseInt(val);
                principal = parseInt(val);
            } else {
                tenure = parseInt(innertTextVal)
            }
            document.querySelector(".percent-inv-values li.active").classList.remove("active");
            e.target.classList.add("active");
            updateOutput();
            trackCustomGa4Event('value capsule click', { click_text: e.target.innerText});
        }));
    }))
}
bindClickEventToLi();

document.querySelectorAll(".inflation-values li").forEach((function (e) {
    e.addEventListener("click", (function (e) {
        inflationRate = e.target.innerText.replace(/[^0-9]/g, "");
        document.querySelector(".inflation-values li.active").classList.remove("active");
        e.target.classList.add("active");
        updateOutput();
    }));
}))

document.querySelectorAll(".interest-tenure li").forEach((function (e) {
    e.addEventListener("click", (function (e) {
        selectedPeriod != e.target.innerText && (selectedPeriod = e.target.innerText,
            document.querySelector(".interest-tenure li.active").classList.remove("active"),
            e.currentTarget.classList.add("active"),
            compoundInterval = "Yearly" == selectedPeriod ? 1 : "Quarterly" == selectedPeriod ? 4 : 12,
            updateOutput(!0)
        )
    }))
}));

// document.querySelectorAll("#strategy li").forEach((function (e) {
//     e.addEventListener("click", (function (e) {
//         var type = e.target.innerText;
//         switch (type) {
//             case 'Aggressive':
//                 interest = 12;
//                 primaryCategory = 'EQUITY';
//                 $('.strategy-alert').html('This might give you <span class="green-bold">12%</span> returns');
//                 break;
//             case 'Conservative':
//                 interest = 6;
//                 primaryCategory = 'DEBT';
//                 $('.strategy-alert').html('This might give you <span class="green-bold">6%</span> returns')

//                 break;
//             case 'Moderate':
//             case 'Balanced':
//                 interest = 8;
//                 primaryCategory = 'HYBRID';
//                 $('.strategy-alert').html('This might give you <span class="green-bold">8%</span> returns')
//                 break;
//             case 'Custom':
//                 interest = 8;
//                 primaryCategory = 'EQUITY';
//                 $('.strategy-alert').html('Enter expected rate of returns (%)')
//                 break;

//             default:
//                 break;
//         }
//         callAPI(primaryCategory, tenure);
//         updateOutput()
//         trackCustomGa4Event('dropdown', { click_text: type});
//     }))

// }));


// document.querySelector("input[name='strategy']").addEventListener("input", (function (e) {
//     //strategyTrigger(e.target.value);
//     var t = e.target.value.replace(/[^0-9.]/g, "");
//     console.log("t", t)
//     if (t) {
//         var a = (t + "").split(".")[1],
//             r = (t + "").split(".")[0]; +
//                 r[0] < 2 && r.length > 2 ? r = r.substring(0, 2) : +r[0] >= 3 && r.length > 1 && (r = r.substring(0, 1));
//                 if(t + "".indexOf(".") > 0 ){
//                     t = +(r + (a ? "." + a : ".0"));
//                     a[0] = '0';
//                 } else {
//                     t = +r;
//                 }
//                 value = a ? +a[1] ? t.toFixed(2) : t.toFixed(1) : t,
//                 e.target.value = value;
//                 // domElem.percentageProp.style.left = 10 + 10 * value.length + "px",
//                 updateOutput()
//     } else
//         showError(e.target, 'Please enter interest rate');
//         outputContainer.classList.add("overlay"),
//         calculateBtn.classList.add("cta-primary")
// }));


// document.querySelector("input[name='period']").addEventListener("input", (function (e) {
//     var t = e.target.value.replace(/[^0-9.]/g, "");
//     if (t && e.target.value > 0) {
//         generateYearLabels();
//         // removeError(e.target);
//         var a = (t + "").split(".")[1],
//             r = (t + "").split(".")[0]; +
//                 r[0] < 3 && r.length > 2 ? r = r.substring(0, 2) : +r[0] >= 5 && r.length > 1 && (r = r[1] == 0 ? r.substring(0, 2) : r.substring(0, 1));
//                 //+r >= 5 ? (domElem.engagementTip.classList.add("hide"),
//                 //    domElem.resultBlock.classList.add("hide-post-tax")) : (domElem.engagementTip.classList.remove("hide"),
//                 //    domElem.resultBlock.classList.remove("hide-post-tax")),
//                 if(t + "".indexOf(".") > 0 ){
//                     t = +(r + (a ? "." + a : ".0"));
//                     a[0] = '0';
//                 } else {
//                     t = +r;
//                 }
//                 value = a ? t.toFixed(1) : t,
//                 tenure = a ? t.toFixed(1) : t;
//                 $(e.target).val(value);
//                 $(e.target).attr('data-value', value);
//         // domElem.yearProp.style.left = 10 + 12 * value.length + "px",
//             t ? updateOutput() : (outputContainer.classList.add("overlay"),
//                 calculateBtn.classList.add("cta-primary"));
//     } else
//         outputContainer.classList.add("overlay"),
//             calculateBtn.classList.add("cta-primary")
// }));

// document.querySelectorAll("input[type='number'], input[name='strategy']").forEach((function (e) {
//     e.addEventListener("blur", (function (t) {
//         console.log("blur", e.value)
//         "strategy" == e.name ? e.value || (e.value = 0, interest = 0,
//             domElem.percentageProp.style.left = 10 + 10 * t.target.value.length + "px") : "period" == e.name && (e.value ? +e.value <= 0 && showError(e, "Please enter valid period") : showError(e, "This field is required")),
//             updateOutput()
//     }))
// }))

function reset() {
    additionalAmount = 0;
    additionalYear = 0;
    principal = +domElem.amountElem.dataset.value.replace(/[^0-9]/g, "");
    tenure = domElem.TimePeriod.value;
    let elemType = $('input[name="strategy"]').attr('type');
    if(elemType == "number") {
        interest = domElem.interestElem.dataset.value;
    }
    $(".amount-values li").removeClass("active");
    $(".amount-values li").first().addClass("active");
    $('#show_earn_more_parent').removeClass('hidden');
    $('#earn_more').addClass('hidden');
    updateOutput()
}
document.querySelector("#reset").addEventListener("click", (function (e) {
    reset();
    trackCustomGa4Event('CTA click', { click_text: "Reset Icon"});
}));


function DrawChart() {
    //allInputvalid() &&
    if (type == 'investmentDetails') {
        updateChart()

    } else {
        updateGoalChart();
    }


}

function updateGoalChart() {
    var e;
    outputContainer && (outputContainer.classList.remove("overlay"),
        calculateBtn.classList.remove("cta-primary")),
        chart && chart.destroy && chart.destroy();
    var interestEarn = principal - compoundAmount;
    var t = document.getElementById("myChart").getContext("2d");
    chart = new Chart(t, {
        type: "doughnut",
        data: {
            labels: ["Interest earned", "Total Invested"],
            datasets: [{
                backgroundColor: ["#6880C8", "#DDDDDD"],
                data: [interestEarn, compoundAmount],
                hoverBackgroundColor: ["#6880C8", "#DDDDDD"],
                weight: .5
            }]
        },
        options: {
            segmentShowStroke: !1,
            aspectRatio: 2,
            responsive: !0,
            legend: {
                display: !1,
                position: "bottom",
                labels: {
                    boxWidth: 6
                },
                usePointStyle: !0
            }
        }
    });
    domElem.rightLabel.classList.remove("hide"),
        domElem.leftLabel.classList.remove("hide");

}

function updateChart() {
    var e;
    domElem.rightLabel.classList.add("hide"),
        domElem.leftLabel.classList.add("hide");

    outputContainer && (outputContainer.classList.remove("overlay"),
        calculateBtn.classList.remove("cta-primary")),
        chart && chart.destroy && chart.destroy();
    let genLabels = [];
    for (let index = 0; index < tenure; index++) {
        genLabels.push((index + 1) + 'Y')

    }
    let labels = genLabels; //getGraphLabels() || ['1Y', '2Y', '3Y', '4Y', '5Y']; //[1,2, 3, 4, 5];
    let n = 1;
    let interestArray = [];
    let principalArray = []
    let r = parseFloat(interest) / 100;
    for (let tenr of labels) {
        tenr = tenr.replace(/[^0-9.]/g, "");
        principalArray.push(principal);
        let cmpndAmount = principal * (Math.pow((1 + (r / n)), (n * tenr)));
        let cmpndInterest = cmpndAmount - principal;
        interestArray.push(cmpndInterest.toFixed());
    }
    //NEW IMPL
    var t = document.getElementById("myChart").getContext("2d")
    var ci = compoundAmount;
    ci && (e = (e = Math.round(ci / 3) + "")[0] * Math.pow(10, e.length - 1));
    console.log("e", e)
    const data = {
        labels: genLabels, //getGraphLabels() || ['1Y', '2Y', '3Y', '4Y', '5Y'],
        datasets: [{
            label: 'Total invested',
            data: principalArray,
            backgroundColor: '#DDDDDD' //#F4F7FF'
        },
        {
            label: 'Gains',
            data: interestArray,
            backgroundColor: '#6880C8'
        }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            legend: {
                display: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
            },
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function (tooltipItems, data) {
                        let lbl = parseInt(tooltipItems.yLabel) == principal ? 'Total invested: ' : 'Gains: ';
                        return lbl + '₹' + commaSeparatorCurrency(tooltipItems.yLabel);
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    right: 35,
                    top: 30
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        stepSize: e || 5e3,
                        callback: function (e, t, a) {
                            return convertToLacsAndCrores(e, !0)
                        }
                    }
                }]
            },
            animation: {
                // duration: 1,
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'bottom';
                    var dcount = this.data.datasets.length;
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        if (dcount == i + 1) {
                            meta.data.forEach(function (bar, index) {
                                if (dataset.data[index] > 0 && meta.data.length == index + 1) {
                                    // var data = dataset.data[index];
                                    var data = '₹' + convertToLacsAndCrores(Math.ceil(calculateMaturityAmount()));
                                    ctx.font = "bold 14px 'proxima-nova-bold'";
                                    ctx.fillStyle = "#4c4c4c";
                                    data = data.replace(/acs/g, '').replace(/Crs/g, 'Cr');
                                    ctx.fillText(data, bar._model.x, bar._model.y - 10);
                                }
                            });
                        }
                    });
                }
            }
        }
    };
    chart = new Chart(t, config);
}
