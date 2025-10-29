function loadInvestmentModal(e){var n=document.createElement("style"),n=(n.appendChild(document.createTextNode(`
  .investment-ready-model{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 105;
    display: none;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
  }
  .investment-ready-model.in {
      display: flex !important;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,.8);
  }
  .investment-modal-content {
      position: relative;
      background-color: var(--white-color);
      background-clip: padding-box;
      border-radius: 8px;
      -webkit-box-shadow: 0 3px 9px rgba(0,0,0,.5);
      box-shadow: 0 3px 9px rgba(0,0,0,.5);
      outline: 0;
      width: 100%;
  }
  .close-button {
      position: absolute;
      right: 16px;
      top: 16px;
  }
  .close-button button {
      background: initial;
      opacity: 1 !important;
  }
  .investment-ready-wrapper-box {
      text-align: center;
      padding: 48px 24px 27px;
  }
  .investment-ready-wrapper-box h2 {
      color: var(--black90);
      font-family: 'cabinet-grotesk-bold';
      font-size: 22px;
      line-height: 26px;
      margin-bottom: 12px;
  }
  .investment-ready-wrapper-box p {
      color: var(--black90);
      font-size: 16px;
      line-height: 24px;
  }
  .investment-ready-img-box {
      padding: 44px 0 35px;
  }
  .investment-ready-button button {
      font-size: 16px;
      line-height: 24px;
      height: 48px;
      font-family: proxima-nova-semibold;
      background-color: var(--primary-green);
      color: var(--white-color);
      width: 100%;
  }
  .investment-ready-button button:hover {
      background-color: var(--hover-primary-green);
  }
  .body-overflow {
      overflow: hidden;
  }
  .modalWrapperDesktop {
      font-style: normal;
      background: "#FFFFFF";
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      border-radius: 8px;
      padding: 40px 57px 40px 40px;
  }
  .modalInnerWrapperDesktop {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      gap: 40px;
    }
    .leftColModal {
      max-width: 445px;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      text-align: left;
      flex-shrink: 3;
    }
    .download-app-modal-heading {
      font-family: cabinet-grotesk-extrabold;
      font-style: normal;
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      color: #222222;
      margin-top: 8px;
    }
    .desktopDescription {
      font=family: proxima-nova-regular;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #666666;
      margin-top: 20px;
    }
    .rightColModal {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .offerText {
      font-family: proxima-nova-semibold;
      color: #00B852;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
    }
  `)),document.getElementsByTagName("head")[0].appendChild(n),`
  <div id="investmentModal" class="investment-ready-model in">
      <div class="investment-modal-dialog">
          <div class="investment-modal-content" id="investment_wrapper_area">
              <div class="close-button">
                  <button type="button" class="close">
                      <img src="https://img.smartspends.com/static/images/dashboard/close_icon_dark.svg" alt="close">
                  </button>
              </div>
              <div class="modalWrapperDesktop investment-ready-modal-body">
                  <div class="offerText">${e.modalHeading}
                  </div>
                  <div class="modalInnerWrapperDesktop">
                      <div class="leftColModal">
                          <div class="download-app-modal-heading">
                              Scan the QR Code to Download the ET Money App
                          </div>
                          <div class="desktopDescription">
                            ${e.modalDescription}
                          </div>
                      </div>
                      <div class="rightColModal">
                          <img
                              width="200"
                              height="200"
                              src=${e.qrLink}
                              alt="ET Money one link"
                              class="one-link-img"
                          />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  `);document.body.insertAdjacentHTML("afterbegin",n),document.addEventListener("click",function(e){var n,o;e.target.closest("#investmentModal")&&(n=document.querySelector(".investment-ready-model"),o=document.querySelector(".investment-modal-content"),n)&&n.classList.contains("in")&&!o.contains(e.target)&&(n.classList.remove("in"),document.body.classList.remove("body-overflow")),e.target.closest("#investmentModal .close")&&(document.querySelector(".investment-ready-model").classList.remove("in"),document.body.classList.remove("body-overflow"))})}function updateModalTheme(e){e=`<div class="investment-modal-dialog">
          <div class="investment-modal-content" id="investment_wrapper_area">
              <div class="close-button">
                  <button type="button" class="close">
                      <img src="https://img.smartspends.com/static/images/dashboard/close_icon_dark.svg" alt="close">
                  </button>
              </div>
              <div class="modalWrapperDesktop investment-ready-modal-body">
                  <div class="offerText">${e.modalHeading}
                  </div>
                  <div class="modalInnerWrapperDesktop">
                      <div class="leftColModal">
                          <div class="download-app-modal-heading">
                              Scan the QR Code to Download the ET Money App
                          </div>
                          <div class="desktopDescription">
                            ${e.modalDescription}
                          </div>
                      </div>
                      <div class="rightColModal">
                          <img
                              width="200"
                              height="200"
                              src=${e.qrLink}
                              alt="ET Money one link"
                              class="one-link-img"
                          />
                      </div>
                  </div>
              </div>
          </div>
      </div>`;document.getElementById("investmentModal").innerHTML=e}function isMobileDevice(){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))return!0}function openDownloadAppModal(e){var n;isMobileDevice()||"undefined"!=typeof isApp&&isApp?window.open((e||QR_THEME.DEFAULT).oneLink,"_self"):(n=document.getElementById("investmentModal"))?(updateModalTheme(e||QR_THEME.DEFAULT),n.classList.add("in")):loadInvestmentModal(e||QR_THEME.DEFAULT)}window.QR_THEME={DEFAULT:{modalHeading:"Unlock all financial products with one account on app",modalDescription:"Say goodbye to spending time & effort opening an account every time you want to invest in a financial product on the ET Money App.",qrLink:"https://img.smartspends.com/static/images/store-icon/etmoney-onelink.svg",oneLink:"https://etmoney.onelink.me/unJQ/e745c27e?af_qr=true"},SCHEME_PAGE:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/schemPageDownloadAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/c6vuoyjd?af_qr=true"},GENIUS_PORTFOLIO:{modalHeading:"Unlock personalised investing plan, made to achieve your goals",modalDescription:"Successful investors don't chase returns alone. Instead, they follow a unique plan with relentless discipline. Genius brings together their timeless wisdom packed into powerful investing strategies to deliver a hyper personalized investment experience for you.",qrLink:"https://img.smartspends.com/static/images/qr-code/geniusPortfoliosDownloadAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/m27k70nt?af_qr=true"},AMC_RETURN_CALCULATOR:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/amcCalcPageDownloadAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/zxfo95n4?af_qr=true"},SUB_CATEGORY:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/subCatgeoryPageDownloadAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/ydbcqunt?af_qr=true"},GET_STARTED:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/getStartedMFPageDownloadAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/77ydt19h?af_qr=true"},NPS:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"By downloading the ET Money app you will get options of not just investing in NPS, but also multiple other products. All catered towards achieving your financial goals!",qrLink:"https://img.smartspends.com/static/images/qr-code/npsPageDownloadAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/y53wmrvi"},NPS_FUND_MANAGER:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"By downloading the ET Money app you will get options of not just investing in NPS, but also multiple other products. All catered towards achieving your financial goals!",qrLink:"https://img.smartspends.com/static/images/qr-code/npsFundManagerAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/uwe92dr8"},FD:{modalHeading:"Unlock all financial products with one account on app",modalDescription:"By downloading the ET Money app you will get options of not just investing in Bajaj's fixed deposit, but also multiple other products. All catered towards achieving your financial goals!",qrLink:"https://img.smartspends.com/static/images/qr-code/fdPageDownloadAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/yvg484r5?af_qr=true"},TAX_SAVING:{modalHeading:"Unlock all financial products with one account on app",modalDescription:"Say goodbye to spending time & effort opening an account every time you want to invest in a financial product on the ET Money App.",qrLink:"https://img.smartspends.com/static/images/qr-code/taxSavingAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/s3mv42ku"},FEATURED_LISTING:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/featuredListingAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/r3ymcgyp"},EXPLORE:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/exploreAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/kfvtrsvm"},ALL_MF_LISTING:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/allMfListingAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/9w1zilmq"},MF_HOME:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/mfHomeAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/vpqylfg0"},MF_FILTER:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/mfFilterAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/7b8noiro"},EQUITY:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/equityAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/81ypldoq"},DEBT:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/debtAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/77382muq"},HYBRID:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/hybridAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/fgcvfwuq"},NFO_HOME:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/nfoHomeAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/ey6v2eib"},NFO_DETAIL:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/nfoDetailAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/cmf93wzb"},MF_COMPARE:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/mfCompareAppQRCode.svg",oneLink:"https://etmoney.onelink.me/unJQ/b1r2x043"},LUMPSUM_CALCULATOR:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/lumpsumcal_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/lumpsumcalqr"},CAGR_CALCULATOR:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/cagrcal_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/cagrcal"},SIP_CALCULATOR:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/sipcal_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/sipcalqr"},MF_CALCULATOR:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/mfcal_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/mfcalqr"},AMC_SIP_CALCULATOR:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/amcsip_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/amccalqr"},ELSS_CALCULATOR:{modalHeading:"Unlock investing in 5000+ mutual funds through ET Money",modalDescription:"Unlock access to over 5,000 mutual funds, allowing you to explore a wide range of investment options. The best part? You can invest in these funds absolutely free, with no hidden charges!",qrLink:"https://img.smartspends.com/static/images/qr-code/elss_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/elsscalqr"},RISK_PROFILE:{modalHeading:"Find out what your investor personality is!",modalDescription:"Successful investors don't chase returns alone. Instead, they follow a unique plan with relentless discipline. Genius brings together their timeless wisdom packed into powerful investing strategies to deliver a hyper personalised investment experience for you.",qrLink:"https://img.smartspends.com/static/images/qr-code/risk_profile_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/riskprofiledqr"},UPSWING_FD_PARTNERS:{modalHeading:"Unlock all financial products with one account on app",modalDescription:"Download the ET Money app to invest not only in Fixed Deposits but also in a wide range of financial products - all catered towards achieving your financial goals!",qrLink:"https://img.smartspends.com/static/images/etmoneyweb/fixed-deposit/fd-upswing-qr-code.svg",oneLink:"https://etmoney.onelink.me/unJQ/an1w2piz"},LAMF:{modalHeading:"Unlock your loan instantly with the ET Money app",modalDescription:"No more delays - get funds against your mutual funds in minutes, anytime you need them.",qrLink:"https://img.smartspends.com/static/images/qr-code/lamf_qr_code.svg",oneLink:"https://etmoney.onelink.me/unJQ/8xjbhkjx"}};