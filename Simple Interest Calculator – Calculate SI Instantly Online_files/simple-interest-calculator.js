window.addEventListener("load", windowLoadCallback);
var chart, interest, period, domElem = {},
    selectedTaxSlab = 10,
    selectedTenure = 1,
    selectedPeriod = "Yearly",
    principal = 5e5,
    compoundAmount = 1000000,
    compoundInterest = 500000,
    investmentType = "One-time",
    isInflation = false,
    inflationRate = 4;

function windowLoadCallback() {
    domElem = {
            amountElem: document.querySelector('input[name="amount"]'),
            interestElem: document.querySelector('input[name="interest"]'),
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
            engagementTip: document.querySelector(".helping-info .main")
        },
        setAllSliders(),
        DrawChart(),
        document.getElementById("calculate").addEventListener("click", (function(e) {
            allInputvalid() && (domElem.InterestGain.setAttribute("data-prevalue", Math.round(compoundInterest / 3)),
                    domElem.maturityAmount.setAttribute("data-prevalue", Math.round(compoundAmount / 3)),
                    updateOutput(),
                    window.outerWidth < 991 && $("html, body").animate({
                        scrollTop: $(".calculation-result").offset().top - 60
                    }, 500)),

                trackCustomGa4Event('CTA click', { click_text: this.innerText });
        }));

    $('.calci-radio-btn-inflation').click(function(e) {
        if (this.previous) {
            this.checked = false;
        }
        this.previous = this.checked;
        if (this.checked) {
            isInflation = true;
            //document.querySelector(".inflation-box").classList.remove("hide");
            $('.inflation-box').removeClass('hide');
        } else {
            isInflation = false;
            // document.querySelector(".inflation-box").classList.add("hide");
            $('.inflation-box').addClass('hide');

        }
        updateOutput();
    });

    $('#invest_nps').on('click', function(e) {
      trackCustomGa4Event('CTA click', { click_text: e.target.innerText, click_link: e.target.href });
    });
}

function DrawChart() {
    period = +domElem.TimePeriod.value, interest = +domElem.interestElem.value;
    updateChart();
}

function updateChart() {
    var e;
    outputContainer && (outputContainer.classList.remove("overlay"),
            calculateBtn.classList.remove("cta-primary")),
        chart && chart.destroy && chart.destroy();
    var t = document.getElementById("myChart").getContext("2d"),
        a = getGraphLabels() || ["0yr", "1yr", "2yr", "3yr", "4yr", "5yr"],
        r = +domElem.amountElem.dataset.value.replace(/[^0-9]/g, ""),
        o = {
            labels: a,
            datasets: [{
                label: "Total amount invested",
                fill: !0,
                borderColor: "#6880C8",
                backgroundColor: "#EEEDE8",
                pointBackgroundColor: "#6880C8",
                data: a.map((function(e) {
                    if (investmentType == 'Monthly') {
                        let t = e.replace(/[^0-9]/g, "");
                        let val = t == 0 ? r : (t * 12) * r;
                        return val;
                    } else {
                        return r
                    }
                }))
            }, {
                label: "Amount after maturity",
                fill: !0,
                borderColor: "#FC8400",
                backgroundColor: "#FFDFBC",
                pointBackgroundColor: "#FC8400",
                data: a.map((function(e) {
                    return calculateMaturityAmount(parseFloat(e))
                }))
            }]
        },
        n = compoundInterest;
    n && (e = (e = Math.round(n / 3) + "")[0] * Math.pow(10, e.length - 1)),

        chart = new Chart(t, {
            type: "line",
            data: o,
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
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 6,
                            stepSize: e || 5e3,
                            callback: function(e, t, a) {
                                // console.log("Y", e, t, a)
                                return convertToLacsAndCrores(e, !0)
                            },
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: !1
                        }
                    }]
                }
            }
        }),
        setTimeout((function() {
            domElem.graphBody.classList.remove("img-loader")
        }), 200)
}

function calculateRDMaturityAmount(e) {
    for (var t = 0, a = +domElem.amountElem.dataset.value.replace(/[^0-9]/g, ""), r = a, o = interest, n = 1; n <= e; n++)
        r = (t = r * Math.pow(1 + o / 100 * 1, 1 * n)) + a;
    return t
}

function calculateMaturityAmount(e) {

    principal = +domElem.amountElem.dataset.value.replace(/[^0-9]/g, "");
    var t, a, r = interest;
    // domElem.seniorCitizen.checked ? (r = +r + .25,
    //     domElem.extraInterest.classList.remove("hide"),
    //     domElem.extraInterestProp.classList.remove("hide")) : (domElem.extraInterest.classList.add("hide"),
    //     domElem.extraInterestProp.classList.add("hide"));
    var o = selectedTenure;

    /*
    return null == e ? e = +domElem.TimePeriod.value : 0 == parseInt(domElem.TimePeriod.value) && (e /= 12),
        t = ((a = (principal * Math.pow(1 + r / (100 * o), o * e)).toFixed()) - principal).toFixed(),
        //domElem.postTax.checked && selectedTaxSlab && (a = principal + (t *= 1 - selectedTaxSlab / 100)),
        a*/
    let intr = interest / 100;
    let tenure = e != undefined ? e : parseInt(domElem.TimePeriod.value)
    let M = 0;
    let P = principal;
    if (investmentType == 'Monthly') {
        P = principal * (tenure * 12);
    }

    if (isInflation) {
        intr = ((1 + (interest / 100)) / (1 + (parseInt(inflationRate) / 100)) - 1) * 100;
        intr = intr / 100;
    }
    // console.log(e, "investmentType", investmentType, tenure)
    if (e == 0) {
        M = P;
    } else {
        M = P * (1 + (intr * tenure))
    }
    return M;

}

function updateOutput(e) {
    allInputvalid() && (principal = +domElem.amountElem.dataset.value.replace(/[^0-9]/g, ""),
    period = +domElem.TimePeriod.value, interest = +domElem.interestElem.value,
        compoundAmount = calculateMaturityAmount(),
        totalprincipal = (investmentType == "Monthly")? principal*period*12 : principal,
        compoundInterest = (compoundAmount - totalprincipal).toFixed(),
        domElem.invesdtedAmount.innerText = investmentType == 'Monthly' ? convertToLacsAndCrores(principal * (parseInt(domElem.TimePeriod.value) * 12)) : convertToLacsAndCrores(principal),
        DrawChart(),
        "function" == typeof animateOutput ? (domElem.InterestGain.setAttribute("data-value", compoundInterest),
            domElem.InterestGain.classList.add("count"),
            domElem.maturityAmount.setAttribute("data-value", compoundAmount),
            domElem.maturityAmount.classList.add("count"),
            animateOutput(300)) : (domElem.InterestGain.innerText = convertToLacsAndCrores(compoundInterest),
            domElem.maturityAmount.innerText = convertToLacsAndCrores(compoundAmount)))
}

function updateResult(){
    updateOutput();
}

function getGraphLabels() {
    var e = parseInt(domElem.TimePeriod.value),
        t = +domElem.TimePeriod.value,
        a = [];
    if (e >= 6) {
        for (var r = e % 2 == 0 ? 0 : 1; r <= e; r += 2)
            a.push(r + "yr");
        t != e && a.push(t + "yr")
    } else if (e) {
        for (r = 0; r <= e; r += 1)
            a.push(r + "yr");
        t != e && a.push(t + "yr")
    } else {
        for (var o = parseInt(12 * domElem.TimePeriod.value), n = 0; n <= o; n += 3)
            n ? a.push(n + " mo") : a.push(n);
        o % 3 != 0 && a.push(o + " mo")
    }
    return a
}
document.querySelectorAll(".inflation-values li").forEach((function(e) {
        e.addEventListener("click", (function(e) {
            inflationRate = e.target.innerText.replace(/[^0-9]/g, "");
            document.querySelector(".inflation-values li.active").classList.remove("active");
            e.target.classList.add("active");
            updateOutput();
        }));
    })),
    // document.querySelectorAll(".interest-tenure li").forEach((function(e) {
    //     e.addEventListener("click", (function(e) {
    //         selectedPeriod != e.target.innerText && (selectedPeriod = e.target.innerText,
    //             document.querySelector(".interest-tenure li.active").classList.remove("active"),
    //             e.currentTarget.classList.add("active"),
    //             selectedTenure = "Yearly" == selectedPeriod ? 1 : "Quarterly" == selectedPeriod ? 4 : 12,
    //             updateOutput(!0),
    //             customGaEvents("Calc-widget_Calculator Page", "Click - Toggle", e.target.innerText + " - " + pageName))
    //     }))
    // })),

    document.querySelectorAll(".investment-type-control li").forEach((function(e) {
        e.addEventListener("click", (function(e) {
            investmentType = e.target.innerText;
            $('.investment-type-control li.active').removeClass('active');
            e.currentTarget.classList.add("active");

            let rangeELem = $('#nps-invest-silder');
            $('input[name="amount"]').val("5,00,000");
            $('input[name="amount"]').attr('data-value', "500000");
            $(rangeELem).val('500000');

            if (investmentType == 'Monthly') {
                $("input[name='period']").val(5)
                $('.input-prop.year').css({
                    left: "22px"
                });
                $(rangeELem).attr('data-max', '10000000');
                $(rangeELem).attr('max', '10000000');

            } else {
                $("input[name='period']").val(10);
                $('.input-prop.year').css({
                    left: "34px"
                });
                $(rangeELem).attr('data-max', '100000000');
                $(rangeELem).attr('max', '100000000');
            }

            updateOutput(!0);

            function updateSliderEffect(ele){
              let amoutInputVal = $('input[name="amount"]').attr('data-value');
              let maxRangeVal = $(rangeELem).attr('max');
              let sliderFilledArea = amoutInputVal/maxRangeVal;

              $(ele).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + sliderFilledArea + ', #00B852), '
                + 'color-stop(' + sliderFilledArea + ', #eaeaea)'
                + ')'
              );
            }

            updateSliderEffect(rangeELem);

            let investmentIntervalValue = $(this).children('span').text();
            trackCustomGa4Event('time capsule click', { click_text: investmentIntervalValue });
        }))
    }));
    // document.querySelector("input[name='interest']").addEventListener("input", (function(e) {
    //     var t = e.target.value.replace(/[^0-9.]/g, "");
    //     let update = false;
    //     if (t && e.target.value > 0) {
    //         var decPart = (t + "").split(".")[1];
    //         var intPart = (t + "").split(".")[0];
    //         if(intPart.length > 2) {
    //             intPart = intPart.substring(0, 2);
    //             update=true;
    //         } else if(+intPart > 30 && (+intPart[0] > 3 || +intPart[1] > 0)){
    //             intPart = intPart.substring(0, 1);
    //             update=true;
    //         }
    //         t = +(intPart + (decPart ? "." + decPart : ""));
    //         val = decPart ? (+decPart[1] ? t.toFixed(2) : t.toFixed(1)) : t;
    //         update? e.target.value = val : null;
    //         domElem.percentageProp.style.left = 10 + 10 * val.length + "px",
    //         updateOutput()
    //     } else
    //         domElem.percentageProp.style.left = 10 + 10 * e.target.value.length + "px",
    //         outputContainer.classList.add("overlay"),
    //         calculateBtn.classList.add("cta-primary")
    // })),
    // document.querySelector("input[name='period']").addEventListener("input", (function(e) {
    //     var t = e.target.value.replace(/[^0-9.]/g, "");
    //     if (t) {
    //         removeError(e.target);
    //         var a = (t + "").split(".")[1],
    //             r = (t + "").split(".")[0]; +
    //         //r[0] < 2 && r.length > 2 ? r = r.substr(0, 2) : +r[0] >= 2 && r.length > 1 && (r = r.substr(0, 1)),
    //         r[0] < 5 && r.length > 2 ? r = r.substr(0, 2) : +r[0] >= 5 && r.length > 1 && (r = r[1] == 0 ? r.substr(0, 2) : r.substr(0, 1)),
    //             // +r >= 5 ? (domElem.engagementTip.classList.add("hide"),
    //             //     domElem.resultBlock.classList.add("hide-post-tax")) : (domElem.engagementTip.classList.remove("hide"),
    //             //     domElem.resultBlock.classList.remove("hide-post-tax")),
    //             t = +(r + (a ? "." + a : "")),
    //             e.target.value = a ? t.toFixed(1) : t,
    //             domElem.yearProp.style.left = 10 + 12 * e.target.value.length + "px",
    //             t ? updateOutput() : (outputContainer.classList.add("overlay"),
    //                 calculateBtn.classList.add("cta-primary"))
    //     } else
    //         outputContainer.classList.add("overlay"),
    //         calculateBtn.classList.add("cta-primary")
    // })),
    // document.querySelectorAll("input[type='number']").forEach((function(e) {
    //     e.addEventListener("blur", (function(t) {
    //         "interest" == e.name ? e.value || (e.value = 0,
    //                 domElem.percentageProp.style.left = 10 + 10 * t.target.value.length + "px") : "period" == e.name && (e.value ? +e.value <= 0 && showError(e, "Please enter valid period") : showError(e, "This field is required")),
    //             updateOutput()
    //     }))
    // }))
