import * as React from "react";
import { Carousel } from "antd-mobile";

interface SwiperList {
  id: number
  path: string
}

export interface ISwiperProps {
  datalist: SwiperList[]
}

export interface ISwiperState {
  slideIndex?: number;
  imgHeight: number | string;
}

export default class Swiper extends React.Component<ISwiperProps, ISwiperState> {
  public state: Readonly<ISwiperState> = {
    imgHeight: 176,
    slideIndex: 0
  }
  public render() {
    return (
      <div>
        <Carousel
          autoplay={true}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.props.datalist.map(val => (
            <a
              key={val.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.path}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      {/* </WingBlank> */}
      </div>
    );
  }
}
