import React, { useEffect, useState } from 'react';
import { getMainPage } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from '../../urlConfig';
import Layout from '../../containers/TheLayout';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './style.css'

const Dashboard = () => {
  const mains = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [swip, setSwip] = useState([]);
  const [swipOne, setSwipOne] = useState([]);
  const [swipTwo, setSwipTwo] = useState([]);


  useEffect(() => {
    dispatch(getMainPage());
  }, [dispatch]);
  useEffect(() => {
    setSwip(mains.swiperPigs);
    setSwipOne(mains.swiperPigs[0]);
    setSwipTwo(mains.swiperPigs[1]);
  }, [mains.swiperPigs])


  const renderSlidesOne = (swipe) =>
    swipe.map((swipItem, index) => (
      <img key={index} src={generatePublicUrl(swipItem.img)} className="imageOneStyle" alt="" />
    ));

  const renderSlidesTwo = (swipe) =>
    swipe.map((swipItem, index) => (
      <img key={index} src={generatePublicUrl(swipItem.img)} className="imageTwoStyle" alt="" />
    ));

  return (
    <Layout>
      <div className="contain">
        {swip.length > 0 ?
          <div className="imageFiveContainer">
            <Carousel showArrows={true} showThumbs={false}>
              {renderSlidesOne(swipOne.swiperPictures)}
            </Carousel>
          </div>
          : null
        }

        <div className="gridDiv">
          <div className="gridDivTxt">      
            <div className="centerTxt">
              <p>
              نون‌بَر مفتخر است که با راه اندازی سایت و اپلیکیشن سفارش آنلاین نان ، کاربران میتوانند نان مدنظر خود را از بین انواع نان‌ با کیفیت و تازه عرضه شده، انتخاب کرده و در آدرس ثبت شده تحویل بگیرند
              </p>
              <p>
              ما ادعای تحویل نان گرم نداریم ولی متعهدیم که نان تازه به شما تحویل دهیم
              </p>
            </div>
          </div>
        </div>
      </div>

      {swip.length > 0 ?
        <div className="imageTwoContainer">
          {renderSlidesTwo(swipTwo.swiperPictures)}
        </div>
        : null
      }
    </Layout>
  )
}

export default Dashboard
