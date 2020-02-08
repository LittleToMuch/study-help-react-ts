import * as React from "react";
import { WingBlank, Carousel } from "antd-mobile";

export interface ISwiperProps {
  
}

export interface ISwiperState {
  slideIndex?: number;
  datalist: any[];
  imgHeight: number | string;
}

export default class Swiper extends React.Component<ISwiperProps, ISwiperState> {
  public state: Readonly<ISwiperState> = {
    datalist: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 0
  }
  public render() {
    return (
      <div>
        <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.datalist.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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
      </WingBlank>
      </div>
    );
  }
}
