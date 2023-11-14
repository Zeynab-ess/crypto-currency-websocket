import React from "react";
import { Pagination } from "react-bootstrap";

const pagination = (currentPage, totalPage) => {
  let delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= totalPage; i++) {
    if (i == 1 || i == totalPage || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export default (props) => {
  if (props.count < 2) return <div />;

  let totalPageCount = Math.floor(props.count / props.take);

  if (props.count % props.take > 0) totalPageCount++;

  let pages = pagination(props.currentPage, totalPageCount);

  if (pages.length < 2) return <div />;

  let markup = pages.map((pageNum, i) => {
    return (
      <Pagination.Item
        key={i}
        className={
          pageNum === "..."
            ? ""
            : props.currentPage === pageNum
            ? "active"
            : ""
        }
        onClick={(e) => {
          if (pageNum === "..." || +pageNum === +props.currentPage)
            e.preventDefault();
          else props.onClick(e, pageNum, (pageNum - 1) * props.take);
        }}
      >
        {pageNum}
      </Pagination.Item>
    );
  });

  markup.unshift(
    <Pagination.Item
      key={-1}
      disabled={props.currentPage > 1 ? false : true}
      onClick={(e) =>
        props.onClick(
          e,
          props.currentPage - 1,
          (props.currentPage - 2) * props.take
        )
      }
    >
      <i className="fa fa-angle-left" aria-hidden="true"></i>
    </Pagination.Item>
  );

  markup.push(
    <Pagination.Item
      key={totalPageCount + 1}
      disabled={props.currentPage != totalPageCount ? false : true}
      onClick={(e) =>
        props.onClick(e, props.currentPage + 1, props.currentPage * props.take)
      }
    >
      <i className="fa fa-angle-right" aria-hidden="true"></i>
    </Pagination.Item>
  );

  return <Pagination className="bg-transparent">{markup}</Pagination>;
};
