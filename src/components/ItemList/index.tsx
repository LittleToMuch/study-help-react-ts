import React, { memo, useCallback, useState } from "react";
import { List, WingBlank, Button } from "antd-mobile";
import { timestampToTime } from "../../utils/utils";
import style from "./index.module.scss";
import Axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Spin } from "antd";

export interface IItemListProps extends RouteComponentProps {
  id: number;
  title: string;
  content: string;
  createDate: string;
  category: string;
  pic: string;
  experienceid?: number
  learningstrategyid?: number
  userid?: number;
  hasDel?: boolean;
  delApi?: string;
  detailUrl?: string;
  update?: (id: number) => void;
}

const Item = List.Item;
const Brief = Item.Brief;

function ItemList(props: IItemListProps) {
  const { id, title, content, createDate, category, pic } = props;
  const time = timestampToTime(createDate).split(" ")[0];

  const [loading, setLoading] = useState<boolean>(true)

  const detailClick = useCallback(async () => {
    props.detailUrl && props.history.push(`${props.detailUrl}/${id}`);
  }, [id, props.detailUrl, props.history]);

  const delClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (props.delApi) {
        const res = await Axios.delete(props.delApi, {
          params: { id: props.id }
        });
        const { code } = res.data;
        code === 200 && props.update!(id);
      }
    },
    [id, props.delApi, props.id, props.update]
  );

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [loading])

  return (
    <div>
      <Item onClick={detailClick} platform="android" className={style.item}>
        <div className={style.pic}>
          <Spin spinning={loading} size="small">
            <img className={style.img} src={`${process.env.REACT_APP_LOCALHOST}/${pic}`} onLoad={handleLoad} alt="" />
          </Spin>
        </div>
        <span className={style.title}>{title}</span>
        <span className={style.category}>{category}</span>
        <Brief className={style.brief}>
          <span className={style.content}>{content}</span>
          <span className={style.createTime}>{time}</span>
          {props.hasDel ? (
            <Button
              type="warning"
              size="small"
              onClick={delClick}
              className={style.del}
            >
              删除
            </Button>
          ) : null}
        </Brief>
      </Item>
    </div>
  );
}

export default withRouter(ItemList);
