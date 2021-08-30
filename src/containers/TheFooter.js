import React from 'react';
import Grid from '@material-ui/core/Grid';

import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import './footer.css';

const TheFooter = () => {
  return (
    <div>
      <footer className="footer-section">
        <div className="containerFooter">

          <Grid container spacing={1} className="single-ctaContain">
            <Grid item xs={12} sm={4}>
              <div className="single-cta">
                <div className="cta-text">
                  <h6>آدرس شرکت</h6>
                  <span>مشهد ،قرنی 16 ،اکبری 26/4 ،پلاک 3</span>
                </div>
                <PlaceOutlinedIcon fontSize="large" className="fatag" />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="single-cta">
                <div className="cta-text">
                  <h6>تلفن تماس</h6>
                  <span>09038640182</span>
                </div>
                <CallOutlinedIcon fontSize="large" className="fatag" />
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="single-cta">
                <div className="cta-text">
                  <h6>ایمیل شرکت</h6>
                  <span>maoyedpour.m@gmail.com</span>
                </div>
                <MailOutlineIcon fontSize="large" className="fatag" />
              </div>
            </Grid>
          </Grid>


          <div className="mainLink">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <div>
                  <div className="paperMain">
                    <span className="titlePaper">ارغوانی</span>
                    <div className="footer-widget">
                      <ul>
                        <li><span className="detailsPaper">خرید مطمئن و آسان از ارغوانی</span></li>
                        <li><span className="detailsPaper">تحویل سریع کالا به مشتریان</span></li>
                        <li><span className="detailsPaper">اطمینان از رضایت مشتریان ملاک اول ماست</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} sm={4}>
                <div className="paperMain">
                  <span className="titlePaper">خدمات مشتریان</span>
                  <div className="footer-widget">
                    <ul>
                      <li><a href="/">پاسخ به پرسش های متداول</a></li>
                      <li><a href="/">رویه های بازگرداندن کالا</a></li>
                      <li><a href="/">حریم خصوصی</a></li>
                      <li><a href="/">گزارش باگ</a></li>
                    </ul>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} sm={4}>
                <div className="paperMain">
                  <span className="titlePaper">راهنمای خرید</span>
                  <div className="footer-widget">
                    <ul>
                      <li><a href="/">نحوه ی ثبت نام</a></li>
                      <li><a href="/">نحوه ی ثبت سفارش</a></li>
                      <li><a href="/">رویه ارسال سفارش</a></li>
                      <li><a href="/">شیوه پرداخت</a></li>
                    </ul>
                  </div>
                </div>
              </Grid>

            </Grid>
          </div>

        </div>

        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 text-center text-lg-center">
                <div className="copyright-text">
                  <p>سال ۲۰۲۰، تمامی حقوق متعلق به فروشگاه اینترنتی ارغوانی می‌باشد &copy;</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  )
}

export default React.memo(TheFooter)
