import React, { memo } from "react";
import RadioButton from "./utils/radio-button";
import { Col, Row, Stack } from "react-bootstrap";

const Toolbars = memo(() => {
  return (
    <Row className="my-2 my-md-3">
      <Col xs={12} md={9}>
        <Stack direction="horizontal" gap={2} className="flex-wrap">
          <RadioButton
            label="All"
            name="all"
            className="rounded-pill bg-light"
          />
          <RadioButton
            label="Infrastructure"
            name="infrastructure"
            className="rounded-pill"
          />
          <RadioButton
            label="Payments"
            name="payments"
            className="rounded-pill"
          />
          <RadioButton label="Defi" name="defi" className="rounded-pill" />
          <RadioButton label="Memes" name="memes" className="rounded-pill" />
          <RadioButton label="Web3" name="web3" className="rounded-pill" />
          <RadioButton label="Gaming" name="gaming" className="rounded-pill" />
        </Stack>
      </Col>
      <Col xs={12} md={3}>
        <div className="form-check d-flex mt-2 justify-content-start justify-content-md-end">
          <input
            className="form-check-input"
            type="radio"
            name="availableForTrading"
            id="AvailableForTrading"
          />
          <label
            className="form-check-label text-light-emphasis ms-2"
            htmlFor="AvailableForTrading"
          >
            Available For Trading
          </label>
        </div>
      </Col>
    </Row>
  );
});

export default Toolbars;
